'use strict';

angular.module('users').factory('AdminCompanyService', ['$q', 'Restangular',

    function($q, Restangular) {
        // Admin company service service logic
        var admin = Restangular.all('admin');
        var company = admin.one('company');

        // Public API
        return {
            getList: function() {
                return company.one('not-validate').getList();
            },
            accept: function(data) {
                return company.one('active').post(data._id, {
                    isVerify: true
                });
            }
        };
    }
]);