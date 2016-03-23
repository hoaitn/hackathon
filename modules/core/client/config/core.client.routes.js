(function() {
	'use strict';

	// Setting up route
	angular.module('core').config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {

			// Redirect to 404 when route not found
			$urlRouterProvider.otherwise(function($injector, $location) {
				$injector.get('$state').transitionTo('not-found', null, {
					location: false
				});
			});

			// Home state routing
			$stateProvider
				.state('app', {
					views: {
						'header@app': {
							templateUrl: 'modules/core/client/views/header.client.view.html'
						},
						'footer@app': {
							templateUrl: 'modules/core/client/views/footer.client.view.html'
						},
						'left-menu@app': {
							templateUrl: 'modules/core/client/views/left-menu.client.view.html'
						},
						'': {
							templateUrl: 'modules/core/client/views/layout.client.view.html'
						}
					}
				})
				.state('auth', {
					views: {
						'header@auth': {
							templateUrl: 'modules/users/client/views/layout/header.client.view.html',
							controller: 'HeaderManagerController',
							resolve: {
								notice: getNotice
							}
						},
						'': {
							templateUrl: 'modules/users/client/views/layout/layout.client.view.html'
						}
					}
				})
				.state('home', {
					url: '/',
					parent: 'app',
					templateUrl: 'modules/core/client/views/home.client.view.html'
				})
				.state('not-found', {
					url: '/not-found',
					templateUrl: 'modules/core/client/views/404.client.view.html',
					data: {
						ignoreState: true,
						pageTitle: 'Not-Found'
					}
				})
				.state('bad-request', {
					url: '/bad-request',
					templateUrl: 'modules/core/client/views/400.client.view.html',
					data: {
						ignoreState: true,
						pageTitle: 'Bad-Request'
					}
				})
				.state('forbidden', {
					url: '/forbidden',
					templateUrl: 'modules/core/client/views/403.client.view.html',
					data: {
						ignoreState: true,
						pageTitle: 'Forbidden'
					}
				});
		}
	]);

	getNotice.$inject = ['Authentication', 'AdminCompanyService'];

	function getNotice(Authentication, AdminCompanyService) {
		if (Authentication.user.isAdmin) {
			return AdminCompanyService.getList();
		} else {
			return false;
		}
	}
})();