'use strict';

// Setting up route
angular.module('core.admin.routes').config(['$stateProvider',
	function($stateProvider) {
		$stateProvider
			.state('admin', {
				abstract: true,
				parent: 'auth',
				url: '/admin',
				template: '<ui-view/>',
				data: {
					roles: ['admin']
				}
			});
	}
]);