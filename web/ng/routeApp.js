angular.module('routeApp', ['hints', 'gmap', angularDragula(angular)])

.controller('routeCtrl', routeCtrl);

function routeCtrl($scope) {
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
		$scope.depot.localityId = locality.id;
		$scope.depot.localityName = locality.name;
		
		$scope.addingDepot = true;
		$scope.gmapCursor = 'crosshair';

		console.log('add depot: '
			+ $scope.depot.localityName + ' '
			+ $scope.gmapCursor);
	}
	
	$scope.markNewDepot = function (coord) {
		if ($scope.addingDepot) {
			$scope.depot.lat = coord.lat();
			$scope.depot.lng = coord.lng();
			$scope.gmapCursor = 'default';
			$scope.$apply('depot');
			
			console.log('mark new depot: '
				+ $scope.depot.localityName + ' ' 
				+ $scope.depot.lat + ' '
				+ $scope.depot.lng);
		}
	}
	
	$scope.saveDepot = function () {
		console.log('save depot: '
				+ $scope.depot.localityName + ' '
				+ $scope.depot.lat + ' '
				+ $scope.depot.lng + ' '
				+ $scope.depot.name);
		
		// save depot to db
		// ...
		
		$scope.depot = {};
		$scope.addingDepot = false;
	}
	
	$scope.cancelDepot = function () {
		console.log('cancel depot');
		
		$scope.depot = {};
		$scope.addingDepot = false;
	}
	
} // end of localitySearchCtrl
