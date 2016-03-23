(function() {
	'use strict';

	angular
		.module('articles.routes')
		.config(routeConfig);

	routeConfig.$inject = ['$stateProvider'];

	function routeConfig($stateProvider) {
		$stateProvider
			.state('articles', {
				abstract: true,
				url: '/articles',
				parent: 'app',
				template: '<ui-view/>'
			})
			.state('articles.list', {
				url: '',
				templateUrl: 'modules/articles/client/views/list-articles.client.view.html',
				controller: 'ArticlesListController',
				controllerAs: 'vm',
				data: {
					pageTitle: 'Articles List'
				}
			})
			.state('articles.create', {
				url: '/create',
				templateUrl: 'modules/articles/client/views/form-article.client.view.html',
				controller: 'ArticlesController',
				controllerAs: 'vm',
				resolve: {
					articleResolve: newArticle,
					tagList: tagList
				},
				data: {
					roles: ['user', 'admin'],
					pageTitle: 'Articles Create'
				}
			})
			.state('articles.edit', {
				url: '/:articleId/edit',
				templateUrl: 'modules/articles/client/views/form-article.client.view.html',
				controller: 'ArticlesController',
				controllerAs: 'vm',
				resolve: {
					articleResolve: getArticle,
					tagList: tagList
				},
				data: {
					roles: ['user', 'admin'],
					pageTitle: 'Edit Article {{ articleResolve.title }}'
				}
			})
			.state('articles.view', {
				url: '/:articleId',
				templateUrl: 'modules/articles/client/views/view-article.client.view.html',
				controller: 'ArticlesController',
				controllerAs: 'vm',
				resolve: {
					articleResolve: getArticle,
					tagList: tagList
				},
				data: {
					pageTitle: 'Article {{ articleResolve.title }}'
				}
			});
	}

	getArticle.$inject = ['$stateParams', 'ArticlesService'];

	function getArticle($stateParams, ArticlesService) {
		return ArticlesService.getItem($stateParams.articleId);
	}

	newArticle.$inject = ['ArticlesService'];

	function newArticle(ArticlesService) {
		return ArticlesService.new();
	}

	tagList.$inject = ['TagService'];

	function tagList(TagService) {
		return TagService.getList();
	}
})();