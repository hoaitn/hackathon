(function() {
	'use strict';

	angular
		.module('articles')
		.controller('ArticlesController', ArticlesController);

	ArticlesController.$inject = ['$scope', '$state', 'articleResolve', 'Authentication', 'ArticlesService', 'tagList'];

	function ArticlesController($scope, $state, article, Authentication, ArticlesService, tagList) {
		var vm = this;

		vm.article = article;
		vm.authentication = Authentication;
		vm.error = null;
		vm.form = {};
		vm.remove = remove;
		vm.save = save;

		console.log(vm.article);

		vm.tags = tagList;

		vm.textAreaSetup = function($element) {
			$element.attr('ui-codemirror', '');
		};

		// Remove existing Article
		function remove() {
			vm.article.remove().then(function() {
				$state.go('articles.list');
			});
		}

		// Save Article
		function save(isValid) {
			if (!isValid) {
				$scope.$broadcast('show-errors-check-validity', 'vm.form.articleForm');
				return false;
			}

			// TODO: move create/update logic to service
			if (vm.article._id) {
				ArticlesService.update(vm.article).then(doneCallbacks, failCallbacks);
				//vm.article.$update(successCallback, errorCallback);
			} else {
				ArticlesService.save(article).then(doneCallbacks, failCallbacks);
				//vm.article.$save(successCallback, errorCallback);
			}

			function doneCallbacks(res) {
				$state.go('articles.view', {
					articleId: res._id
				});
			}

			function failCallbacks(res) {
				vm.error = res.data.message;
			}
		}
	}
})();