angular.module('searchService', [])

.constant('firstPage', '/crjg/locality/search/firstPage.mvc')
.constant('nextPage', '/crjg/locality/search/nextPage.mvc')
.constant('prevPage', '/crjg/locality/search/prevPage.mvc')
.constant('currPage', '/crjg/locality/search/currPage.mvc')
.constant('release', '/crjg/locality/search/releasePages.mvc')
.constant('details', '/crjg/locality/search/details.mvc')

.factory('searchSrv', searchSrv);

function searchSrv($http, firstPage, nextPage, prevPage, currPage, release, details) {
	return {
		firstPage: function(name) {
			var url = firstPage + '?name=' + name;
			return $http.get(url);
		},
		nextPage: function() {
			return $http.get(nextPage);
		},
		prevPage: function() {
			return $http.get(prevPage);
		},
		currPage: function() {
			return $http.get(currPage);
		},
		release: function() {
			return $http.get(release);
		},
		details: function(id) {
			var url = details + '?id=' + id;
			return $http.get(url);
		}
	}
}