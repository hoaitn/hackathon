'use strict';

angular.module('users')
    .controller('EditProfileController', ['$scope', '$http', '$location', 'Users', 'Authentication', 'myInterest', 'listInterest',
        function($scope, $http, $location, Users, Authentication, myInterest, listInterest) {
            $scope.user = Authentication.user;
            $scope.user.fullName = $scope.user.displayName;

            $scope.interestList = listInterest;

            $scope.interest = _.map(myInterest, 'interestId');

            // Update a user profile
            $scope.updateUserProfile = function(isValid) {
                $scope.success = $scope.error = null;

                if (!isValid) {
                    $scope.$broadcast('show-errors-check-validity', 'userForm');

                    return false;
                }

                var user = new Users($scope.user);

                user.$update(function(response) {
                    $scope.$broadcast('show-errors-reset', 'userForm');

                    $scope.success = true;
                    Authentication.user = response;
                }, function(response) {
                    $scope.error = response.data.message;
                });
            };
        }
    ]);