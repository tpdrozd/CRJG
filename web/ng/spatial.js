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
	
	function putReq(path, data) {
		var config = {
			method: 'PUT',
			url: url(path),
			data: data
		}
		return $http(config);
	}

	return {
		findTowns: function(coord, radius) {
			return putReq('towns', {
				coord:	coord,
				radius:	radius
			});
		},
		
		findDepots: function(coord, radius) {
			
		},
		
		findAll: function(coord, radius) {
			
		},
		
		distance: function(placeAId, placeBId) {
			return putReq('distance', {
				placeAId: placeAId,
				placeBId: placeBId
			});
		}
	}
	
}