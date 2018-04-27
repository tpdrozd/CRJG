angular.module('localitySearchApp', ['searchService', 'hints', 'gmap'])

.controller('localitySearchCtrl', localitySearchCtrl)
.directive('mouseWheel', mouseWheel);

function localitySearchCtrl($scope, searchSrv, hintHandler) {
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
				var index = hintHandler.markNextHint();
				$scope.$broadcast('LocalitySelected', $scope.page.items[index]);
				event.preventDefault();
			}
			
			// w górę
			else if ($event.keyCode == 38) {
				var index = hintHandler.markPrevHint();
				$scope.$broadcast('LocalitySelected', $scope.page.items[index]);
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
	
	function firstPage() {
		searchSrv.firstPage($scope.criteria).then(
			function success(response) {
				hintHandler.reset();
				$scope.page = response.data;
				$scope.showList = $scope.page.itemsCount > 0;
				$scope.showBar = $scope.page.totalPages > 1;
				$scope.$broadcast('LocalityUnselected', null);
			});
	}
	
	$scope.nextPage = function() {
		if($scope.page != null && $scope.page.hasNext) {
			searchSrv.nextPage().then(
				function success(response) {
					hintHandler.reset();
					$scope.page = response.data;
					$scope.$broadcast('LocalityUnselected', null);
				});
		}
	}
	
	$scope.prevPage = function() {
		if ($scope.page != null && $scope.page.hasPrev) {
			searchSrv.prevPage().then(
				function success(response) {
					hintHandler.reset();
					$scope.page = response.data;
					$scope.$broadcast('LocalityUnselected', null);
				});
		}
	}

	$scope.selectHint = function() {
		if (hintHandler.isAnyHintMarked()) {
			var index = hintHandler.getMarkedHintIndex();
			var id = $scope.page.items[index].id;
			searchSrv.details(id).then(
				function success(response) {
					hintHandler.reset();
					$scope.locality = response.data;
					$scope.page = null;
					$scope.showList = false;
					$scope.showBar = false;
					$scope.$broadcast('LocalityUnselected', null);
					$scope.$broadcast('LocalityEntered', $scope.locality);
				});
		}
	}
	
	function reset() {
		searchSrv.release();
		hintHandler.reset();
		$scope.page = null;
		$scope.showList = false;
		$scope.showBar = false;
		$scope.$broadcast('LocalityUnselected', null);
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
