angular.module('routeApp', ['hints', 'gmap', angularDragula(angular)])

.controller('routeCtrl', routeCtrl);

function routeCtrl($scope, $http) {
	$scope.hint = {};
	$scope.town = {};
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
	
	// select hint
	$scope.$on('selectHint', function(event, hint) {
		$scope.town = hint;
	});
	
	// obsługa kursora przy przeciąganiu
	$scope.mousedown = function (event) {
		if (event.button == 0)
			event.currentTarget.classList.add('drag');
	}
	
	$scope.mouseup = function (event) {
		if (event.button == 0)
			event.currentTarget.classList.remove('drag');
	}
	
	$scope.$parent.$on('route.drag', function (el, source) {
		source.removeClass('drag');
	});

	// edycja trasy
	$scope.addStop = function (depot) {
		console.log('addStop');
		
		var stop = new Stop($scope.town, depot);
		$scope.stops.push(stop);
//		$scope.$apply('stops');
	}
	
	$scope.remove = function (index) {
		console.log('remove ' + index);
		delete $scope.stops[index];
		$scope.stops = $scope.stops.filter(function (value) {
			return value != undefined;
		});
	};
	
	$scope.addDepotTo = function (town) {
//		$scope.depot.townRefId = town.id;
		
		$scope.addingDepot = true;
		$scope.gmapCursor = 'crosshair';

		console.log('adding depot to: '	+ town.name);
	}
	
	$scope.markNewDepot = function (coord) {
		if ($scope.addingDepot) {
//			$scope.depot.coord = coord;
			$scope.depot.coord = {};
			$scope.depot.coord.lat = coord.lat();
			$scope.depot.coord.lng = coord.lng();
			$scope.gmapCursor = 'default';
			$scope.$apply('depot');
			
			console.log('mark new depot: '
				+ $scope.depot.coord.lat + ' '
				+ $scope.depot.coord.lng);
		}
	}
	
	$scope.saveDepot = function () {
		console.log('saving depot: '
				+ $scope.depot.name + ' '
				+ $scope.depot.coord.lat + ' '
				+ $scope.depot.coord.lng);
		
		// save depot to db
		$http.put("/crjg/depot/save.mvc", {
			'townId': $scope.town.id,
			'depot' : $scope.depot
		}).then(
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
	
} // end of routeCtrl

function Stop (town, depot) {
	var hasDepot = angular.isDefined(depot);
	
	var depotName = hasDepot ? depot.name : undefined;
	var lat = hasDepot ? depot.coord.lat : town.coord.lat;
	var lng = hasDepot ? depot.coord.lng : town.coord.lng;
	
	return {
		town: town,
		depot: depotName, 
		lat: lat,
		lng: lng
	}
}
