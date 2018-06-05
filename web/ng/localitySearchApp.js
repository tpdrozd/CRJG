angular.module('localitySearchApp', ['searchService', 'hints'])

.controller('localitySearchCtrl', localitySearchCtrl)
.directive('mouseWheel', mouseWheel);

function localitySearchCtrl($scope, searchSrv) {
	$scope.criteria = {
		name: '',
		wojew: '',
		hist: false,
		collat: false,
		foreign: false,
		matching: 'START',
		kind: 'STANDALONE'
	};
	
	$scope.page = null;
	
	$scope.showList = false;
	$scope.showBar = false;
	
	$scope.locality = {};

	$scope.change = function() {
		console.log('change criteria.name: ' + $scope.criteria.name);
		if ($scope.criteria.name.length >= 3) {
			firstPage($scope.criteria);
		}
		else if ($scope.showList) {
			reset();
		}
	}
	
	$scope.keydown = function($event) {
		if (!$scope.showList) {
			// w dół
			if ($event.keyCode == 40) {
				if ($scope.criteria.name.length >= 2)
					firstPage($scope.criteria);
				event.preventDefault();
			}
		}
		
		else {
			// Page Down - następna strona
			if ($event.keyCode == 34) {
				$scope.nextPage();
				event.preventDefault();
			}
			
			// Page Up - poprzednia strona
			else if ($event.keyCode == 33) {
				$scope.prevPage();
				event.preventDefault();
			}
			
			// w dół
			else if ($event.keyCode == 40) {
				//hintHandler.markNextHint();
				event.preventDefault();
			}
			
			// w górę
			else if ($event.keyCode == 38) {
				//hintHandler.markPrevHint();
				event.preventDefault();
			}
			
			// enter
			else if ($event.keyCode == 13) {
				$scope.selectHint();
				event.preventDefault();
			}
			
			// escape
			else if ($event.keyCode == 27) {
				reset();
			}
		}
	} /* end of keydown */	

	$scope.selectHint = function() {
		//if (hintHandler.isAnyHintMarked()) {
		if (true) {
			//var index = hintHandler.getMarkedHintIndex();
			var index = 0;
			var id = $scope.page.items[index].id;
			searchSrv.details(id).then(
				function success(response) {
					//hintHandler.reset();
					$scope.locality = response.data;
					$scope.page = null;
					$scope.showList = false;
					$scope.showBar = false;
				});
		}
	}
	
	function reset() {
		searchSrv.release();
		//hintHandler.reset();
		$scope.page = null;
		$scope.showList = false;
		$scope.showBar = false;
	}
} /* end of localitySearchCtrl */

function mouseWheel() {
	return {
		link: function (scope, element, attrs) {
			element.bind('wheel', function($event) {
				if (event.deltaY > 0)
					scope.nextPage();
				else
					scope.prevPage();
			});
		}
	}
}
