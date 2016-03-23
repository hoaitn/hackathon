'use strict';

angular.module('hackathons')
	.controller('HackathonSubmissionController', ['$scope', '$log', 'HackathonsService', '$uibModal', '$timeout', '$window', 'toastr',
		function($scope, $log, HackathonsService, $uibModal, $timeout, $window, toastr) {
			// Scheduler controller logic
			var vm = this;
			vm.hackathon = $scope.hackathon;

			if (!_.isEmpty(vm.hackathon)) {
				vm.submissions = vm.hackathon.submissions || {};
				vm.submissions.eligibility = vm.submissions.eligibility || [];
				vm.submissions.registration = vm.submissions.registration || {};
				vm.submissions.registration.period = vm.submissions.registration.period || {};
				vm.submissions.registration.period.from = convertISODate(vm.submissions.registration.period.from);
				vm.submissions.registration.period.to = convertISODate(vm.submissions.registration.period.to);

				vm.submissions.projectSubmission = vm.submissions.projectSubmission || {};
				vm.submissions.projectSubmission.period = vm.submissions.projectSubmission.period || {};
				vm.submissions.projectSubmission.period.from = convertISODate(vm.submissions.projectSubmission.period.from);
				vm.submissions.projectSubmission.period.to = convertISODate(vm.submissions.projectSubmission.period.to);
			}

			$scope.eligibility = [{
				id: 1,
				name: 'Lorem ipsum Quis ad ullamco do enim nisi.'
			}, {
				id: 2,
				name: 'Lorem ipsum Labore enim cupidatat.'
			}, {
				id: 3,
				name: 'Lorem ipsum Adipisicing et nulla amet Ut.'
			}, {
				id: 4,
				name: 'Lorem ipsum In minim non sint amet.'
			}];

			vm.addEligibility = function() {
				vm.submissions.eligibility.push({
					value: 1
				});
			};

			/**
			 * [saveSubmission description]
			 * @return {[type]} [description]
			 */
			vm.saveSubmission = function() {
				HackathonsService.saveSubmission(vm.hackathon, vm.submissions).then(function(succ) {
					toastr.info('Update submission!', 'Notification!');
				}, function(err) {
					toastr.error('Something wrong!', 'Notification!');
				});
			};

			function convertISODate(date) {
				if (date) {
					return $window.moment(date, $window.moment.ISO_8601).toDate();
				}

			}

		}
	]);