angular.module('hints', ['hintService'])

.directive('hintsTrigger', HintsTrigger)
.directive('hints', Hints)
.directive('hintItem', HintItem);

function HintsTrigger(hintService) {
	return {
		restrict: 'A',
		require: 'ngModel',
		scope: {},
		controller: hintsTriggerCtrl,
		link: function (scope, element, attrs, ctrl) {
			scope.autoTrig = attrs.autoTrig;
			scope.arrowdownTrig = attrs.arrowdownTrig;
			
			element.on('keydown', scope.onKeydown);
			
			element.on('keydown', scope.arrowdownTrigger);
			element.on('keyup', function($event) {
				scope.autoTrigger(ctrl.$modelValue);
			});
		}
	}
	
	function hintsTriggerCtrl($scope, hintService) {
		$scope.criteria = {
			name: '',
			wojew: '',
			hist: false,
			collat: false,
			foreign: false,
			matching: 'START',
			kind: 'STANDALONE'
		};
		 
		$scope.autoTrigger = function(newValue) {
			if (newValue != $scope.criteria.name) {
				$scope.criteria.name = newValue;
				console.log('change name: ' + $scope.criteria.name);
				
				if ($scope.criteria.name.length >= $scope.autoTrig) {
					hintService.firstPage($scope.criteria);
				}
				else if (!hintService.isEmpty()) {
					hintService.release();
				}
			}
		}
		
		$scope.arrowdownTrigger = function($event) {
			// strzałka w dół
			if ($event.keyCode == 40 && hintService.isEmpty()) {
				if ($scope.criteria.name.length >= $scope.arrowdownTrig)
					hintService.firstPage($scope.criteria);
				$event.preventDefault();
			}
		}
		
		$scope.onKeydown = function($event) {
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
		} // end of onKeydown
	} // end of hintsTriggerCtrl
} // end of directive HintsTrigger

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
				$scope.transclude(childScope, function(clone) {
					node.after(clone);
					node = clone;
					hintService.addNode(node);
				});
			}
		}
	}
}