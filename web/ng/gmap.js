angular.module('gmap', [])

.directive('gmap', gmap);

function gmap() {
	return {
		restrict: 'E',
		template: "<div></div>",
		replace: true,
		scope: false,
		link: function(scope, element, attrs) {
			var centralPoint = new google.maps.LatLng(51.764, 19.463);
			var mapOption = {
				center: centralPoint, 
				zoom: 6,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			
			scope.map = new google.maps.Map(element[0], mapOption);
		}/*end of link*/
	}
}
