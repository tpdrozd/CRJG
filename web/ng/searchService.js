angular.module('searchService', [])

.constant('firstPage', '/firstPage.mvc')
.constant('nextPage', '/nextPage.mvc')
.constant('prevPage', '/prevPage.mvc')
.constant('currPage', '/currPage.mvc')
.constant('releasePages', '/releasePages.mvc')
.constant('details', '/details.mvc')

.factory('searchSrv', searchSrv);

function searchSrv($http, firstPage, nextPage, prevPage, currPage, releasePages, details) {
	var firstPageUrl, nextPageUrl, prevPageUrl, currPageUrl, releasePagesUrl, detailsUrl; 
	return {
		setUrlBase: function(urlBase) {
			firstPageUrl	= urlBase + firstPage;
			nextPageUrl		= urlBase + nextPage;
			prevPageUrl		= urlBase + prevPage;
			currPageUrl		= urlBase + currPage;
			releasePagesUrl	= urlBase + releasePages;
			detailsUrl		= urlBase + details;
		},
		firstPage: function(criteria) {
			return $http.post(firstPageUrl, criteria);
		},
		nextPage: function() {
			return $http.get(nextPageUrl);
		},
		prevPage: function() {
			return $http.get(prevPageUrl);
		},
		currPage: function() {
			return $http.get(currPageUrl);
		},
		release: function() {
			return $http.get(releasePagesUrl);
		},
		details: function(id) {
			return $http.post(detailsUrl, id);
		}
	}
}