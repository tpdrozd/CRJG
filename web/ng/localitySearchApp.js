angular.module('localitySearchApp', ['hints'])

.controller('localitySearchCtrl', localitySearchCtrl);

function localitySearchCtrl($scope, searchSrv) {
	$scope.criteria = {
		name: '',
		wojew: 'lubelskie',
		hist: true,
		collat: false,
		foreign: false,
		matching: 'START',
		kind: 'ALL'
	};
	
	$scope.locality = {};
} /* end of localitySearchCtrl */
