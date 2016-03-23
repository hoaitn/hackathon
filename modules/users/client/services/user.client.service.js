'use strict';

angular.module('users').factory('UsersService', ['$q', 'Restangular',

    function($q, Restangular) {
        // User service logic
        // ...
        var users = Restangular.all('users');
        return {
            getList: function() {
                return users.getList();
            },
            getUser: function(id) {
                var deferred = $q.defer();
                users.one(id).get().then(function(res) {
                    res.fullName = res.displayName;
                    deferred.resolve(res);
                }, function(err) {
                    deferred.reject(err);
                });
                return deferred.promise;
            },
            update: function(user) {
                return user.save();
            },
            getInvite: function() {
                return users.all('invite').getList();
            }
        };
    }
]);