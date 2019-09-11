angular.module('spatial', [])

.constant('apiUrl', '/crjg/spatial')
.constant('apiSuffix', '.mvc')

.factory('spatialApi', spatialApi);

function spatialApi ($http, apiUrl, apiSuffix) {
	
	function url(path) {
		if (path == null || angular.isUndefined(path))
			return apiUrl + apiSuffix;
		else
			return apiUrl + '/' + path + apiSuffix;
	}
	
	function req(path, coord, radius) {
		var config = {
			method: 'PUT',
			url: url(path),
			data: {
				coord:	coord,
				radius:	radius
			}
		}
		return $http(config);
	}

	return {
		findTowns: function(coord, radius) {
			return req('towns', coord, radius);
		},
		
		findDepots: function(coord, radius) {
			
		},
		
		findAll: function(coord, radius) {
			
		}
	}
	
}