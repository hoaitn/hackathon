(function() {
    'use strict';

    angular
        .module('hackathons')
        .controller('HackathonMainController', HackathonMainController);

    HackathonMainController.$inject = ['$scope', 'invites'];

    function HackathonMainController($scope, invites) {
        var vm = this;
        $scope.invites = invites;

    }
})();