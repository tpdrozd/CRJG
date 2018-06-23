angular.module('hintService', ['searchService'])

.factory('criteriaService', criteriaService)
.factory('autoTrigService', trigService)
.factory('arrdwTrigService', trigService)
.factory('hintService', hintService)
.factory('itemService', itemService);

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
} // end of trigLimitService

function hintService(searchSrv, criteriaService, itemService) {
	var hints = {items: []};
	var selectedHint = {};
	
	var pagingSize = 10; // default value
	
	return {
		setPagingSize: function(size) {
			pagingSize = size;
		},
		firstPage: function() {
			var request = {
				pagingSize: pagingSize,
				criteria: criteriaService.getCriteria()
			};
			searchSrv.firstPage(request).then(
				function success(response) {
					hints = response.data;
			});
		},
		nextPage: function() {
			if (hints.hasNext) {
				searchSrv.nextPage().then(
					function success(response) {
						hints = response.data;
				});
			}
		},
		prevPage: function() {
			if (hints.hasPrev) {
				searchSrv.prevPage().then(
					function success(response) {
						hints = response.data;
				});
			}
		},
		selectHint: function() {
			if (itemService.hasMarkedItem()) {
				var indx = itemService.markedItemIndex();
				var id = hints.items[indx].id;
				searchSrv.details(id).then(
					function success(response) {
						selectedHint = response.data;
						hints = {items: []};
						console.log('selectHint ' + selectedHint.name);
				});
			}
		},
		release: function() {
			searchSrv.release().then(
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
