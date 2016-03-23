(function() {
	'use strict';

	// Setting up route
	angular.module('users.admin.routes').config(['$stateProvider',
		function($stateProvider) {
			$stateProvider
				.state('admin.users', {
					url: '/users',
					templateUrl: 'modules/users/client/views/admin/list-users.client.view.html',
					controller: 'UserListController',
					resolve: {
						users: getListUser
					},
					data: {
						pageTitle: 'Users List'
					}
				})
				.state('admin.user', {
					url: '/users/:userId',
					templateUrl: 'modules/users/client/views/admin/view-user.client.view.html',
					controller: 'UserController',
					resolve: {
						userResolve: getUser
					},
					data: {
						pageTitle: 'Edit {{ userResolve.displayName }}'
					}
				})
				.state('admin.user-edit', {
					url: '/users/:userId/edit',
					templateUrl: 'modules/users/client/views/admin/edit-user.client.view.html',
					controller: 'UserController',
					resolve: {
						userResolve: getUser
					},
					data: {
						pageTitle: 'Edit User {{ userResolve.displayName }}'
					}
				});
		}
	]);

	getListUser.$inject = ['UsersService'];

	function getListUser(UsersService) {
		return UsersService.getList();
	}

	getUser.$inject = ['UsersService', '$stateParams'];

	function getUser(UsersService, $stateParams) {
		return UsersService.getUser($stateParams.userId);
	}
})();