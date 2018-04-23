angular.module('mapModule', [])

.controller('mapCtrl', mapCtrl)
.directive('gmap', gmap);

function mapCtrl($scope) {
	
	$scope.gmap = null;
	infoMarker = null;
	
	$scope.$on('LocalitySelected', function(event, locality) {
		showLocality(locality);
	});
	
	function showLocality (locality) {
		// ustawienie markera
		if (infoMarker == null) {
			infoMarker = new InfoMarker($scope.gmap);
			$scope.gmap.setZoom(10);
		}
		infoMarker.pointTo(locality);

		// wycentrowanie mapy
		$scope.gmap.setCenter(infoMarker.position);
	}
	
	function InfoMarker(map) {
		var gmap = map;
		var marker = null;
		var infoWn = null;
		var opened = false;
		
		this.position = null;
		this.pointTo = function(locality) {
			this.position = new google.maps.LatLng(locality.lat, locality.lon);
			marker.setPosition(this.position);
			marker.setTitle(locality.name);
			infoWn.setContent(infoContent(locality));
		}
		
		init();
		
		function init() {
			// inicjalizacja markera
			marker = new google.maps.Marker({map: gmap});
			google.maps.event.addListener(marker, 'click', function() {
				if (opened) {
					infoWn.close();
					opened = false;
				}
				else {
					infoWn.open(gmap, marker);
					opened = true;
				}
			});
			
			// inicjalizacja infoWindow
			infoWn = new google.maps.InfoWindow();
			google.maps.event.addListener(infoWn, 'closeclick', function() {
				opened = false;
			});
		} // end of init
		
		function infoContent(loc) {
			// pierwszy wiersz
			var content = "<b>" + loc.name + "</b>";
			if (loc.collateralName)
				content = content + " / <b><i>" + loc.collateralName + "</i></b>";
			if (loc.historicalName)
				content = content + " / <b><i>" + loc.historicalName + "</i></b>";
			if (loc.foreignName)
				content = content + " / <b><i>" + loc.foreignName + "</i></b>";
			if (loc.foreignLatin)
				content = content + " (<b><i>" + loc.foreignLatin + "</i></b>)";
			
			// drugi wiersz
			content = content + "<br/>";
			content = content + "<i>" + loc.type + "</i>";
			if (loc.parentName)
				content = content + " " + loc.parentName;
			
			return content;
		}
	} // end of InfoMarker
}

function gmap() {
	return {
		restrict: 'E',
		template: "<div></div>",
		replace: true,
		scope: false,
		link: function(scope, element, attrs) {
			scope.gmap = initGmap(element, attrs);
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
