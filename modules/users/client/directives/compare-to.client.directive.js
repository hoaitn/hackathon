'use strict';

angular.module('users').directive('compareTo', [

    function() {
        return {
            require: 'ngModel',
            scope: {
                otherModelValue: '=compareTo'
            },
            link: function(scope, element, attributes, ctrl) {

                ctrl.$validators.compareTo = function(modelValue) {
                    return modelValue === scope.otherModelValue;
                };

                scope.$watch('otherModelValue', function() {
                    ctrl.$validate();
                });
            }
        };
    }
]);