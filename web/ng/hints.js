angular.module('hints', ['hintService'])

.directive('hintsCriteria', HintsCriteria)
.directive('hintsAutoTrig', HintsAutoTrig)
.directive('hintsArrdwTrig', HintsArrdwTrig)
.directive('hintsNav', HintsNav)

.directive('hints', Hints)
.directive('hintsNext', HintsNext)
.directive('hintsPrev', HintsPrev)
.directive('hintItem', HintItem);

// directive
function HintsCriteria (criteriaService, autoTrigService, arrdwTrigService) {
	return {
		restrict: 'A',
		require: '?ngModel',
		scope: true,
		link: postLink,
		controller: function($scope) {}
	}

	function postLink (scope, element, attrs, ctrl) {
		scope.criteriaName = attrs.hintsCriteria;
		
		if (isFinite(attrs.hntAutoThrs)) {
			var limit = parseInt(attrs.hntAutoThrs);
			if (limit > 0)
				autoTrigService.addTrigLimit(scope.criteriaName, limit);
		}

		if (isFinite(attrs.hntArrdwThrs)) {
			var limit = parseInt(attrs.hntArrdwThrs);
			if (limit > 0)
				arrdwTrigService.addTrigLimit(scope.criteriaName, limit);
		}
	
		// init value
		scope.type = extractType();
		
		element.ready(function() {
			scope.criteriaValue = getCriteriaValue();
			if (scope.isRadio()) {
				if (scope.isChecked())
					criteriaService.update(scope.criteriaName, scope.criteriaValue);
			}
			else
				criteriaService.update(scope.criteriaName, scope.criteriaValue);
		});

		// onchange listeners
		var onchangeListeners = [];
		
		scope.addOnchangeListener = function(listenerFn) {
			if (hasOnchangeIssue())
				onchangeListeners.push(listenerFn);
			else
				element.on('change', listenerFn);
		};
		
		// handle keyup event as onchange event
		if (hasOnchangeIssue()) {
			element.on('keyup', function($event) {
				if (getCriteriaValue() != scope.criteriaValue) {
					for (var i = 0; i < onchangeListeners.length; i++)
						onchangeListeners[i] ($event);
				}
			});
		}

		// add onchange listener
		scope.addOnchangeListener(function ($event) {
			scope.criteriaValue = getCriteriaValue();
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
function HintsAutoTrig (autoTrigService, hintService) {
	return {
		restrict: 'A',
		require: 'hintsCriteria',
		scope: true,
		link: function (scope, element, attrs, ctrl) {
			scope.addOnchangeListener(function($event) {
				if (autoTrigService.isTrigAllowed())
					hintService.firstPage();
				else
					hintService.release();
			});
		} // end of link
	} // end of return
} // end of directive HintsAutoTrig

function HintsArrdwTrig (arrdwTrigService, hintService) {
	return {
		restrict: 'A',
		require: 'hintsCriteria',
		scope: true,
		link: function (scope, element, attrs, ctrl) {
			element.on('keydown', function($event) {
				if (hintService.isEmpty() && $event.keyCode == 40 && arrdwTrigService.isTrigAllowed())
					hintService.firstPage();
			});
		} // end of link
	} // end of return
} // end of directive HintsArrdwTrig

function HintsNav(hintService, itemService) {
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
						itemService.markNextItem();
						$event.preventDefault();
					}
					
					// strzałka w górę
					else if ($event.keyCode == 38) {
						itemService.markPrevItem();
						$event.preventDefault();
					}
					
					// enter
					else if ($event.keyCode == 13) {
						hintService.selectHint();
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
function Hints(hintService) {
	return {
		restrict: 'A',
		templateUrl: 'hintsTemplate.html',
		transclude: true,
		scope: {},
		controller: hintsCtrl,
		link: function (scope, element, attrs, ctrl) {
			hintService.init(attrs.hints, attrs.hintsPagingSize);

			// obsługa wyświetlenia nowej (pierwszej/następnej/poprzedniej) strony
			scope.$watch('getHints()', function(newHints, oldHints) {
				scope.hints = newHints;
				
				if (hintService.isEmpty())
					element.addClass('ng-hide');
				else
					element.removeClass('ng-hide');
				
				scope.showBar = scope.hints.totalPages > 1;
			});
			
			// obsługa wybrania konkretnego hintu
			scope.$watch('getSelectedHint()', function(newHint, oldHint) {
				scope.$emit('selectHint', newHint);
			});
			
			// obsługa przewijania stron kółkiem myszy
			element.on('wheel', function(event) {
				if (scope.showBar) {
					if (event.deltaY > 0)
						hintService.nextPage();
					else
						hintService.prevPage();
				}
			});
		}
	}
	
	function hintsCtrl($scope, hintService) {
		$scope.hints = {items: []};
		
		$scope.getHints = function() {
			return hintService.getHints();
		}
		
		$scope.getSelectedHint = function() {
			return hintService.getSelectedHint();
		}
	} // end of hintsCtrl
} // end of Hints directive

function HintsNext(hintService) {
	return {
		restrict: 'A',
		required: '^^hints',
		scope: false,
		link: function (scope, element, attrs) {
			element.on('click', function($event) {
				hintService.nextPage();
			});
			
			scope.$watch('hints.last', function(newValue, oldValue) {
				element.prop('disabled', newValue);
			});
		}
	}
} // end of HintsNext directive

function HintsPrev(hintService) {
	return {
		restrict: 'A',
		required: '^^hints',
		scope: false,
		link: function (scope, element, attrs) {
			element.on('click', function($event) {
				hintService.prevPage();
			});
			
			scope.$watch('hints.first', function(newValue, oldValue) {
				element.prop('disabled', newValue);
			});
		}
	}
} // end of HintsPrev directive

// HintItem directive
function HintItem(hintService, itemService) {
	return {
		restrict: 'A',
		required: '^^hints',
		scope: false,
		transclude: 'element',
		controller: hintItemCtrl,
		link: function (scope, element, attrs, ctrl, transclude) {
			
			scope.$watch('getItems()', function(newItems, oldItems) {
				console.log('render');
				itemService.removeItems();
				var node = element;
				for(var i = 0; i < newItems.length; i++) {
					var childScope = scope.$new();
					childScope.hint = newItems[i];
					childScope.indx = i;

					transclude(childScope, function(clone, scp) {
						node.after(clone);
						itemService.addItem(clone);
						
						clone.on('mouseenter', function($event) {
							itemService.markItemAt(scp.indx);
						});
						
						clone.on('click', function($event) {
							hintService.selectHint();
						});
						
						node = clone;
					});
				}
			});
		} // end of link
	}
	
	function hintItemCtrl($scope, hintService) {
		$scope.getItems = function() {
			return hintService.getHints().items;
		}
	}
}