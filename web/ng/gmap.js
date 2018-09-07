angular.module('gmap', [])

.constant('blueIcon', 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png')

.directive('gmap', Gmap)
.directive('marker', Marker)
.directive('infoWindow', InfoWindow);

function Gmap() {
	return {
		restrict: 'AC',
		template: '<ng-transclude/>',
		transclude: true,
		scope: true,
		controller: function ($scope, $element, $attrs) {
			this.$onInit = function () {
				console.log('gmap $onInit');
				
				this.map = new google.maps.Map($element[0], {
					center: new google.maps.LatLng($attrs.lat, $attrs.lng),
					zoom: parseInt($attrs.zoom)
				});
				
//				google.maps.event.addListener(this.map, 'zoom_changed', function() {
//					zoom = this.map.getZoom();
//					console.log('gmap zoom_changed ' + zoom);
//				});
			}
			this.$postLink = function () {
				console.log('gmap $postLink');
			}
			this.$onChanges = function (chng) {
				if (angular.isDefined(chng))
					console.log('gmap $onChanges');
			}
			this.$onDestroy = function () {
				console.log('gmap $onDestroy');
			}
			this.zoomAt = function (center) {
				this.map.setCenter(center);
//				this.map.setZoom(zoom);
			}
		}, // end of controller
		compile: function (tElement, tAttrs) {
			console.log('gmap compile');
			return {
				pre: function (scope, element, attrs) {
					console.log('gmap preLink');
				},
				post: function (scope, element, attrs) {
					console.log('gmap postLink');
				}
			}
		}
	} // end of return
} // end of Gmap

function Marker(blueIcon) {
	return {
		restrict: 'E',
		require: '^^gmap',
		transclude: false,
		scope: {
			title:	'@',
			lat:	'@',
			lng:	'@'
		},
		bindToController: true,
		controllerAs: '$mrkCtrl',
		controller: function ($scope, $element, $attrs) {
			var $gmapCtrl;
			
			this.$onInit = function () {
				console.log('marker $onInit');
				this.marker = new google.maps.Marker({});
			}
			this.$postLink = function () {
				console.log('marker $postLink');
				$gmapCtrl = $scope.gmapCtrl;
				this.marker.setMap($gmapCtrl.map);
			}
			this.$onChanges = function (chng) {
				if (angular.isDefined(this.marker) && angular.isDefined(chng)) {
					console.log('marker $onChanges');
					var position = new google.maps.LatLng(chng.lat.currentValue, chng.lng.currentValue);
					this.marker.setPosition(position);
					this.marker.setTitle(chng.title.currentValue);
					this.marker.setVisible(true);
				}
			}
			this.$onDestroy = function () {
				console.log('marker $onDestroy');
			}
		}, // end of controller
		compile: function (tElement, tAttrs) {
			console.log('marker compile');
			return {
				pre: function (scope, element, attrs, gmapCtrl) {
					console.log('marker preLink');
				},
				post: function (scope, element, attrs, gmapCtrl) {
					console.log('marker postLink');
					scope.gmapCtrl = gmapCtrl;
				}
			}
		} // end of compile
	} // end of return
} // end of Marker

function InfoWindow() {
	return {
		restrict: 'E',
		require: ['^^gmap', '^^?marker'],
		scope: false,
		controller: function ($scope, $element, $attrs) {
			var $gmapCtrl;
			var $mrkCtrl;
			
			this.$onInit = function () {
				console.log('infoWindow $onInit');
			}
			this.$postLink = function () {
				console.log('infoWindow $postLink');
				$gmapCtrl = $scope.gmapCtrl;
				$mrkCtrl = $scope.mrkCtrl;
				var infoWn = new InfoWn($gmapCtrl.map, $mrkCtrl.marker);
				infoWn.setContent('test');
				
				var callback = function (mutationList) {
					console.log('infoWindow change content');
					infoWn.setContent($element.html());
				}

				var observer = new MutationObserver(callback);
				observer.observe($element[0], {
					characterData: true,
					subtree: true
				})
			}
			this.$onChanges = function (chng) {
				if (angular.isDefined(chng))
					console.log('infoWindow $onChanges');
			}
			this.$onDestroy = function () {
				console.log('infoWindow $onDestroy');
			}
		},
		compile: function (tElement, tAttrs) {
			console.log('infoWindow compile');
			return {
				pre: function (scope, element, attrs, ctrls) {
					console.log('infoWindow preLink');
				},
				post: function (scope, element, attrs, ctrls) {
					console.log('infoWindow postLink');
					scope.gmapCtrl = ctrls[0];
					scope.mrkCtrl = ctrls[1];
				}
			}
		} // end of compile
	} // end of return
} // end of InfoWindow

function InfoWn (map, marker) {
	var mapRef = map;
	var markerRef = marker;
	
	var infoWindow = new google.maps.InfoWindow();
	var opened = false;
	
	google.maps.event.addListener(infoWindow, 'closeclick', function() {
		opened = false;
	});
	
	google.maps.event.addListener(markerRef, 'click', function() {
		if (opened) {
			infoWindow.close();
			opened = false;
		}
		else {
			infoWindow.open(mapRef, markerRef);
			opened = true;
		}
	});
	
	this.setContent = function (cnt) {
		infoWindow.setContent(cnt);
	}
} // end of InfoWn

function InfoMarker() {

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
