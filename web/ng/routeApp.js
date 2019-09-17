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
		console.log('addStop');
		var stop = new Stop(town, depot);
		$scope.stops.push(stop);
	}
	
	function removeStop (index) {
		console.log('removeStop ' + index);
		delete $scope.stops[index];
		$scope.stops = $scope.stops.filter(function (value) {
			return value != undefined;
		});
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
		hasDepot: hasDepot,
		depot: hasDepot ? depot : undefined,
		coord: function () {
			return hasDepot ? depot.coord : town.coord;
		},
		title: function () {
			return hasDepot ? town.name+', '+depot.name : town.name;
		}
	}
}
