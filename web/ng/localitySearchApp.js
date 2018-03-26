angular.module('localitySearchApp', ['searchService'])

.controller('localitySearchCtrl', localitySearchCtrl);

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
	index = -1;
	
	$scope.showList = false;
	$scope.showBar = false;
	
	$scope.locality = {};

	$scope.change = function() {
		if ($scope.criteria.name.length >= 3) {
			searchSrv.firstPage($scope.criteria).then(
				function success(response) {
					$scope.page = response.data;
					index = -1;
					$scope.showList = $scope.page.itemsCount > 0;
					$scope.showBar = $scope.page.totalPages > 1;
				});
		}
		else if ($scope.showList) {
			reset();
		}
	}
	
	$scope.nextPage = function() {
		if($scope.page != null && $scope.page.hasNext) {
			searchSrv.nextPage().then(
				function success(response) {
					$scope.page = response.data;
					index = -1;
				});
		}
	}
	
	$scope.prevPage = function() {
		if($scope.page != null && $scope.page.hasPrev) {
			searchSrv.prevPage().then(
				function success(response) {
					$scope.page = response.data;
					index = -1;
				});
		}
	}
	
	$scope.keydown = function($event) {
		if (!$scope.showList) {
			// w dół
			if ($event.keyCode == 40) {
				$scope.change();
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
				incSelection();
				event.preventDefault();
			}
			
			// w górę
			else if ($event.keyCode == 38) {
				decSelection();
				event.preventDefault();
			}
			
			// enter
			else if ($event.keyCode == 13) {
				var id = $scope.page.items[index].id;
				searchSrv.details(id).then(
					function success(response) {
						$scope.locality = response.data;
						$scope.page = null;
						index = -1;
						$scope.showList = false;
						$scope.showBar = false;
					});
				event.preventDefault();
			}
			
			// escape
			else if ($event.keyCode == 27) {
				reset();
			}
		}
	}
	
	function reset() {
		searchSrv.release();
		$scope.page = null;
		index = -1;
		$scope.showList = false;
		$scope.showBar = false;
	}

	function incSelection() {
		if (isIndexInRange())
			$scope.page.items[index].ngClass = '';
		
		if ($scope.page != null	&& index < $scope.page.itemsCount - 1)
			index = index + 1;
		
		if (isIndexInRange())
			$scope.page.items[index].ngClass = 'selected';
	}
	
	function decSelection() {
		if (isIndexInRange())
			$scope.page.items[index].ngClass = '';
		
		if ($scope.page != null	&& index > 0)
			index = index - 1;
		
		if (isIndexInRange())
			$scope.page.items[index].ngClass = 'selected';
	}
	
	function isIndexInRange() {
		return	$scope.page != null	&&
		index >= 0	&&
		index < $scope.page.itemsCount;
	}

}
