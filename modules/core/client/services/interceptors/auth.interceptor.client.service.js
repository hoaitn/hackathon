(function() {
	'use strict';

	angular.module('core').factory('authInterceptor', ['$q', '$injector', '$cookies',
		function($q, $injector, $cookies) {
			var myInterceptor = {};
			myInterceptor.request = function(config) {
				var userData = $cookies.get('access_token');
				if (userData) {
					config.headers = config.headers || {};
					config.headers.Authorization = 'Bearer ' + userData;
				}
				return config;
			};

			myInterceptor.requestError = function(rejection) {
				// do something on error

				return $q.reject(rejection);
			};

			myInterceptor.response = function(response) {
				// console.log(response); // Contains the data from the response.

				// Return the response or promise.
				return response;
			};

			myInterceptor.responseError = function(rejection) {
				if (!rejection.config.ignoreAuthModule) {
					switch (rejection.status) {
						case 401:
							// Deauthenticate the global user
							var Authentication = $injector.get('Authentication');
							Authentication.user = null;
							$injector.get('$state').transitionTo('authentication.signin');
							break;
						case 403:
							$injector.get('$state').transitionTo('forbidden');
							break;
					}
				}
				// otherwise, default behaviour
				return $q.reject(rejection);
			};
			return myInterceptor;
		}
	]);
})();