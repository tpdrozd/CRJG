angular.module('localitySearchApp', ['formModule', 'mapModule'])

.controller('mainCtrl', mainCtrl);

function mainCtrl($scope) {
	
	$scope.$on('LocalityEntered',
		function(event, locality) {
			$scope.$broadcast('LocalitySelected', locality);
	});
	
}

