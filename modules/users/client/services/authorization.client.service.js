(function() {
	'use strict';
	angular.module('users').factory('AuthorizationService', ['$q', 'Restangular',
		function($q, Restangular) {
			var auth = Restangular.all('auth');

			var sv = {};
			sv.signin = function(data) {
				var defered = $q.defer();
				auth.all('signin').post(data).then(function(res) {
					defered.resolve(res);
				}, function(err) {
					defered.reject(err.data);
				});
				return defered.promise;
			};

			sv.signup = function(data) {
				var defered = $q.defer();
				auth.all('signup').post(data).then(function(res) {
					defered.resolve(res);
				}, function(res) {
					defered.reject(res);
				});
				return defered.promise;
			};
			return sv;
		}
	]);
})();