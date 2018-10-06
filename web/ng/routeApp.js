angular.module('routeApp', ['hints', 'gmap', angularDragula(angular)])

.controller('routeCtrl', routeCtrl);

function routeCtrl($scope) {
	$scope.hint = {};
	$scope.stops = [];
	$scope.depot = {};

	// mark hint
	$scope.$on('markHint', function (event, hint) {
		$scope.hint = hint;
		$scope.$apply('hint');
	});
	
	// unmark hint
	$scope.$on('unmarkHint', function (event) {
		$scope.hint = {};
		$scope.$apply('hint');
	});
	
	// add stop
	$scope.$on('selectHint', function(event, hint) {
		$scope.stops.push(hint);
	});
	
	$scope.remove = function (index) {
		console.log('remove ' + index);
		delete $scope.stops[index];
		$scope.stops = $scope.stops.filter(function (value) {
			return value != undefined;
		});
	};
	
	$scope.markNewDepot = function (coord) {
		$scope.depot.lat = coord.lat();
		$scope.depot.lng = coord.lng();
		$scope.$apply('depot');
	}
	
	$scope.addDepot = function () {
		console.log('save depot: ' + $scope.depot.name + ' ' + $scope.depot.lat + ' ' + $scope.depot.lng);

		// save depot to db
		// ...
		
		$scope.depot = {};
	}
	
} // end of localitySearchCtrl
