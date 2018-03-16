angular.module('localitySearchApp', ['searchService'])

.controller('localitySearchCtrl', localitySearchCtrl);

function localitySearchCtrl($scope, searchSrv) {
	$scope.criteria = {
			name: '',
			wojew: '',
			hist: false,
			collat: false,
			foreign: false,
			depend: false
	};
	
	$scope.page = null;
	$scope.index = -1;
	
	$scope.showList = false;
	$scope.showBar = false;
	
	$scope.locality = {};

	$scope.change = function() {
		if ($scope.criteria.name.length >= 3) {
			searchSrv.firstPage($scope.criteria.name).then(
				function success(response) {
					$scope.page = response.data;
					$scope.index = -1;
					$scope.showList = $scope.page.itemsCount > 0;
					$scope.showBar = $scope.page.totalPages > 1;
				});
		}
		else if ($scope.showList) {
			searchSrv.release();
			$scope.page = null;
			$scope.index = -1;
			$scope.showList = false;
			$scope.showBar = false;
		}
	}
	
	$scope.prevPage = function() {}
	
	$scope.nextPage = function() {}
	
	$scope.keydown = function($event) {}
	
}