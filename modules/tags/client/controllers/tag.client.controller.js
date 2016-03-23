'use strict';

angular.module('tags').controller('TagController', ['$scope', '$state', 'TagService', 'tagItem',
	function($scope, $state, TagService, tag) {
		var self = this;

		$scope.tag = tag;

		$scope.save = function() {
			if ($scope.tag._id) {
				TagService.update($scope.tag).then(doneCallbacks, failCallbacks);
			} else {
				TagService.save($scope.tag).then(doneCallbacks, failCallbacks);
			}


		};


		function doneCallbacks(res) {
			$state.go('tags.list');
		}

		function failCallbacks(res) {
			self.error = res.data.message;
		}
	}
]);