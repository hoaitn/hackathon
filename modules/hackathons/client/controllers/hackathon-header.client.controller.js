(function() {
    'use strict';

    angular
        .module('hackathons')
        .controller('HackathonHeaderController', HackathonHeaderController);

    HackathonHeaderController.$inject = ['$scope', 'Authentication', 'Menus', '$state', 'HackathonsService', 'toastr'];

    function HackathonHeaderController($scope, Authentication, Menus, $state, HackathonsService, toastr) {
        var vm = this;

        vm.invites = $scope.invites;


        $scope.$state = $state;

        $scope.authentication = Authentication;

        // Get the topbar menu
        $scope.menu = Menus.getMenu('topbar');

        // Get the account menu
        $scope.accountMenu = Menus.getMenu('account').items[0];

        // Toggle the menu items
        $scope.isCollapsed = false;
        $scope.toggleCollapsibleMenu = function() {
            $scope.isCollapsed = !$scope.isCollapsed;
        };

        vm.denied = function(item) {
            HackathonsService.denied(item.hackathon).then(function(res) {
                _.remove($scope.invites, function(n) {
                    return n.hackathon._id === res._id;
                });
                toastr.success(res.message, 'Notification');
            }, function(err) {
                toastr.error(err.data.message, 'Notification');
            });
        };

        vm.accept = function(item) {
            HackathonsService.accept(item.hackathon).then(function(res) {
                _.remove($scope.invites, function(n) {
                    return n.hackathon._id === res._id;
                });
                toastr.success(res.message, 'Notification');
            }, function(err) {
                toastr.error(err.data.message, 'Notification');
            });
        };

        vm.clickOut = function() {
            if (vm.toggleNotify) {
                vm.toggleNotify = false;
            }
        };

    }
})();