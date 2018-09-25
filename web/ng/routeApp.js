angular.module('routeApp', ['hints', 'gmap', angularDragula(angular)])

.controller('routeCtrl', routeCtrl);

function routeCtrl($scope) {
	$scope.hint = {};
	$scope.stops = [];

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
		delete $scope.stops[index];
		$scope.stops = $scope.stops.filter(function (value) {
			return value != undefined;
		});
	};
} // end of localitySearchCtrl
