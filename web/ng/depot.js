angular.module('depot', [])

.constant('depotApiUrl', '/crjg/depot')
.constant('depotApiSuffix', '.mvc')

.factory('depotApi', depotApi);

function depotApi($http, depotApiUrl, depotApiSuffix) {
	
	function url(id) {
		if (id == null || angular.isUndefined(id))
			return depotApiUrl + depotApiSuffix;
		else
			return depotApiUrl + '/' + id + depotApiSuffix;
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