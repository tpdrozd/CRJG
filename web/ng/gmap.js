angular.module('gmap', [])

.constant('icons', {
	red:		'http://maps.google.com/mapfiles/ms/icons/red.png',			// czerwony
	redDot:		'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
	redPin:		'http://maps.google.com/mapfiles/ms/icons/red-pushpin.png',
	
	green:		'http://maps.google.com/mapfiles/ms/icons/green.png',		// zielony
	greenDot:	'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
	greenPin:	'http://maps.google.com/mapfiles/ms/micons/grn-pushpin.png',
	
	blue:		'http://maps.google.com/mapfiles/ms/icons/blue.png',		// niebieski
	blueDot:	'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
	bluePin:	'http://maps.google.com/mapfiles/ms/icons/blue-pushpin.png',
	
	ltblue:		'http://maps.google.com/mapfiles/ms/icons/lightblue.png',	// jasno-niebieski
	ltblueDot:	'http://maps.google.com/mapfiles/ms/icons/ltblue-dot.png',
	ltbluePin:	'http://maps.google.com/mapfiles/ms/micons/ltblu-pushpin.png',
	
	yellow:		'http://maps.google.com/mapfiles/ms/icons/yellow.png',		// żółty
	yellowDot:	'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
	yellowPin:	'http://maps.google.com/mapfiles/ms/micons/ylw-pushpin.png',
	
	orange: 	'http://maps.google.com/mapfiles/ms/icons/orange.png',		// pomarańczowy
	orangeDot: 	'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
	
	pink:		'http://maps.google.com/mapfiles/ms/icons/pink.png',		// różowy
	pinkDot:	'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
	pinkPin:	'http://maps.google.com/mapfiles/ms/icons/pink-pushpin.png',
	
	purple:		'http://maps.google.com/mapfiles/ms/icons/purple.png',		// fioletowy
	purpleDot:	'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
	purplePin:	'http://maps.google.com/mapfiles/ms/icons/purple-pushpin.png',
	
	grey:		'http://maps.google.com/mapfiles/ms/icons/grey.png',		// szary
	
})

.factory('markerOptions', function() {
	var icons = {
		red: {
			url: '/crjg/img/icon/red.png',
			color: 'rgb(212, 61, 58)' // 212 61 58
		},	
		green: {
			url: '/crjg/img/icon/green.png',
			color: 'rgb(136, 166, 84)' // 136 166 84
		},
		greenDark: {
			url: '/crjg/img/icon/green-darker.png',
			color: 'rgb(45, 150, 136)' // 45 150 136
		},
		blue: {
			url: '/crjg/img/icon/blue.png',
			color: 'rgb(40, 122, 167)' // 40 122 167
		},
		blueDark: {
			url: '/crjg/img/icon/blue-darker.png',
			color: 'rgb(51, 102, 165)' // 51 102 165
		},
		dark: {
			url: '/crjg/img/icon/dark.png',
			color: 'rgb(57, 57, 57)' // 57 57 57
		},
		orange: {
			url: '/crjg/img/icon/orange.png',
			color: 'rgb(217, 119, 32)' // 217 119 32
		},
		pink: {
			url: '/crjg/img/icon/pink.png',
			color: 'rgb(196, 67, 124)' // 196 67 124
		}
	};
	
	var size = {
		scaledSize: new google.maps.Size(45, 45),
		labelOrigin: new google.maps.Point(23, 17),
		fontWeight: 'bold',
		fontSize: '16px'
	};
	
	return {
		getIcon: function (iconKey) {
			var opt = icons[iconKey];
			if (angular.isDefined(opt)) {
				var icon = {};
				icon.url = opt.url;
				icon.scaledSize = size.scaledSize;
				icon.labelOrigin = size.labelOrigin;
				return icon;
			}
		},
		getLabel: function (iconKey) {
			var label = {};
			label.text = '';
			
			var opt = icons[iconKey];
			if (angular.isDefined(opt)) {
				label.color = opt.color;
				label.fontWeight = size.fontWeight;
				label.fontSize = size.fontSize;
			}
			
			return label;
		}
	}
})

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

function Marker(markerOptions) {
	return {
		restrict: 'E',
		require: '^^gmap',
		transclude: false,
		scope: {
			lat:	'@',
			lng:	'@',
			title:	'@',
			icon:	'@',
			label:	'@'
		},
		bindToController: true,
		controllerAs: '$mrkCtrl',
		controller: function ($scope, $element, $attrs) {
			var $gmapCtrl;
			
			this.$onInit = function () {
				console.log('marker $onInit');
				this.marker = new google.maps.Marker();

				// icon
				var iconOpt = markerOptions.getIcon(this.icon);
				this.marker.setIcon(iconOpt);
				
				// label
				if (angular.isDefined(this.label)) {
					var labelOpt = markerOptions.getLabel(this.icon);
					labelOpt.text = this.label;
					this.marker.setLabel(labelOpt);
				}
				
				// position
				var position = new google.maps.LatLng(this.lat, this.lng);
				this.marker.setPosition(position);
				this.marker.setVisible(true);
				
				// title
				this.marker.setTitle(this.title);
			}
			this.$onChanges = function (chng) {
				if (angular.isDefined(this.marker) && angular.isDefined(chng)) {
					console.log('marker $onChanges');
					var position = new google.maps.LatLng(this.lat, this.lng);
					this.marker.setPosition(position);
					this.marker.setTitle(this.title);
					
					if (angular.isDefined(chng.label)) {
						var labelOpt = this.marker.getLabel();
						labelOpt.text = chng.label.currentValue;
						this.marker.setLabel(labelOpt);
					}
					
					this.marker.setVisible(true);
				}
			}
			this.$postLink = function () {
				console.log('marker $postLink');
				$gmapCtrl = $scope.gmapCtrl;
				this.marker.setMap($gmapCtrl.map);
			}
			this.$onDestroy = function () {
				console.log('marker $onDestroy');
				this.marker.setVisible(false);
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
			var infoWn;
			
			this.$onInit = function () {
				console.log('infoWindow $onInit');
			}
			this.$postLink = function () {
				console.log('infoWindow $postLink');
				$gmapCtrl = $scope.gmapCtrl;
				$mrkCtrl = $scope.mrkCtrl;
				infoWn = new InfoWn($gmapCtrl.map, $mrkCtrl.marker);
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
				infoWn.close();
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
	
	this.close = function () {
		infoWindow.close();
		opened = false;
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
