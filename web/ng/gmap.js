angular.module('gmap', [])

.constant('mapStyle', [
	{
		"elementType": "geometry",
		"stylers": [{"color": "#ebe3cd"}]
	},{
		"elementType": "labels.text.fill",
		"stylers": [{"color": "#523735"}]
	},{
		"elementType": "labels.text.stroke",
		"stylers": [{"color": "#f5f1e6"}]
	},{
		"featureType": "administrative",
		"elementType": "geometry.stroke",
		"stylers": [{"color": "#c9b2a6"}]
	},{
		"featureType": "administrative.land_parcel",
		"elementType": "geometry.stroke",
		"stylers": [{"color": "#dcd2be"}]
	},{
		"featureType": "administrative.land_parcel",
		"elementType": "labels.text.fill",
		"stylers": [{"color": "#ae9e90"}]
	},{
		"featureType": "landscape.natural",
		"elementType": "geometry",
		"stylers": [{"color": "#dfd2ae"}]
	},{
		"featureType": "poi",
		"elementType": "geometry",
		"stylers": [{"color": "#dfd2ae"}]
	},{
		"featureType": "poi",
		"elementType": "labels.text.fill",
		"stylers": [{"color": "#93817c"}]
	},{
		"featureType": "poi.park",
		"elementType": "geometry.fill",
		"stylers": [{"color": "#a5b076"}]
	},{
		"featureType": "poi.park",
		"elementType": "labels.text.fill",
		"stylers": [{"color": "#447530"}]
	},{
		"featureType": "road",
		"elementType": "geometry",
		"stylers": [{"color": "#f5f1e6"}]
	},{
		"featureType": "road.arterial",
		"elementType": "geometry",
		"stylers": [{"color": "#fdfcf8"}]
	},{
		"featureType": "road.highway",
		"elementType": "geometry",
		"stylers": [{"color": "#f8c967"}]
	},{
		"featureType": "road.highway",
		"elementType": "geometry.stroke",
		"stylers": [{"color": "#e9bc62"}]
	},{
		"featureType": "road.highway.controlled_access",
		"elementType": "geometry",
		"stylers": [{"color": "#e98d58"}]
	},{
		"featureType": "road.highway.controlled_access",
		"elementType": "geometry.stroke",
		"stylers": [{"color": "#db8555"}]
	},{
		"featureType": "road.local",
		"elementType": "labels.text.fill",
		"stylers": [{"color": "#806b63"}]
	},{
		"featureType": "transit.line",
		"elementType": "geometry",
		"stylers": [{"color": "#dfd2ae"}]
	},{
		"featureType": "transit.line",
		"elementType": "labels.text.fill",
		"stylers": [{"color": "#8f7d77"}]
	},{
		"featureType": "transit.line",
		"elementType": "labels.text.stroke",
		"stylers": [{"color": "#ebe3cd"}]
	},{
		"featureType": "transit.station",
		"elementType": "geometry",
		"stylers": [{"color": "#dfd2ae"}]
	},{
		"featureType": "water",
		"elementType": "geometry.fill",
		"stylers": [{"color": "#b9d3c2"}]
	},{
		"featureType": "water",
		"elementType": "labels.text.fill",
		"stylers": [{"color": "#92998d"}]
	}])
