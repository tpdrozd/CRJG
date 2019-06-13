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
	
	
// obsługa przeglądania
	function isInReadMode (depot) {
		return selectedId != depot.id;
	}
	
// edytowanie
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
	
// usuwanie
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
	
	
	// obsługa dodawania przystanku
	$scope.newDepot			= {};
	$scope.addMode			= false;
	$scope.isInPointMode	= isInPointMode;
	
	$scope.startAdd		= startAdd;
	$scope.pointDepot	= pointDepot;
	$scope.dragDepot	= dragDepot;
	$scope.confirmAdd	= confirmAdd;
	$scope.cancelAdd	= cancelAdd;

	$scope.gmapCursor = 'default';

	function isInPointMode () {
		return $scope.addMode && !angular.isDefined($scope.newDepot.coord);
	}
	
	function startAdd () {
		$scope.newDepot = {};
		$scope.gmapCursor = 'crosshair';
		$scope.addMode = true;
	}

	function pointDepot (coord) {
		if ($scope.isInPointMode()) {
			console.log('pointDepot');
			$scope.newDepot.coord = {};
			$scope.newDepot.coord.lat = coord.lat();
			$scope.newDepot.coord.lng = coord.lng();
			$scope.$apply('newDepot');
			
			$scope.gmapCursor = 'default';
		}
	}

	function dragDepot (coord) {
		$scope.newDepot.coord.lat = coord.lat();
		$scope.newDepot.coord.lng = coord.lng();
		//$scope.$apply('depot');
	}
	
	function confirmAdd () {
		depotApi.add($scope.town.id, $scope.newDepot).then(
			function success (response) {
				refreshDepots();
				$scope.addMode = false;
				$scope.gmapCursor = 'default';
				$scope.newDepot = {};
			},
			function error (response) {
				
			});
	}
	
	function cancelAdd () {
		$scope.addMode = false;
		$scope.gmapCursor = 'default';
		$scope.newDepot = {};
	}

	// odświezanie list przystanków (depots)
	var refreshDepots = function () {
		depotApi.listForTown($scope.town.id).then(
			function success(response) {
				$scope.depots = response.data;
			},
			function error(response) {
				console.log('	error: ' + response.statusText);
			});
	}

} // end of depotCtrl
