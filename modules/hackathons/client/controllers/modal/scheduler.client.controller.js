'use strict';

angular.module('hackathons')
	.controller('HackathonSchedulerModalController', ['$scope', '$log', 'SchedulerService', '$uibModalInstance', 'hackathon',
		function($scope, $log, SchedulerService, $uibModalInstance, hackathon) {
			// Scheduler controller logic
			var vm = this;
			var date = new Date();
			var d = date.getDate();
			var m = date.getMonth();
			var y = date.getFullYear();
			$scope.hackathon = hackathon;

			/* config object */
			$scope.dateOptions = {
				formatYear: 'yyyy',
				maxDate: new Date(2020, 5, 22),
				minDate: new Date(),
				startingDay: 1
			};

			$scope.addEvent = function() {
				var startTime = new Date(vm.newEvent.startTime);
				var endTime = new Date(vm.newEvent.endTime);
				var start = new Date(vm.newEvent.start);
				var end = new Date(vm.newEvent.end);

				start.setHours(startTime.getHours(), startTime.getMinutes());
				end.setHours(endTime.getHours(), endTime.getMinutes());

				var event = {
					start: start,
					end: end,
					title: vm.newEvent.title,
					url: vm.newEvent.url
				};

				SchedulerService.create($scope.hackathon, event).then(function(res) {
					$uibModalInstance.close(res);
				}, function(err) {
					console.log(err);
				});
			};

			$scope.cancel = function() {
				$uibModalInstance.dismiss('cancel');
			};

		}
	]);