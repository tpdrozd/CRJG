angular.module('depotApp', ['hints', 'gmap', 'depot'])

.controller('depotCtrl', depotCtrl);

function depotCtrl($scope, depotApi) {

// obsługa podpowiedzi (hintów)
	$scope.hint = {};
	
	$scope.$on('markHint', function (event, hint) {
		$scope.hint = hint;
		$scope.$apply('hint');
	});
	
	$scope.$on('unmarkHint', function (event) {
		$scope.hint = {};
		$scope.$apply('hint');
	});
	
// obsługa wyboru miejscowosci
	$scope.town = {};
	$scope.depots = []; 

	$scope.$on('selectHint', function(event, hint) {
		$scope.town = hint;
		// pobranie przystanków w wybranej miejscowosci
		refreshDepots();
	});

// przeglądanie
	var selectedId = -1;
	$scope.isInReadMode = isInReadMode;
	
// edycja (save)
	var editMode		= false;
	$scope.model		= {};
	$scope.isInEditMode	= isInEditMode;
	
	$scope.startEdit	= startEdit;
	$scope.cancelEdit	= cancelEdit;
	$scope.confirmEdit	= confirmEdit;
	
// usuwanie (remove)
	var removeMode			= false;
	$scope.isInRemoveMode	= isInRemoveMode;
	
	$scope.startRemove		= startRemove;
	$scope.cancelRemove		= cancelRemove;
	$scope.confirmRemove	= confirmRemove;

// dodawanie (add)
	var addMode				= false;
	$scope.newDepot			= {};
	$scope.isInAddMode		= isInAddMode;
	$scope.isInPointMode	= isInPointMode;
	
	$scope.startAdd		= startAdd;
	$scope.pointDepot	= pointDepot;
	$scope.dragDepot	= dragDepot;
	$scope.cancelAdd	= cancelAdd;
	$scope.confirmAdd	= confirmAdd;

// animacja markerów
	var animation			= {};
	$scope.startAnimation	= startAnimation;
	$scope.stopAnimation	= stopAnimation;
	$scope.getAnimation		= getAnimation;
	
	$scope.gmapCursor = 'default';

	
// obsługa przeglądania
	function isInReadMode (depot) {
		return selectedId != depot.id;
	}
	
// obsługa edytowania
	function isInEditMode(depot) {
		return editMode && selectedId == depot.id;
	}
	
	function startEdit(depot) {
		selectedId = depot.id;
		$scope.model = {
			'id': depot.id,
			'name': depot.name,
			'coord': {
				'lat': depot.coord.lat,
				'lng': depot.coord.lng
			}
		};
		editMode = true;
	}
	
	function cancelEdit() {
		editMode = false;
		$scope.model = {};
		selectedId = -1;
	}
	
	function confirmEdit() {
		depotApi.save($scope.model).then(
			function success(response) {
				refreshDepots();
				cancelEdit();
			},
			function error (response) {
			});
	}
	
// obsługa usuwania
	function isInRemoveMode(depot) {
		return removeMode && selectedId == depot.id;
	}
	
	function startRemove(depot) {
		selectedId = depot.id;
		removeMode = true;
	}
	
	function cancelRemove() {
		removeMode = false;
		selectedId = -1;
	}
	
	function confirmRemove() {
		depotApi.remove(selectedId).then(
			function success (response) {
				refreshDepots();
				cancelRemove();
			},
			function error (response) {
			});
	}
	
	
// obsługa dodawania
	function isInAddMode () {
		return addMode;
	}
	
	function isInPointMode () {
		return addMode && !angular.isDefined($scope.newDepot.coord);
	}
	
	function startAdd () {
		$scope.newDepot = {};
		$scope.gmapCursor = 'crosshair';
		addMode = true;
	}

	function pointDepot (coord) {
		if ($scope.isInPointMode()) {
			console.log('pointDepot');
			$scope.newDepot.coord = {};
			$scope.newDepot.coord.lat = coord.lat();
			$scope.newDepot.coord.lng = coord.lng();
			$scope.newDepot.latitude = lat2latitude(coord.lat());
			$scope.newDepot.longitude = lng2longitude(coord.lng());
			$scope.$apply('newDepot');
			
			$scope.gmapCursor = 'default';
			$scope.$apply('gmapCursor');
		}
	}

	function dragDepot (coord) {
		$scope.newDepot.coord.lat = coord.lat();
		$scope.newDepot.coord.lng = coord.lng();
		$scope.newDepot.latitude = lat2latitude(coord.lat());
		$scope.newDepot.longitude = lng2longitude(coord.lng());
		$scope.$apply('newDepot');
	}
	
	function cancelAdd () {
		addMode = false;
		$scope.gmapCursor = 'default';
		$scope.newDepot = {};
	}
	
	function confirmAdd () {
		depotApi.add($scope.town.id, $scope.newDepot).then(
			function success (response) {
				refreshDepots();
				cancelAdd();
			},
			function error (response) {
			});
	}
	
// obsługa animacji
	function startAnimation (depot) {
		animation[depot.id] = 'bounce';
	}
	
	function stopAnimation (depot) {
		animation[depot.id] = '';
	}
	
	function getAnimation (depot) {
		return animation[depot.id];
	}
	
	// odświeżanie list przystanków (depots)
	var refreshDepots = function () {
		depotApi.listForTown($scope.town.id).then(
			function success(response) {
				$scope.depots = response.data;
			},
			function error(response) {
				console.log('	error: ' + response.statusText);
			});
	}
	
	function coord2str (val) {
		// deg
		var value = val < 0 ? -val : val;
		var fraction = value % 1;
		var deg = value - fraction;

		// min
		value = 60 * fraction;
		fraction = value % 1;
		var min = value - fraction;

		// sec
		value = 60 * fraction;
		var sec = value.toFixed(0);

		return deg.toString()+'°'+min.toString()+'\''+sec.toString()+'"';
	}
	
	var lat2latitude = function (lat) {
		var hs = lat < 0 ? 'S' : 'N';
		return coord2str(lat) + hs;
	}
	
	var lng2longitude = function (lng) {
		var hs = lng < 0 ? 'W' : 'E';
		return coord2str(lng) + hs;
	}
	
} // end of depotCtrl
