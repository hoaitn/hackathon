'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', ['$window', '$q', '$cookies', 'Restangular',
	function($window, $q, $cookies, Restangular) {
		var user = Restangular.all('users');

		var auth = {
			user: $window.user,
			access_token: $cookies.get('access_token')
		};

		auth.me = function() {

			var defered = $q.defer();
			user.one('me').get().then(function(succ) {
				defered.resolve(succ);
			}, function(err) {
				defered.reject(err);
			});
			return defered.promise;
		};

		auth.setCurrentUser = function(user) {
			auth.user = user;
			$window.user = user;
		};

		auth.getCurrentUser = function(user) {
			return $window.user;
		};

		auth.setAccessToken = function(token) {
			auth.access_token = token;
			var now = new Date();
			now.setDate(now.getDate() + 1);

			$cookies.put('access_token', token, {
				expires: now
			});
		};

		auth.getAccessToken = function(token) {
			return $cookies.get('access_token');
		};

		return auth;
	}
]);