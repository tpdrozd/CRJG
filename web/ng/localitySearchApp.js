angular.module('localitySearchApp', ['hints', 'hintService'])

.controller('localitySearchCtrl', localitySearchCtrl);

function localitySearchCtrl($scope, hintService) {
	$scope.locality = {name: 'asd'};
	
	// by event - tu skończyłem
//	$scope.$on('selectHint', function(event, hint) {
//		$scope.locality = hint;
//	});
	
	// by watching
	$scope.getSelectedHint = function() {
		return hintService.getSelectedHint();
	}
	$scope.$watch('getSelectedHint()', function(newValue, oldValue) {
		$scope.locality = newValue;
	});
} /* end of localitySearchCtrl */
