angular.module('hintService', ['searchService'])

.factory('criteriaService', criteriaService)
.factory('hintService', hintService);

function criteriaService() {
	var criteria = {};
	
	return {
		update: function (name, value) {
			criteria[name] = value;
			console.log('criteriaService.update ' + name + ': ' + value);
		},
		getCriteria: function() {
			return criteria;
		}
	}
} // end of criteriaService

function hintService(searchSrv, criteriaService) {
	var hints = {items: []};
	var nodes = [];
	var index = -1;
	
	var isIndexInRange = function() {
		return index >= 0 && index < nodes.length;
	}
	var clearNodes = function() {
		for(var i = 0; i < nodes.length; i++) {
			nodes[i].remove();
		}
		nodes = [];
		index = -1;
	}
	
	return {
		setEndpoint: function(url) {
			
		},
		firstPage: function() {
			var criteria = criteriaService.getCriteria();
			searchSrv.firstPage(criteria).then(
				function success(response) {
					hints = response.data;
					clearNodes();
			});
		},
		nextPage: function() {
			if (hints.hasNext) {
				searchSrv.nextPage().then(
					function success(response) {
						hints = response.data;
						clearNodes();
				});
			}
		},
		prevPage: function() {
			if (hints.hasPrev) {
				searchSrv.prevPage().then(
					function success(response) {
						hints = response.data;
						clearNodes();
				});
			}
		},
		nextHint: function() {
			if (index < nodes.length - 1) {
				if (index >= 0)
					nodes[index].removeClass('marked');
				index++;
				nodes[index].addClass('marked');
			}
		},
		prevHint: function() {
			if (index > 0 && index < nodes.length) {
				nodes[index].removeClass('marked');
				index--;
				nodes[index].addClass('marked');
			}
		},
		selectHint: function() {
			if (isIndexInRange()) {
				var id = hints.items[index].id;
				searchSrv.details(id).then(
					function success(response) {
						hints = {items: []};
						clearNodes();
						return response.data;
				});
			}
			else {
				console.log('selectHint index out of range');
			}
		},
		release: function() {
			searchSrv.release();
			hints = {items: []};
			clearNodes();
		},
		isEmpty: function() {
			return hints.items.length == 0;
		},
		getHints: function() {
			return hints;
		},
		addNode: function(element) {
			nodes.push(element);
		}
	}
}