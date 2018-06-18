angular.module('hints', ['hintService', 'searchService'])

.factory('autoTrigService', trigService)
.factory('arrdwTrigService', trigService)

.directive('hintsCriteria', HintsCriteria)
.directive('hintsAutoTrig', HintsAutoTrig)
.directive('hintsArrdwTrig', HintsArrdwTrig)
.directive('hintsNav', HintsNav)

.directive('hints', Hints)
.directive('hintsNext', HintsNext)
.directive('hintsPrev', HintsPrev)
.directive('hintItem', HintItem);

function trigService (criteriaService) {
	var trigLimits = {};
	
	return {
		addTrigLimit: function (name, limit) {
			trigLimits[name] = limit;
			console.log('addTrigLimit: ' + name + ' = ' + limit);
		},
		isTrigAllowed: function() {
			var result = true;
			angular.forEach(trigLimits, function(value, key) {
				if (this[key].length < value)
					result = false;
			}, criteriaService.getCriteria());
			console.log('isTrigAllowed: ' + result);
			return result;
		}
	}
} // end of trigLimitService

// directive
function HintsCriteria (criteriaService) {
	return {
		restrict: 'A',
		require: '?ngModel',
		scope: true,
		link: postLink,
		controller: function($scope) {}
	}

	function postLink (scope, element, attrs, ctrl) {
		scope.type = extractType();
		scope.criteriaName = attrs.hintsCriteria;
	
		// init
		element.ready(function() {
			scope.criteriaValue = getCriteriaValue();
			if (scope.isRadio()) {
				if (scope.isChecked())
					criteriaService.update(scope.criteriaName, scope.criteriaValue);
			}
			else
				criteriaService.update(scope.criteriaName, scope.criteriaValue);
		});

		// onchange
		var onchangeListeners = [];
		
		scope.addOnchangeListener = function(listenerFn) {
			if (hasOnchangeIssue())
				onchangeListeners.push(listenerFn);
			else
				element.on('change', listenerFn);
		};
		
		if (hasOnchangeIssue()) {
			element.on('keyup', function($event) {
				var newValue = getCriteriaValue();
				if (newValue != scope.criteriaValue) {
					scope.criteriaValue = newValue;
					for (var i = 0; i < onchangeListeners.length; i++)
						onchangeListeners[i] ($event);
				}
			});
		}
		else {
			element.on('change', function($event) {
				scope.criteriaValue = getCriteriaValue();
			});
		}

		scope.addOnchangeListener(function ($event) {
			criteriaService.update(scope.criteriaName, scope.criteriaValue);
		});
		
		scope.isChecked = function() {
			return angular.isDefined(element.attr('checked'));
		}
	
		scope.isCheckbox = function() {
			return angular.isDefined(scope.type) && scope.type == 'checkbox';
		}
		
		scope.isRadio = function() {
			return angular.isDefined(scope.type) && scope.type == 'radio';
		}
		
		function extractType() {
			var type = attrs.type;
			return angular.isString(type) ? type.toLowerCase() : type;
		}
		
		function hasOnchangeIssue() {
			return angular.isDefined(scope.type) && (scope.type == 'text' || scope.type == 'search');
		}
		
		function getCriteriaValue() {
			if (ctrl != null)
				return ctrl.$modelValue;
			else if (scope.isCheckbox())
				return scope.isChecked();
			else	
				return element.val();
		}
	} // end of postLink
} // end of directive HintsCriteria

// directive
function HintsAutoTrig (criteriaService, autoTrigService, hintService) {
	return {
		restrict: 'A',
		require: 'hintsCriteria',
		scope: true,
		link: function (scope, element, attrs, ctrl) {
			if (isFinite(attrs.hintsAutoTrig)) {
				var limit = parseInt(attrs.hintsAutoTrig);
				if (limit > 0)
					autoTrigService.addTrigLimit(scope.criteriaName, limit);
			}
			
			scope.addOnchangeListener(function($event) {
				if (autoTrigService.isTrigAllowed())
					hintService.firstPage();
				else
					hintService.release();
			});
		} // end of link
	} // end of return
} // end of directive HintsAutoTrig

function HintsArrdwTrig (criteriaService, arrdwTrigService, hintService) {
	return {
		restrict: 'A',
		require: 'hintsCriteria',
		scope: true,
		link: function (scope, element, attrs, ctrl) {
			if (isFinite(attrs.hintsArrdwTrig)) {
				var limit = parseInt(attrs.hintsArrdwTrig);
				if (limit > 0)
					arrdwTrigService.addTrigLimit(scope.criteriaName, limit);
			}
			
			element.on('keydown', function($event) {
				if (hintService.isEmpty() && $event.keyCode == 40 && arrdwTrigService.isTrigAllowed())
					hintService.firstPage();
			});
		} // end of link
	} // end of return
} // end of directive HintsArrdwTrig

