angular.module('mapModule', [])

.controller('mapCtrl', mapCtrl)
.directive('gmap', gmap);

function mapCtrl($scope) {
	
	$scope.$on('LocalitySelected',
		function(event, locality) {
			var centralPoint = new google.maps.LatLng(locality.lat, locality.lon);
			$scope.map.setCenter(centralPoint);
			
	});
}

function gmap() {
	return {
		restrict: 'E',
		template: "<div></div>",
		replace: true,
		scope: false,
		link: function(scope, element, attrs) {
			scope.map = initGmap(element, attrs);
			
		}/*end of link*/
	}
	
	function initGmap(elem, attrs) {
		var lat = attrs['lat'];
		var lng = attrs['lng'];
		var zoom = parseInt(attrs['zoom']);
		
		var option = {
			center: new google.maps.LatLng(lat, lng), 
			zoom: zoom
		};
		return new google.maps.Map(elem[0], option);
	}
}
