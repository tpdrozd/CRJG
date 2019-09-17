angular.module('spatial', [])

.constant('spatialApiUrl', '/crjg/spatial')
.constant('spatialApiSuffix', '.mvc')

.factory('spatialApi', spatialApi);

function spatialApi ($http, spatialApiUrl, spatialApiSuffix) {
	
	function url(path) {
		if (path == null || angular.isUndefined(path))
			return spatialApiUrl + spatialApiSuffix;
		else
			return spatialApiUrl + '/' + path + spatialApiSuffix;
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