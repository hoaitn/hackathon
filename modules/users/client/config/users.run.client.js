(function() {
	'use strict';
	angular.module('users').run(['Authentication', 'Restangular',
		function(Authentication, Restangular) {
			if (Authentication.access_token) {
				Restangular.setDefaultHeaders({
					Authorization: 'Bearer ' + Authentication.access_token
				});
			}
			/*Authentication.me().then(function(succ) {
				if (succ && succ !== null) {
					Authentication.setCurrentUser(succ);
					Authentication.setAccessToken(succ.token);
				}

			}, function(err) {

			});*/
		}
	]);
})();