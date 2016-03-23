'use strict';

angular.module('users')
	.controller('AuthenticationController', ['$scope', '$state', '$http', '$location', '$window', '$timeout', '$log', 'Authentication', 'PasswordValidator', 'Restangular', 'AuthorizationService', 'InterestService', 'Socket',
		function($scope, $state, $http, $location, $window, $timeout, $log, Authentication, PasswordValidator, Restangular, AuthorizationService, InterestService, Socket) {
			$scope.authentication = Authentication;
			$scope.popoverMsg = PasswordValidator.getPopoverMsg();

			InterestService.getList().then(function(res) {
				$scope.interestList = res;
			});
			// Get an eventual error defined in the URL query string:
			$scope.error = $location.search().err;

			// If user is signed in then redirect back home
			if ($scope.authentication.user) {
				$location.path('/');
			}

			$scope.signup = function(isValid) {
				$scope.error = null;
				$scope.success = null;

				if (!isValid) {
					$scope.$broadcast('show-errors-check-validity', 'userForm');

					return false;
				}

				$scope.credentials.account_type = $scope.account_type;

				AuthorizationService.signup($scope.credentials).then(function(response) {
					$scope.credentials = {};
					$scope.success = response.message;
				}, function(response) {
					$timeout(function() {
						$scope.error = response.data.message;
					});
				});
			};

			$scope.signin = function(isValid) {
				$scope.error = null;
				$scope.success = null;

				if (!isValid) {
					$scope.$broadcast('show-errors-check-validity', 'userForm');

					return false;
				}

				AuthorizationService.signin($scope.credentials).then(function(response) {
					// If successful we assign the response to the global user model
					$scope.authentication.user = response;
					Authentication.setCurrentUser(response);
					Authentication.setAccessToken(response.token);
					Restangular.setDefaultHeaders({
						Authorization: 'Bearer ' + response.token
					});
					// And redirect to the previous or home page
					//$state.go($state.previous.state.name || 'home', $state.previous.params);
					$state.transitionTo('home', null, {
						reload: true,
						inherit: true,
						notify: true
					});
				}, function(err) {

					$scope.error = err.message;
				});
			};

			// OAuth provider request
			$scope.callOauthProvider = function(url) {
				if ($state.previous && $state.previous.href) {
					url += '?redirect_to=' + encodeURIComponent($state.previous.href);
				}

				// Effectively call OAuth authentication route:
				$window.location.href = url;
			};
		}
	]);