.constant('icons', {
	pure: {
		red:		'http://maps.google.com/mapfiles/ms/icons/red.png',			// czerwony
		green:		'http://maps.google.com/mapfiles/ms/icons/green.png',		// zielony
		blue:		'http://maps.google.com/mapfiles/ms/icons/blue.png',		// niebieski
		blueLight:	'http://maps.google.com/mapfiles/ms/icons/lightblue.png',	// jasno-niebieski
		yellow:		'http://maps.google.com/mapfiles/ms/icons/yellow.png',		// żółty
		orange: 	'http://maps.google.com/mapfiles/ms/icons/orange.png',		// pomarańczowy
		pink:		'http://maps.google.com/mapfiles/ms/icons/pink.png',		// różowy
		purple:		'http://maps.google.com/mapfiles/ms/icons/purple.png',		// fioletowy
		grey:		'http://maps.google.com/mapfiles/ms/icons/grey.png'			// szary
	},
	dot: {
		red:		'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
		green:		'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
		blue:		'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
		blueLight:	'http://maps.google.com/mapfiles/ms/icons/ltblue-dot.png',
		yellow:		'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
		orange: 	'http://maps.google.com/mapfiles/ms/icons/orange-dot.png',
		pink:		'http://maps.google.com/mapfiles/ms/icons/pink-dot.png',
		purple:		'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
//		grey:		'??'
	},
	pin: {
		red:		'http://maps.google.com/mapfiles/ms/icons/red-pushpin.png',
		green:		'http://maps.google.com/mapfiles/ms/micons/grn-pushpin.png',
		blue:		'http://maps.google.com/mapfiles/ms/icons/blue-pushpin.png',
		blueLight:	'http://maps.google.com/mapfiles/ms/micons/ltblu-pushpin.png',
		yellow:		'http://maps.google.com/mapfiles/ms/micons/ylw-pushpin.png',
//		orange:		'??',
		pink:		'http://maps.google.com/mapfiles/ms/icons/pink-pushpin.png',
		purple:		'http://maps.google.com/mapfiles/ms/icons/purple-pushpin.png'
//		grey:		'??'
	},
	lbl: {
		red: {
			url: '/crjg/img/icon/red.png',
			color: 'rgb(212, 61, 58)'
		},	
		green: {
			url: '/crjg/img/icon/green.png',
			color: 'rgb(136, 166, 84)'
		},
		greenDark: {
			url: '/crjg/img/icon/green-darker.png',
			color: 'rgb(45, 150, 136)'
		},
		blue: {
			url: '/crjg/img/icon/blue.png',
			color: 'rgb(40, 122, 167)'
		},
		blueDark: {
			url: '/crjg/img/icon/blue-darker.png',
			color: 'rgb(51, 102, 165)'
		},
		dark: {
			url: '/crjg/img/icon/dark.png',
			color: 'rgb(57, 57, 57)'
		},
		orange: {
			url: '/crjg/img/icon/orange.png',
			color: 'rgb(217, 119, 32)'
		},
		pink: {
			url: '/crjg/img/icon/pink.png',
			color: 'rgb(196, 67, 124)'
		}
	}
})

.factory('markerOptions', function(icons) {
	var icon = {
		scaledSize: new google.maps.Size(45, 45),
		labelOrigin: new google.maps.Point(23, 17)
	};
	var label = {
		fontWeight: 'bold',
		fontSize: '16px'
	};
	
	return {
		getOptions: function (iconKey) {
			var keys = iconKey.split('.');
			var opt = (icons[keys[0]])[keys[1]];
			
			if (angular.isString(opt)) {
				return {
					icon: opt
				};
			}
			
			else if (angular.isObject(opt)) {
				return {
					icon: {
						url: opt.url,
						scaledSize: icon.scaledSize,
						labelOrigin: icon.labelOrigin
					},
					label: {
						text: '',
						color: opt.color,
						fontWeight: label.fontWeight,
						fontSize: label.fontSize
					}
				};
			}
		}
	}
})

.directive('gmap', Gmap)
.directive('marker', Marker)
.directive('infoWindow', InfoWindow);

function Gmap(mapStyle) {
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
					draggingCursor: 'move'//,
//					mapTypeControlOptions: {
//						mapTypeIds: ['roadmap', 'satellite', 'retro']
//					}
				});
//				var mapType = new google.maps.StyledMapType(mapStyle , {name: 'Retro'});
//				map.mapTypes.set('retro', mapType);
//				map.setMapTypeId('retro');
				
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
			
			dragendCallback: '&?',
			dblclickCallback: '&?'
		},
		bindToController: true,
		controllerAs: '$mrkCtrl',
		controller: function ($scope, $element, $attrs) {
			var $gmapCtrl;
			
			this.$onInit = function () {
				// icon
				if (angular.isDefined(this.icon)) {
					var options = markerOptions.getOptions(this.icon);
					this.marker = new google.maps.Marker(options);
				}
				else
					this.marker = new google.maps.Marker();
				
				// label
				if (angular.isDefined(this.label)) {
					var labelOpt = this.marker.getLabel();
					if (angular.isDefined(labelOpt)) {
						labelOpt.text = this.label;
						this.marker.setLabel(labelOpt);
					}
					else
						this.marker.setLabel(this.label);
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
				
				// dblclick-callback
				if (angular.isFunction(this.dblclickCallback)) {
					console.log('marker adding dblclik listener');
					var dbclkCalb = this.dblclickCallback;
					google.maps.event.addListener(this.marker, 'dblclick', function (event) {
						console.log('marker dblclik');
						dbclkCalb({event: event});
					});
				}
			}
			
			this.$onChanges = function (chng) {
				if (angular.isDefined(this.marker)) {
					
					// label
					if (angular.isDefined(chng.label)) {
						var labelOpt = this.marker.getLabel();
						if (angular.isDefined(labelOpt)) {
							labelOpt.text = chng.label.currentValue;
							this.marker.setLabel(labelOpt);
						}
						else
							this.marker.setLabel(chng.label.currentValue);
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
					infoWindow.setContent($element.html()); // tu skończyłem
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
