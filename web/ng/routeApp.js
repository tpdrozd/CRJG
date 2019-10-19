angular.module('routeApp', ['hints', 'gmap', 'depot', 'spatial', angularDragula(angular)])

.controller('routeCtrl', routeCtrl);

function routeCtrl($scope, depotApi, spatialApi) {
	$scope.hint = {};
	$scope.town = {};
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
		$scope.towns = [];
		$scope.towns.push(hint);
	});
	
// wyszukiwanie geospatial
	$scope.towns			= [];
	$scope.spatialSearch	= spatialSearch;
	
// wyświetlanie przystanków dla wybranej miejscowości
	$scope.town			= {};
	$scope.depots		= [];
	$scope.showDepots	= showDepots;
	
// tworzenie nowego przystanku
	var addDepotMode		= false;
	$scope.newDepot			= {};
	$scope.startAddDepot	= startAddDepot;
	$scope.pointNewDepot	= pointNewDepot;
	$scope.dragNewDepot		= dragNewDepot;
	$scope.cancelAddDepot	= cancelAddDepot;
	$scope.confirmAddDepot	= confirmAddDepot;
	
// edycja trasy
	$scope.stops		= [];
	$scope.addStop		= addStop;
	$scope.removeStop	= removeStop;

// zmiana kursora przy przeciąganiu elementu trasy 
	$scope.mousedown	= mousedown;
	$scope.mouseup		= mouseup;
	$scope.$parent.$on('route.drag', dragRoute);

// obsługa wyszukiwania geospatial
	function spatialSearch (coord) {
		spatialApi.findTowns(coord, 2000).then(
			function success(response) {
				$scope.towns = response.data;
			},
			function error(response) {
				console.log('	error: ' + response.statusText);
			});
	}
	
// obsługa wyświetlania przystanków dla wybranej miejscowości
	function showDepots (town) {
		$scope.town = town;
		depotApi.listForTown(town.id).then(
			function success(response) {
				$scope.depots = response.data;
			},
			function error(response) {
				console.log('	error: ' + response.statusText);
			});
	}
	
// obsługa tworzenia nowego przystanku
	function startAddDepot (town) {
		$scope.town			= town;
		$scope.newDepot		= {};
		$scope.gmapCursor	= 'crosshair';
		addDepotMode		= true;
	}
	
	function pointNewDepot (coord) {
		if (addDepotMode && !angular.isDefined($scope.newDepot.coord)) {
			$scope.newDepot.coord		= {};
			$scope.newDepot.coord.lat	= coord.lat();
			$scope.newDepot.coord.lng	= coord.lng();
			//$scope.newDepot.latitude = ...
			//$scope.newDepot.longitude = ...
			$scope.$apply('newDepot');
			
			$scope.gmapCursor = 'default';
			$scope.$apply('gmapCursor');
		}
	}
	
	function dragNewDepot (coord) {
		$scope.newDepot.coord.lat = coord.lat();
		$scope.newDepot.coord.lng = coord.lng();
		//$scope.newDepot.latitude = ...
		//$scope.newDepot.longitude = ...
		$scope.$apply('newDepot');
	}
	
	function cancelAddDepot () {
		addDepotMode		= false;
		$scope.gmapCursor	= 'default'
		$scope.newDepot		= {};
	}
	
	function confirmAddDepot () {
		depotApi.add($scope.town.id, $scope.newDepot).then(
			function success (response) {
				showDepots($scope.town); // ??
				cancelAddDepot();
			},
			function error (response) {
				console.log('confirmAddDepot error: ' + response.statusText);
			});
		
		$scope.depot = {};
		$scope.addingDepot = false;
	}
	
// obsługa edycji trasy
	function addStop (town, depot) {
		var stop = new Stop(town, depot);
		
		// obliczenie odległosci
		if ($scope.stops.length == 0) {
			stop.dist = 0;
			stop.totalDist = 0;
		}
		else {
			var prevStop = $scope.stops[$scope.stops.length - 1];
			var totalDist = prevStop.totalDist;
			spatialApi.distance(stop.placeId(), prevStop.placeId()).then(
				function success(response) {
					stop.dist = response.data;
					stop.totalDist = totalDist + stop.dist;
					//console.log('addStop '+stop.dist+' '+stop.totalDist);
				},
				function error(response) {
					console.log('	error: ' + response.statusText);
				});
		}
		
		// ukrycie markera miejscowosci/przystanu
		if (stop.hasDepot) {
			var indx = $scope.depots.indexOf(depot);
			$scope.depots.splice(indx, 1);
		}
		else {
			var indx = $scope.towns.indexOf(town);
			$scope.towns.splice(indx, 1);
		}
		
		$scope.stops.push(stop);
	}
	
	function removeStop (stop) {
		//console.log('removeStop ' + index);
		var indx = $scope.stops.indexOf(stop);
		$scope.stops.splice(indx, 1);
		
		// pokazanie markera miejscowosci/przystanku
		if (stop.hasDepot) {
			if (stop.town.id == $scope.town.id) {
				var depot = stop.depot;
				$scope.depots.push(depot);
			}
		}
		else {
			var town = stop.town;
			$scope.towns.push(town);
		}
	};
	
// obsługa zmiany kursora przy przeciąganiu elementu trasy
	function mousedown (event) {
		if (event.button == 0)
			event.currentTarget.classList.add('drag');
	}
	
	function mouseup (event) {
		if (event.button == 0)
			event.currentTarget.classList.remove('drag');
	}
	
	function dragRoute (el, source) {
		source.removeClass('drag');
	}
	
} // end of routeCtrl

function Stop (town, depot) {
	var hasDepot = angular.isDefined(depot);
	
	return {
		town: town,
		depot: hasDepot ? depot : undefined,
		hasDepot: hasDepot,
		dist: 0,
		totalDist: 0,
		coord: function () {
			return hasDepot ? depot.coord : town.coord;
		},
		title: function () {
			return hasDepot ? town.name+', '+depot.name : town.name;
		},
		placeId: function () {
			return hasDepot ? depot.id : town.id;
		},
		distance: function () {
			var d = (this.dist/1000).toFixed(1).replace('.', ',') + ' km';
			//console.log('distance '+d);
			return d;
		},
		totalDistance: function () {
			var td = (this.totalDist/1000).toFixed(1).replace('.', ',') + ' km';
			//console.log('totalDistance '+td);
			return td;
		},
		hasDistance: function () {
			return this.totalDist > 0;
		}
	}
}
