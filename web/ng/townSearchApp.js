angular.module('townSearchApp', ['hints', 'gmap'])

.controller('townSearchCtrl', townSearchCtrl);

function townSearchCtrl($scope) {
	$scope.a = {};
	$scope.town = {};

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
		$scope.town = hint;
	});
} // end of townSearchCtrl
