'use strict';

angular.module('core').directive('dropdownFoundation', ['$window', '$timeout',

    function($window, $timeout) {
        return {
            template: '<ul class="dropdown menu" ng-transclude></ul>',
            restrict: 'AE',
            transclude: true,
            replace: true,
            link: function postLink(scope, element, attrs, controller, transcludeFn) {
                $timeout(function() {
                    new $window.Foundation.DropdownMenu(angular.element(element));
                }, 0);

            }
        };
    }
]);