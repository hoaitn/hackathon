(function() {
    'use strict';

    angular
        .module('hackathons')
        .factory('FacebookService', hackathonsService);

    hackathonsService.$inject = ['$q'];

    function hackathonsService($q) {
        // Facebook service service logic        

        // Public API
        return {
            getMyLastName: function() {
                var deferred = $q.defer();
                FB.api('/me', {
                    fields: 'last_name'
                }, function(response) {
                    if (!response || response.error) {
                        deferred.reject('Error occured');
                    } else {
                        deferred.resolve(response);
                    }
                });
                return deferred.promise;
            }
        };
    }
})();