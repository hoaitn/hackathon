(function() {
    'use strict';

    angular
        .module('hackathons')
        .controller('HackathonsController', HackathonsController);

    HackathonsController.$inject = ['$scope', '$timeout', '$window', '$state', 'hackathonResolve', 'Authentication', 'HackathonsService', 'FileUploader', 'toastr', 'uiCalendarConfig'];

    function HackathonsController($scope, $timeout, $window, $state, hackathon, Authentication, HackathonsService, FileUploader, toastr, uiCalendarConfig) {
        var vm = this;
        $scope.hackathon = hackathon;
        vm.hackathon = hackathon;

        vm.reset_hackathon = angular.copy(vm.hackathon);
        vm.authentication = Authentication;
        vm.error = null;

        if (_.isEmpty(vm.hackathon)) {
            vm.tabDisable = true;
        }



        /*Manage FAQ*/


        vm.popup1 = {
            opened: false
        };
        vm.open1 = function() {
            vm.popup1.opened = true;
        };

        vm.popup2 = {
            opened: false
        };
        vm.open2 = function() {
            vm.popup2.opened = true;
        };



        vm.saveTab = function(isValid) {
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'hackathonsCtr.form.tab1Form');
                return false;
            }

            if (vm.hackathon._id) {
                HackathonsService.update(vm.hackathon).then(doneCallbacks, failCallbacks);
            } else {
                HackathonsService.save(vm.hackathon).then(doneCallbacks, failCallbacks);
            }

            function doneCallbacks(res) {
                toastr.success('Save hackathon', 'Notification');
                $state.go('hackathons.edit', {
                    hackathonId: res._id
                });
            }

            function failCallbacks(res) {
                toastr.error(res.data.message, 'Notification');
                vm.error = res.data.message;
            }
        };

        vm.resetForm = function(form) {
            if (form) {
                form.$setPristine();
                form.$setUntouched();
                $scope.$broadcast('show-errors-check-validity', form);
            }
            //vm.hackathon =  HackathonsService.new();
            vm.hackathon = angular.copy(vm.reset_hackathon);
        };



        vm.renderCalendar = function(calendar) {
            $scope.$broadcast('render-scheduler');
        };
    }
})();