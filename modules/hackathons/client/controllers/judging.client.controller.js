'use strict';

angular.module('hackathons')
	.controller('HackathonJudgingController', ['$scope', '$log', 'HackathonsService', '$timeout', '$window', 'toastr',
		function($scope, $log, HackathonsService, $timeout, $window, toastr) {
			// Scheduler controller logic
			var vm = this;
			vm.hackathon = $scope.hackathon;

			if (vm.hackathon.judging) {
				vm.hackathon.judging.from_date = new Date(vm.hackathon.judging.from_date);
				vm.hackathon.judging.to_date = new Date(vm.hackathon.judging.to_date);
			}

			vm.hackathon.prizes = vm.hackathon.prizes || {};
			if (vm.hackathon.prizes.winner_date) {
				vm.hackathon.prizes.winner_date = convertISODate(vm.hackathon.prizes.winner_date);
			}

			function convertISODate(date) {
				if (date) {
					return $window.moment(date, $window.moment.ISO_8601).toDate();
				}

			}

			vm.saveTab = function(isValid) {
				HackathonsService.update(vm.hackathon).then(doneCallbacks, failCallbacks);


				function doneCallbacks(res) {
					toastr.success('Save hackathon', 'Notification');
				}

				function failCallbacks(res) {
					toastr.error(res.data.message, 'Notification');
					vm.error = res.data.message;
				}
			};

		}
	]);