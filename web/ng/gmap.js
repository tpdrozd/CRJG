angular.module('gmap', [])

.constant('blueIcon', 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png')
.directive('gmap', gmap);

function gmap(blueIcon) {
	var gmap, markedMarker, selectedMarker;
	var unzoomed = true;
	
	return {
		restrict: 'E',
		template: "<div class='gmap'></div>",
		replace: true,
		scope: true,
		link: function(scope, element, attrs) {
			gmap = initGmap(element, attrs);
			
			markedMarker = new google.maps.Marker({map: gmap, icon: blueIcon});
			scope.$on('markLocality', showMarked);
			scope.$on('unmarkLocality', hideMarked);
			
			selectedMarker = new InfoMarker();
			scope.$on('selectLocality', showSelected);
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
		
		var map = new google.maps.Map(elem[0], option);
		google.maps.event.addListener(map, 'zoom_changed', function() {
			unzoomed = false;
		});
		
		return map;
	}
	
	function showMarked (event, locality) {
		var position = new google.maps.LatLng(locality.lat, locality.lng);
		markedMarker.setPosition(position);
		markedMarker.setTitle(locality.name);
		markedMarker.setVisible(true);
	}
	
	function hideMarked (event) {
		markedMarker.setVisible(false);
	}
	
	function showSelected (event, locality) {
		if (angular.isDefined(locality.name)) {
			console.log('GMAP received selectLocality: ' + locality.name);
			selectedMarker.pointTo(locality);
			gmap.setCenter(selectedMarker.position);
			if (unzoomed)
				gmap.setZoom(10);
		}
	}
	
	function GoogleMap (element, attrs) {
		var initialPosition = new google.maps.LatLng(attrs.lat, attrs.lng);
		var initialZoom = parseInt(attrs.zoom);
		var initialOption = {
			center: initialPosition,
			zoom: initialZoom
		};
		
		this.map = new google.maps.Map(element, initialOption);
		
		var userZoom;
		google.maps.event.addListener(this.map, 'zoom_changed', function() {
			userZoom = this.map.getZoom();
		});
	}
	
	function InfoMarker() {
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
