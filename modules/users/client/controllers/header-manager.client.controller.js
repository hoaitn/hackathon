'use strict';

angular.module('users')
	.controller('HeaderManagerController', ['$scope', '$state', 'Authentication', 'Menus', 'AdminCompanyService', 'SocketAdmin', 'notice',
		function($scope, $state, Authentication, Menus, AdminCompanyService, SocketAdmin, listNotice) {
			// Header manager controller logic
			$scope.user = Authentication.user;
			$scope.menus = Menus.getMenu('topbar');

			if (listNotice) {
				$scope.totalNotice = listNotice.length;
			} else {
				$scope.totalNotice = 0;
			}


			init();

			function init() {
				// If user is not signed in then redirect back home
				if (!Authentication.user) {
					$state.go('home');
				}
				if (Authentication.user.isAdmin) {
					if (!SocketAdmin.socket) {
						SocketAdmin.connect();
					}

					// Add an event listener to the 'chatMessage' event
					SocketAdmin.on('newCompany', function(bol) {
						if (bol) {
							$scope.totalNotice++;
						}
					});

					// Remove the event listener when the controller instance is destroyed
					$scope.$on('$destroy', function() {
						SocketAdmin.removeListener('newCompany');
					});
				}
			}

			$scope.getListActive = getListActive;

			function getListActive() {
				$scope.loading = true;
				$scope.toggleNotify = !$scope.toggleNotify;
				if ($scope.toggleNotify) {
					AdminCompanyService.getList().then(function(res) {
						$scope.listNotValid = res;
						$scope.totalNotice = res.length;
						$scope.loading = false;
					});
				}
			}

			$scope.accept = function(com) {
				AdminCompanyService.accept(com).then(function(res) {
					_.remove($scope.listNotValid, {
						_id: res._id
					});
					$scope.totalNotice = $scope.listNotValid.length;
				}, function(err) {

				});
			};

			$scope.clickOut = function() {
				if ($scope.toggleNotify) {
					$scope.toggleNotify = false;
				}
			};
		}
	]);