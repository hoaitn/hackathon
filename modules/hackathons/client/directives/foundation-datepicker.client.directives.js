'use strict';

angular.module('core').directive('foundationDatepicker', ['$window', '$timeout',

    function ($window, $timeout) {
        return {
            template: '<ul class="tabs" data-tabs ng-transclude></ul>',
            restrict: 'AE',
            transclude: true,
            replace: true,
            link: function postLink(scope, element, attrs, controller, transcludeFn) {
                $timeout(function () {
                    new $window.Foundation.Tabs(angular.element(element));
                }, 0);
            }
        };
    }
]);