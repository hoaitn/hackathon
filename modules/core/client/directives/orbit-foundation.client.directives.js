'use strict';

angular.module('core').directive('orbitFoundation', ['$window', '$timeout',

    function ($window, $timeout) {
        return {
            template: '<div class="orbit" role="region" aria-label="Favorite Space Pictures" data-timer-delay="3000" data-anim-in-from-left="fade-in" data-anim-in-from-right="fade-in" data-anim-out-to-left="fade-out" data-anim-out-to-right="fade-out" ng-transclude></div>',
            restrict: 'AE',
            transclude: true,
            replace: true,
            link: function postLink(scope, element, attrs, controller, transcludeFn) {
                $timeout(function () {
                    new $window.Foundation.Orbit(angular.element(element));
                }, 0);

            }
        };
    }
]);