angular.module('hintService', [])

.constant('firstPage', '/firstPage.mvc')
.constant('nextPage', '/nextPage.mvc')
.constant('prevPage', '/prevPage.mvc')
.constant('currPage', '/currPage.mvc')
.constant('releasePages', '/releasePages.mvc')
.constant('details', '/details.mvc')

.factory('criteriaService', criteriaService)
.factory('autoTrigService', trigService)
.factory('arrdwTrigService', trigService)
.factory('itemService', itemService)
.factory('hintService', hintService);

function criteriaService() {
	var criteria = {};
	
	return {
		update: function (name, value) {
			criteria[name] = value;
		},
		getCriteria: function() {
			return criteria;
		}
	}
} // end of criteriaService

function trigService (criteriaService) {
	var trigLimits = {};
	
	return {
		addTrigLimit: function (name, limit) {
			trigLimits[name] = limit;
		},
		isTrigAllowed: function() {
			var result = true;
			angular.forEach(trigLimits, function(value, key) {
				if (this[key].length < value)
					result = false;
			}, criteriaService.getCriteria());
			return result;
		}
	}
} // end of trigService

function itemService() {
	var items = [];
	var index = -1;

	var isIndexInRange = function() {
		return index >= 0 && index < items.length;
	}

	return {
		addItem: function(item) {
			items.push(item);
			return items.length - 1;
		},
		removeItems: function() {
			while (items.length > 0)
				items.pop().remove();
			index = -1;
		},
		markNextItem: function() {
			if (index < items.length - 1) {
				if (index >= 0)
					items[index].removeClass('marked');
				index++;
				items[index].addClass('marked');
			}
		},
		markPrevItem: function() {
			if (index > 0 && index < items.length) {
				items[index].removeClass('marked');
				index--;
				items[index].addClass('marked');
			}
		},
		markItemAt: function(indx) {
			if (isIndexInRange())
				items[index].removeClass('marked');
			index = indx;
			if (isIndexInRange())
				items[index].addClass('marked');

		},
		hasMarkedItem: function() {
			return isIndexInRange();
		},
		markedItemIndex: function() {
			return index;
		}
	}
} // end of itemService

function hintService(criteriaService, itemService, $http, firstPage, nextPage, prevPage, releasePages, details) {
	var hints = {items: []};
	var selectedHint = {};
	
	var pagingSize = 10; // default value
	var firstPageUrl, nextPageUrl, prevPageUrl, releasePagesUrl, detailsUrl;
	
	return {
		init: function(urlBase, size) {
			firstPageUrl	= urlBase + firstPage;
			nextPageUrl		= urlBase + nextPage;
			prevPageUrl		= urlBase + prevPage;
			releasePagesUrl	= urlBase + releasePages;
			detailsUrl		= urlBase + details;
			
			if (angular.isDefined(size) && isFinite(size) && size > 0)
				pagingSize = size ;
		},
		firstPage: function() {
			var request = {
				pagingSize: pagingSize,
				criteria: criteriaService.getCriteria()
			};
			$http.post(firstPageUrl, request).then(
				function success(response) {
					hints = response.data;
			});
		},
		nextPage: function() {
			if (hints.hasNext) {
				$http.get(nextPageUrl).then(
					function success(response) {
						hints = response.data;
				});
			}
		},
		prevPage: function() {
			if (hints.hasPrev) {
				$http.get(prevPageUrl).then(
					function success(response) {
						hints = response.data;
				});
			}
		},
		selectHint: function() {
			if (itemService.hasMarkedItem()) {
				var indx = itemService.markedItemIndex();
				var id = hints.items[indx].id;
				$http.post(detailsUrl, id).then(
					function success(response) {
						selectedHint = response.data;
						hints = {items: []};
						console.log('selectHint ' + selectedHint.name);
				});
			}
		},
		release: function() {
			$http.get(releasePagesUrl).then(
				function success(response) {
					hints = {items: []};
			});
		},
		isEmpty: function() {
			return hints.items.length == 0;
		},
		getHints: function() {
			return hints;
		},
		getSelectedHint: function() {
			return selectedHint;
		}
	}
} // end of hintService
