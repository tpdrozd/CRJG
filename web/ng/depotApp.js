angular.module('depotApp', ['hints', 'gmap'])

.controller('depotCtrl', depotCtrl);

function depotCtrl($scope, $http) {
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
		console.log('list depots: ' + hint.id);
		$http.post('/crjg/depot/list.mvc', hint.id).then(
			function success(response) {
				console.log('	success: ' + response.statusText);
				$scope.depots = response.data;
			},
			function error(response) {
				console.log('	error: ' + response.statusText);
			});
	});

	// obsługa dodawania przystanku
	$scope.depot = {};
	$scope.gmapCursor = 'default';
	
	$scope.startAdding = function () {
		console.log('start adding');
		$scope.addingDepot = true;
		$scope.gmapCursor = 'crosshair';
	}

	$scope.cancelAdding = function () {
		console.log('cancel adding');
		$scope.depot = {};
		$scope.gmapCursor = 'default';
		$scope.addingDepot = false;
	}
	
	$scope.pointDepot = function (coord) {
		if ($scope.addingDepot) {
			console.log('point depot :'	+ coord.lat() + ', ' + coord.lng());
			$scope.depot.coord = {};
			$scope.depot.coord.lat = coord.lat();
			$scope.depot.coord.lng = coord.lng();
			$scope.gmapCursor = 'default';
			$scope.addingDepot = false;
			$scope.$apply('depot');
		}
	}
	
	$scope.mooveDepot = function (coord) {
		console.log('moove depot :'	+ coord.lat() + ', ' + coord.lng());
		$scope.depot.coord.lat = coord.lat();
		$scope.depot.coord.lng = coord.lng();
		$scope.$apply('depot');
	}
	
	$scope.saveDepot = function () {
		console.log('save depot: '
				+ $scope.depot.name + ' '
				+ $scope.depot.coord.lat + ' '
				+ $scope.depot.coord.lng);
		
		// save depot to db
		$http.put("/crjg/depot/save.mvc", {
			'townId': $scope.town.id,
			'depot' : $scope.depot
		}).then(
			function success (response) {
				console.log('	success: ' + response.statusText);
				$scope.depot = {};
				// tu skończyłem
			},
			function error (response) {
				console.log('	error: ' + response.statusText);
			});
	}

//	$scope.depots = []; ???
	
} // end of depotCtrl