function HintsNav(hintService) {
	return {
		restrict: 'A',
		require: 'hintsCriteria',
		scope: true,
		link: function (scope, element, attrs, ctrl) {
			element.on('keydown', function($event) {
				if (!hintService.isEmpty()) {
					// Page Down - następna strona
					if ($event.keyCode == 34) {
						hintService.nextPage();
						$event.preventDefault();
					}
					
					// Page Up - poprzednia strona
					else if ($event.keyCode == 33) {
						hintService.prevPage();
						$event.preventDefault();
					}
					
					// strzałka w dół
					else if ($event.keyCode == 40) {
						hintService.nextHint();
						$event.preventDefault();
					}
					
					// strzałka w górę
					else if ($event.keyCode == 38) {
						hintService.prevHint();
						$event.preventDefault();
					}
					
					// enter
					else if ($event.keyCode == 13) {
						$scope.locality = hintService.selectHint();
						$event.preventDefault();
					}
					
					// escape
					else if ($event.keyCode == 27) {
						hintService.release();
						$event.preventDefault();
					}
				}
			});
		} // end of link
	} // end of return
} // end of directive HintsNav

// Hints directive
function Hints(hintService, searchSrv) {
	return {
		restrict: 'A',
		templateUrl: 'hintsTemplate.html',
		transclude: true,
		priority: 100,
		scope: {},
		controller: hintsCtrl,
		link: function (scope, element, attrs, ctrl) {
			searchSrv.setUrlBase(attrs.hints);
			
			if (isFinite(attrs.hintsPagingSize))
				hintService.setPagingSize(attrs.hintsPagingSize);
			
			var watcherFn = function(watchScope) {
				return watchScope.$eval('getHints()');
			}
			scope.$watch(watcherFn, scope.render);
			
			element.on('wheel', scope.onWheel);
		}
	}
	
	function hintsCtrl($scope, hintService) {
		$scope.hints = {};
		
		$scope.getHints = function() {
			return hintService.getHints();
		}
		
		$scope.render = function() {
			$scope.hints = hintService.getHints();
			$scope.showList = $scope.hints.itemsCount > 0;
			$scope.showBar = $scope.hints.totalPages > 1;
		}
		
		$scope.onWheel = function(event) {
			if ($scope.showBar) {
				if (event.deltaY > 0)
					hintService.nextPage();
				else
					hintService.prevPage();
			}
		}
	}
} // end of Hints directive

function HintsNext(hintService) {
	return {
		restrict: 'A',
		scope: false,
		link: function (scope, element, attrs) {
			element.on('click', function($event) {
				hintService.nextPage();
			});
			
			var watcherFn = function(watchScope) {
				return watchScope.$eval('hints.last');
			}
			scope.$watch(watcherFn, function(newValue, oldValue) {
				element.prop('disabled', newValue);
			});
		}
	}
} // end of HintsNext directive

function HintsPrev(hintService) {
	return {
		restrict: 'A',
		scope: false,
		link: function (scope, element, attrs) {
			element.on('click', function($event) {
				hintService.prevPage();
			});
			
			var watcherFn = function(watchScope) {
				return watchScope.$eval('hints.first');
			}
			scope.$watch(watcherFn, function(newValue, oldValue) {
				element.prop('disabled', newValue);
			});
		}
	}
} // end of HintsPrev directive

// HintItem directive
function HintItem(hintService) {
	return {
		restrict: 'A',
		required: '^^hints',
		transclude: 'element',
		priority: 150,
		scope: false,
		controller: hintItemCtrl,
		link: function (scope, element, attrs, ctrl, transclude) {
			scope.node =  element;
			scope.transclude = transclude;
			var watcherFn = function(watchScope) {
				return watchScope.$eval('getHints()');
			}
			scope.$watch(watcherFn, scope.render);
		}
	}
	
	function hintItemCtrl($scope, hintService) {
		$scope.getHints = function() {
			return hintService.getHints();
		}
		
		$scope.render = function() {
			var hints = hintService.getHints().items;
			var node = $scope.node;
			for(var i = 0; i < hints.length; i++) {
				var childScope = $scope.$new();
				childScope.hint = hints[i];
//				childScope.indx = i;

				$scope.transclude(childScope, function(clone) {
					node.after(clone);
					
					childScope.indx = hintService.addNode(clone);
//					clone.on('mouseenter', function($event) {
//						hintService.hintAt(childScope.indx);
//					});
					
					node = clone;
				});
			}
		} // end of render
	}
}