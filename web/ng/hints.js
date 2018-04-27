angular.module('hints', [])

.factory('hintHandler', hintHandler)
.directive('hint', hint);

function hintHandler() {
	var hints = [];
	var index = -1;
	var isIndexInRange = function() {
		return index >= 0 && index < hints.length;
	}
	
	return {
		reset: function() {
			hints = [];
			index = -1;
		},
		addHint: function(hint) {
			hints.push(hint);
			return hints.length - 1;
		},
		markNextHint: function() {
			if (index < hints.length - 1) {
				if (index >= 0)
					hints[index].removeClass('marked');
				index++;
				hints[index].addClass('marked');
			}
		},
		markPrevHint: function() {
			if (index > 0 && index < hints.length) {
				hints[index].removeClass('marked');
				index--;
				hints[index].addClass('marked');
			}
		},
		markHintAt: function(indx) {
			if (isIndexInRange())
				hints[index].removeClass('marked');
			index = indx;
			if (isIndexInRange())
				hints[index].addClass('marked');
		},
		isAnyHintMarked: function() {
			return isIndexInRange();
		},
		getMarkedHintIndex: function() {
			return index;
		}
	}
}

function hint(hintHandler) {
	return {
		restrict: 'A',
		scope: true,
		link: function (scope, element, attrs) {
			scope.index = hintHandler.addHint(element);

			element.bind('mouseenter', function($event) {
				hintHandler.markHintAt(scope.index);
			});
			
//			element.bind('click', function($event) {
//				// ???
//			});
		}
	}
}
