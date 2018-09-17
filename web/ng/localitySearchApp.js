angular.module('localitySearchApp', ['hints', 'gmap'])

.controller('localitySearchCtrl', localitySearchCtrl);

function localitySearchCtrl($scope) {
	$scope.a = {};
	$scope.locality = {};

	// mark hint
	$scope.$on('markHint', function (event, hint) {
		console.log('APP received markHint: ' + hint.name);
		$scope.a = hint;
		$scope.$apply('a');
	});
	
	// unmark hint
	$scope.$on('unmarkHint', function (event) {
		console.log('APP received unmarkHint');
		$scope.a = {};
		$scope.$apply('a');
	});
	
	// select hint
	$scope.$on('selectHint', function(event, hint) {
		console.log('APP received selectHint: ' + hint.name);
		$scope.locality = hint;
	});
} // end of localitySearchCtrl
