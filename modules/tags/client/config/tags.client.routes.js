(function() {
	'use strict';

	//Setting up route
	angular.module('tags.routes').config(['$stateProvider',
		function($stateProvider) {
			// Tags state routing
			$stateProvider
				.state('tags', {
					url: '/tags',
					abstract: true,
					parent: 'app',
					template: '<ui-view/>'
				})
				.state('tags.create', {
					url: '/create',
					templateUrl: 'modules/tags/client/views/create.client.view.html',
					controller: 'TagController',
					controllerAs: 'vm',
					resolve: {
						tagItem: newTag
					},
					data: {
						roles: ['user'],
						pageTitle: 'Create a Tag'
					}
				})
				.state('tags.list', {
					url: '',
					templateUrl: 'modules/tags/client/views/list.client.view.html',
					controller: 'TagListController',
					controllerAs: 'vm',
					resolve: {
						listTags: listTags
					},
					data: {
						roles: ['user'],
						pageTitle: 'List Tags'
					}
				})
				.state('tags.view', {
					url: '/:tagId',
					templateUrl: 'modules/tags/client/views/show.client.view.html',
					controller: 'TagController',
					controllerAs: 'vm',
					resolve: {
						tagItem: getTag
					},
					data: {
						roles: ['user'],
						pageTitle: 'Create a Tag'
					}
				});
		}
	]);

	listTags.$inject = ['TagService'];

	function listTags(TagService) {
		return TagService.getList();
	}

	getTag.$inject = ['TagService', '$stateParams'];

	function getTag(TagService, $stateParams) {
		return TagService.getItem($stateParams.tagId);
	}

	newTag.$inject = ['TagService'];

	function newTag(TagService) {
		return TagService.new();
	}
})();