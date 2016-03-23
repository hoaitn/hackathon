(function() {
    'use strict';

    angular
        .module('hackathons')
        .controller('HackathonInfoController', HackathonInfoController);

    HackathonInfoController.$inject = ['$scope', 'hackathonResolve', 'members', 'schedulers'];

    function HackathonInfoController($scope, hackathon, members, schedulers) {
        var vm = this;
        vm.hackathon = hackathon;
        vm.schedulers = schedulers;
        vm.members = members;

        vm.submissions = hackathon.submissions;
        // Hackathon info controller logic
        // ...


    }
})();