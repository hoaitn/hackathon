'use strict';

angular.module('core').directive('clickOutside', ['$parse', '$document',

    function($parse, $document) {
        return {
            restrict: 'AEC',
            link: function(scope, elem, attr) {
                var clickOutHandler = $parse(attr.clickOutside);
                var elemClickHandler = function(e) {
                    e.stopPropagation();
                };

                var docClickHandler = function() {
                    clickOutHandler(scope, {
                        $event: event
                    });
                    scope.$apply();
                };

                elem.on('click', elemClickHandler);
                $document.on('click', docClickHandler);

                // teardown the event handlers when the scope is destroyed.
                scope.$on('$destroy', function() {
                    elem.off('click', elemClickHandler);
                    $document.off('click', docClickHandler);
                });
            }
        };
    }
]);