'use strict';

angular.module('core').directive('checkRole', ['Authentication',
    function(Authentication) {
        return {
            transclude: false,
            scope: false,
            replace: true,
            restrict: 'AE',
            link: function postLink(scope, element, attrs) {

            },
            compile: function compile(tElement, tAttrs, transclude) {
                var hasRole = true;
                var roles = _.map(tAttrs.access.split(' '), _.trim);
                var user = Authentication.user;
                if (!_.intersection(roles, user.roles).length) {
                    hasRole = false;
                }
                return {
                    pre: function preLink(scope, iElement, iAttrs, controller) {

                    },
                    post: function postLink(scope, iElement, iAttrs, controller) {
                        if (!hasRole) {
                            iElement.remove();
                        }
                    }
                };
            }
        };
    }
]);