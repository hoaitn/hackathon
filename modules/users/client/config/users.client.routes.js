(function() {
	'use strict';

	// Setting up route
	angular.module('users').config(['$stateProvider',
		function($stateProvider) {
			// Users state routing
			$stateProvider
				.state('account-success', {
					url: '/account-success',
					templateUrl: 'modules/users/client/views/account-success.client.view.html'
				})
				.state('settings', {
					parent: 'auth',
					abstract: true,
					url: '/settings',
					templateUrl: 'modules/users/client/views/settings/settings.client.view.html',
					controller: 'SettingsController',
					data: {
						roles: ['user', 'admin']
					}
				})
				.state('settings.profile', {
					url: '/profile',
					templateUrl: 'modules/users/client/views/settings/edit-profile.client.view.html',
					controller: 'EditProfileController',
					resolve: {
						listInterest: listInterest,
						myInterest: getMyInterest
					},
					data: {
						pageTitle: 'Settings'
					}
				})
				.state('settings.password', {
					url: '/password',
					templateUrl: 'modules/users/client/views/settings/change-password.client.view.html',
					data: {
						pageTitle: 'Settings password'
					}
				})
				.state('settings.accounts', {
					url: '/accounts',
					templateUrl: 'modules/users/client/views/settings/manage-social-accounts.client.view.html',
					data: {
						pageTitle: 'Settings accounts'
					}
				})
				.state('settings.picture', {
					url: '/picture',
					templateUrl: 'modules/users/client/views/settings/change-profile-picture.client.view.html',
					data: {
						pageTitle: 'Settings picture'
					}
				})
				.state('authentication', {
					abstract: true,
					url: '/authentication',
					templateUrl: 'modules/users/client/views/authentication/authentication.client.view.html'
				})
				.state('authentication.signup', {
					url: '/signup',
					templateUrl: 'modules/users/client/views/authentication/signup.client.view.html',
					data: {
						pageTitle: 'Signup'
					}
				})
				.state('authentication.signin', {
					url: '/signin?err',
					templateUrl: 'modules/users/client/views/authentication/signin.client.view.html',
					data: {
						pageTitle: 'Signin'
					}
				})
				.state('authentication.company-signup', {
					url: '/company-signup',
					templateUrl: 'modules/users/client/views/authentication/company-signup.client.view.html',
					data: {
						pageTitle: 'Company Signup'
					}
				})
				.state('authentication.request-active', {
					url: '/request-active',
					templateUrl: 'modules/users/client/views/authentication/request-active.client.view.html',
					data: {
						pageTitle: 'Request Active'
					}
				})
				.state('password', {
					abstract: true,
					url: '/password',
					template: '<ui-view/>'
				})
				.state('password.forgot', {
					url: '/forgot',
					templateUrl: 'modules/users/client/views/password/forgot-password.client.view.html',
					data: {
						pageTitle: 'Password forgot'
					}
				})
				.state('password.reset', {
					abstract: true,
					url: '/reset',
					template: '<ui-view/>'
				})
				.state('password.reset.invalid', {
					url: '/invalid',
					templateUrl: 'modules/users/client/views/password/reset-password-invalid.client.view.html',
					data: {
						pageTitle: 'Password reset invalid'
					}
				})
				.state('password.reset.success', {
					url: '/success',
					templateUrl: 'modules/users/client/views/password/reset-password-success.client.view.html',
					data: {
						pageTitle: 'Password reset success'
					}
				})
				.state('password.reset.form', {
					url: '/:token',
					templateUrl: 'modules/users/client/views/password/reset-password.client.view.html',
					data: {
						pageTitle: 'Password reset form'
					}
				})
				.state('account', {
					abstract: true,
					url: '/account',
					template: '<ui-view/>'
				})
				.state('account.active', {
					abstract: true,
					url: '/active',
					template: '<ui-view/>'
				})
				.state('account.active.success', {
					url: '/success',
					templateUrl: 'modules/users/client/views/account/active-success.client.view.html',
					data: {
						pageTitle: 'Account active success'
					}
				})
				.state('account.active.invalid', {
					url: '/invalid',
					templateUrl: 'modules/users/client/views/account/active-invalid.client.view.html',
					data: {
						pageTitle: 'Account active invalid'
					}
				});


		}
	]);

	listInterest.$inject = ['InterestService'];

	function listInterest(InterestService) {
		return InterestService.getList();
	}

	getMyInterest.$inject = ['InterestService', 'Authentication'];

	function getMyInterest(InterestService, Authentication) {

		return InterestService.getListInterest(Authentication.user._id);
	}

})();