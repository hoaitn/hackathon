(function() {
    'use strict';

    angular.module('users')
        .factory('InterestService', ['$q', 'Restangular',

            function($q, Restangular) {
                // Interest service logic        
                var interest = Restangular.all('interest');
                var vm = {};

                vm.new = function() {
                    return Restangular.restangularizeElement(null, {}, 'interest');
                };
                vm.save = function(data) {
                    var defered = $q.defer();
                    interest.post(data).then(function(succ) {
                        defered.resolve(succ);
                    }, function(err) {
                        defered.reject(err);
                    });
                    return defered.promise;
                };

                vm.getList = function() {
                    var defered = $q.defer();
                    interest.getList().then(function(succ) {
                        defered.resolve(succ);
                    }, function(err) {
                        defered.reject(err);
                    });
                    return defered.promise;
                };

                vm.getListInterest = function(id) {
                    return interest.one('company', id).get();
                };

                return vm;
            }
        ]);
})();