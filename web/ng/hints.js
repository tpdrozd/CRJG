angular.module('hints', ['hintService'])

.directive('hintable', Hintable)
.directive('hints', Hints)
.directive('hintItem', HintItem);

function Hintable(hintService) {
	return {
		restrict: 'A',
		require: 'ngModel',
		scope: {},
		controller: hintableCtrl,
		link: function (scope, element, attrs, ctrl) {
			scope.autoTrigger = attrs.autoTrigger;
			scope.keydownTrigger = attrs.keydownTrigger;
			
			element.on('keyup', function($event) {
				if (scope.criteria.name != ctrl.$modelValue) {
					scope.criteria.name = ctrl.$modelValue;
					scope.change();
				}
			});
			
			element.on('keydown', function($event) {
				scope.keydown($event);
			});
		}
	}
	
	function hintableCtrl($scope, hintService) {
		$scope.criteria = {
			name: '',
			wojew: '',
			hist: false,
			collat: false,
			foreign: false,
			matching: 'START',
			kind: 'STANDALONE'
		};
			
		$scope.locality = {};
		 
		$scope.change = function() {
			console.log('change name: ' + $scope.criteria.name);
			
			if ($scope.criteria.name.length >= $scope.autoTrigger) {
				hintService.firstPage($scope.criteria);
			}
			else if (!hintService.isEmpty()) {
				hintService.release();
			}
		}
		
		$scope.keydown = function($event) {
			if (hintService.isEmpty()) {
				// w dół
				if ($event.keyCode == 40) {
					if ($scope.criteria.name.length >= $scope.keydownTrigger)
						hintService.firstPage($scope.criteria);
					$event.preventDefault();
				}
			}
			
			else {
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
				
				// w dół
				else if ($event.keyCode == 40) {
					hintService.nextHint();
					$event.preventDefault();
				}
				
				// w górę
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
				}
			}
		} // end of keydown
	} // end of hintableCtrl
} // end of Hintable directive

// Hints directive
function Hints(hintService) {
	return {
		restrict: 'A',
		templateUrl: 'hintsTemplate.html',
		transclude: true,
		priority: 100,
		scope: {},
		controller: hintsCtrl,
		link: function (scope, element, attrs, ctrl) {
			var watcherFn = function(watchScope) {
				return watchScope.$eval('getHints()');
			}
			scope.$watch(watcherFn, function(newValue, oldValue) {
				scope.render();
			});
		}
	}
	
	function hintsCtrl($scope, hintService) {
		$scope.hints = {};
		
		$scope.render = function() {
			$scope.hints = hintService.getHints();
			$scope.showList = $scope.hints.itemsCount > 0;
			$scope.showBar = $scope.hints.totalPages > 1;
		}
		
		$scope.getHints = function() {
			return hintService.getHints();
		}
	}
} // end of Hints directive

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
			var watcherFn = function(watchScope) {
				return watchScope.$eval('getHints()');
			}
			scope.$watch(watcherFn, function(newValue, oldValue) {
				var hints = hintService.getHints().items;
				var prev = element;
				for(var i = 0; i < hints.length; i++) {
					var childScope = scope.$new();
					childScope.hint = hints[i];
					transclude(childScope, function(clone) {
						prev.after(clone);
						prev = clone;
						hintService.addNode(prev);
					});
				}
			});
		}
	}
	
	function hintItemCtrl($scope, hintService) {
		$scope.getHints = function() {
			return hintService.getHints();
		}
	}
}