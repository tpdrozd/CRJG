angular.module('depot', [])

.constant('apiUrl', '/crjg/depot')
.constant('apiSuffix', '.mvc')

.factory('depotApi', depotApi);

function depotApi($http, apiUrl, apiSuffix) {
	
	function url(id) {
		if (id == null || angular.isUndefined(id))
			return apiUrl + apiSuffix;
		else
			return apiUrl + '/' + id + apiSuffix;
	}
	
	function req(method, id, data) {
		var config = {
			method: method,
			url: url(id),
			data: data
		}
		return $http(config);
	}
	
	return {
		listForTown: function(townId) {
			return req('GET', townId);
		},
		
		add: function(townId, depot) {
			return req('POST', null, {
				'townId': townId,
				'depot': depot
			});
		},
		
		save: function(depot) {
			return req('PUT', null, depot);
		},
		
		remove: function(id) {
			return req('DELETE', id);
		}
	}
}