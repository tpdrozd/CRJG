angular.module('localitySearchApp', ['hints'])

.controller('localitySearchCtrl', localitySearchCtrl);

function localitySearchCtrl($scope, searchSrv) {
	$scope.criteria = {
		name: '',
		wojew: '',
		hist: false,
		collat: false,
		foreign: false,
		matching: 'START',
		kind: 'STANDALONE'
	};
	
	$scope.locality = {};
} /* end of localitySearchCtrl */
