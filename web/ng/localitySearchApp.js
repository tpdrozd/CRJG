angular.module('localitySearchApp', ['hints'])

.controller('localitySearchCtrl', localitySearchCtrl);

function localitySearchCtrl($scope, hintService) {
	$scope.locality = {name: 'asd'};
	
	// by event
	$scope.$on('selectHint', function(event, hint) {
		$scope.locality = hint;
	});
} // end of localitySearchCtrl
