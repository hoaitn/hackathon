'use strict';

angular.module('users.admin').controller('UserController', ['$scope', '$state', 'Authentication', 'userResolve', 'ngDialog',
	function($scope, $state, Authentication, userResolve, ngDialog) {
		$scope.authentication = Authentication;

		//$scope.user = userResolve;
		$scope.user = userResolve;


		$scope.roleList = [{
			text: 'user'
		}, {
			text: 'author'
		}, {
			text: 'admin'
		}];

		$scope.remove = function(user) {

			if (confirm('Are you sure you want to delete this user?')) {
				if (user) {
					user.remove();

					$scope.users.splice($scope.users.indexOf(user), 1);
				} else {
					$scope.user.remove().then(function() {
						$state.go('admin.users');
					});
				}
			}
		};

		$scope.update = function(isValid) {
			if (!isValid) {
				$scope.$broadcast('show-errors-check-validity', 'userForm');

				return false;
			}
			$scope.user.roles = _.map($scope.user.roles, 'text');
			var user = $scope.user;

			user.save().then(function() {
				$state.go('admin.user', {
					userId: user._id
				});
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);