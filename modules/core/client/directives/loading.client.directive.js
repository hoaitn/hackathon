'use strict';

angular.module('core').directive('loading', [

    function() {
        return {
            restrict: 'AE',
            templateUrl: function(elem, attr) {
                attr = angular.extend({
                    type: 'loading'
                }, attr);
                return 'modules/core/client/views/partials/' + attr.type + '.client.view.html';
            }
        };
    }
]);