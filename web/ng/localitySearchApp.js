angular.module('localitySearchApp', ['hints'])

.controller('localitySearchCtrl', localitySearchCtrl);

function localitySearchCtrl($scope, searchSrv) {
	$scope.locality = {};
} /* end of localitySearchCtrl */
