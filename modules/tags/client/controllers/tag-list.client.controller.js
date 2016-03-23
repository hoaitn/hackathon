(function() {
	'use strict';

	angular.module('tags').controller('TagListController', ['$scope', 'listTags', 'TagService',
		function($scope, listTags, TagService) {
			var self = this;
			$scope.tags = listTags;

			$scope.remove = function(tag) {
				TagService.remove(tag).then(function(res) {
					_.remove($scope.tags, function(n) {
						return n._id === tag._id;
					});
				});
			};
		}
	]);
})();