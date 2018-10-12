angular.module('routeApp', ['hints', 'gmap', angularDragula(angular)])

.controller('routeCtrl', routeCtrl);

function routeCtrl($scope, $http) {
	$scope.hint = {};
	$scope.stops = [];
	$scope.depot = {};
	$scope.gmapCursor = 'default';

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
	
	$scope.addDepotTo = function (locality) {
		$scope.depot.localityRefId = locality.id;
		
		$scope.addingDepot = true;
		$scope.gmapCursor = 'crosshair';

		console.log('adding depot to: '	+ locality.name);
	}
	
	$scope.markNewDepot = function (coord) {
		if ($scope.addingDepot) {
			$scope.depot.lat = coord.lat();
			$scope.depot.lng = coord.lng();
			$scope.gmapCursor = 'default';
			$scope.$apply('depot');
			
			console.log('mark new depot: '
				+ $scope.depot.lat + ' '
				+ $scope.depot.lng);
		}
	}
	
	$scope.saveDepot = function () {
		console.log('saving depot: '
				+ $scope.depot.name + ' '
				+ $scope.depot.lat + ' '
				+ $scope.depot.lng);
		
		// save depot to db
		$http.put("/crjg/depot/save.mvc", $scope.depot).then(
			function success (response) {
				console.log('save depot success: ' + response.statusText);
				// tu skończyłem
			},
			function error (response) {
				console.log('save depot error: ' + response.statusText);
			});
		
		$scope.depot = {};
		$scope.addingDepot = false;
	}
	
	$scope.cancelDepot = function () {
		console.log('cancel depot');
		
		$scope.depot = {};
		$scope.addingDepot = false;
	}
	
} // end of localitySearchCtrl
