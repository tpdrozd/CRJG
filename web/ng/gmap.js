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
		scope: {
			clickCallback: '&?',
			cursor: '@'
		},
		controller: function ($scope, $element, $attrs) {
			this.$onInit = function () {
				var map = new google.maps.Map($element[0], {
					center: new google.maps.LatLng($attrs.lat, $attrs.lng),
					zoom: parseInt($attrs.zoom),
					draggableCursor: 'auto',
					draggingCursor: 'move'
				});
				
				// cursors
				if (angular.isDefined($scope.cursor)) {
					map.setOptions({draggableCursor: $scope.cursor});
					
					$scope.$watch('cursor', function (newValue) {
						map.setOptions({draggableCursor: newValue});
					});
				}
				
				// click-callback
				if (angular.isDefined($scope.clickCallback)) {
					google.maps.event.addListener(map, 'click', function (event) {
						$scope.clickCallback({event: event});
					});
				}
				
				this.map = map;
			} // end of $onInit
			
			this.$postLink = function () {
			}
			
			this.$onChanges = function (chng) {
			}
			
			this.$onDestroy = function () {
			}
		}, // end of controller
		link: function (scope, element, attrs) {
			console.log('gmap postLink');
			scope.submitForm = function () {
				console.log('submit form');
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
			label:	'@',
			
			dragendCallback: '&?'
		},
		bindToController: true,
		controllerAs: '$mrkCtrl',
		controller: function ($scope, $element, $attrs) {
			var $gmapCtrl;
			
			this.$onInit = function () {
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
				this.renderPosition();
				
				// title
				this.marker.setTitle(this.title);
				
				// dragend-callback
				if (angular.isFunction(this.dragendCallback)) {
					this.marker.setDraggable(true);
					this.marker.setCursor('grab');
					
					var mrk = this.marker;
					var dragCalb = this.dragendCallback;
					
					google.maps.event.addListener(this.marker, 'dragstart', function (event) {
						mrk.setCursor('grabbing');
					});
					
					google.maps.event.addListener(this.marker, 'dragend', function (event) {
						mrk.setCursor('grab');
						dragCalb({event: event});
					});
				}
			}
			
			this.$onChanges = function (chng) {
				if (angular.isDefined(this.marker)) {
					
					// label
					if (angular.isDefined(chng.label)) {
						var labelOpt = this.marker.getLabel();
						labelOpt.text = chng.label.currentValue;
						this.marker.setLabel(labelOpt);
					}
					
					// position
					if (angular.isDefined(chng.lat) || angular.isDefined(chng.lng)) {
						this.renderPosition();
						console.log('$onChanges position ' + this.lat + ' ' + this.lng);
					}

					// title
					if (angular.isDefined(chng.title)) {
						this.marker.setTitle(chng.title.currentValue);
					}
				}
			}
			
			this.$postLink = function () {
				$gmapCtrl = $scope.gmapCtrl;
				this.marker.setMap($gmapCtrl.map);
			}
			
			this.$onDestroy = function () {
				this.marker.setVisible(false);
			}
			
			this.renderPosition = function () {
				var lat = parseFloat(this.lat);
				var lng = parseFloat(this.lng);

				var isInRange = 
					!isNaN(lat) && lat >= -90 && lat <= 90 &&
					!isNaN(lng) && lng >= -180 && lng <= 180;
				
				if (isInRange) {
					var position = new google.maps.LatLng(lat, lng);
					this.marker.setPosition(position);
				}
				if (this.marker.getVisible() != isInRange)
					this.marker.setVisible(isInRange);
			}
		}, // end of controller
		link: function (scope, element, attrs, gmapCtrl) {
			scope.gmapCtrl = gmapCtrl;
		} // end of compile
	} // end of return
} // end of Marker

function InfoWindow($compile) {
	return {
		restrict: 'E',
		require: ['^^gmap', '^^?marker'],
		scope: false,
		controller: function ($scope, $element, $attrs) {
			var infoWindow;
			var opened = false;
			var mapRef, markerRef;
			
			var close = function () {
				infoWindow.close();
				opened = false;
			}
			var open = function () {
				infoWindow.open(mapRef, markerRef);
				opened = true;
			}
			
			this.$onInit = function () {
				infoWindow = new google.maps.InfoWindow();
				
				var form = $compile($element.html())($scope);
				infoWindow.setContent(form[0]);
//				infoWindow.setContent($element.html());
				
				var observer = new MutationObserver(function (mutationList) {
					infoWindow.setContent($element.html());
				});
				observer.observe($element[0], {
					characterData: true,
					subtree: true
				})
				
				google.maps.event.addListener(infoWindow, 'closeclick', function() {
					opened = false;
				});
			}

			this.$postLink = function () {
				mapRef = $scope.gmapCtrl.map;
				
				if (angular.isDefined($scope.markerCtrl)) {
					markerRef = $scope.markerCtrl.marker;
					var cls = this.close;
					var opn = this.open;
					
					// click listener
					google.maps.event.addListener(markerRef, 'click', function() {
						if (opened)
							close();
						else
							open();
					});
					
					// visible-changed listener
					google.maps.event.addListener(markerRef, 'visible_changed', function () {
						if (!markerRef.getVisible())
							close();
						else if ($attrs.visible == 'true')
							open();
					});
				}
				
				if ($attrs.visible == 'true')
					open();
			}

			this.$onDestroy = function () {
				close();
			}
		},
		link: function (scope, element, attrs, ctrls) {
			scope.gmapCtrl = ctrls[0];
			if (ctrls.length > 1)
				scope.markerCtrl = ctrls[1];
		} // end of link
	} // end of return
} // end of InfoWindow
