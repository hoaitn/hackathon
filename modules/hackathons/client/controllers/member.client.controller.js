'use strict';

angular.module('hackathons')
	.controller('HackathonMemberController', ['$scope', '$log', 'HackathonsService', 'members', 'invites', '$timeout', '$window', 'toastr',
		function($scope, $log, HackathonsService, members, invites, $timeout, $window, toastr) {
			// Scheduler controller logic
			var vm = this;
			vm.hackathon = $scope.hackathon;
			vm.members = members;
			vm.invites = invites;

			vm.invite = function() {
				HackathonsService.addMember(vm.hackathon, vm.member).then(function(succ) {
					vm.members.push(succ);
					toastr.success('Invite success', 'Notification');
				}, function(err) {

					toastr.error(err.data.message, 'Notification');
				});

			};

			vm.removeMember = function(member) {
				HackathonsService.removeMember(vm.hackathon, member.user).then(function(res) {
					_.remove(vm.members, function(n) {
						return n._id === res._id;
					});
					toastr.success('Remove member from hackathon', 'Notification');
				}, function(err) {
					toastr.error(err.data.message, 'Notification');
				});
			};

			vm.removeInvite = function(member) {
				HackathonsService.removeMember(vm.hackathon, member.user).then(function(res) {
					_.remove(vm.invites, function(n) {
						return n._id === res._id;
					});
					toastr.success('Remove invite from hackathon', 'Notification');
				}, function(err) {
					toastr.error(err.data.message, 'Notification');
				});
			};

		}
	]);