angular.module('localitySearchApp', ['hints', 'gmap'])

.controller('localitySearchCtrl', localitySearchCtrl);

function localitySearchCtrl($scope, hintService) {
	$scope.locality = {};

	// by event
	$scope.$on('selectHint', function(event, hint) {
		console.log('APP received selectHint: ' + hint.name);
		$scope.locality = hint;
		$scope.$broadcast('selectLocality', hint);
	});
} // end of localitySearchCtrl
