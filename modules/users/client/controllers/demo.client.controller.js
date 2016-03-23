'use strict';

angular.module('users').controller('DemoController', ['$scope', '$state', 'Socket', 'Authentication',
	function($scope, $state, Socket, Authentication) {
		// Demo controller logic
		var vm = this;
		init();

		function init() {
			// If user is not signed in then redirect back home
			if (!Authentication.user) {
				$state.go('home');
			}

			// Make sure the Socket is connected
			if (!Socket.socket) {
				Socket.connect();
			}

			// Add an event listener to the 'chatMessage' event
			Socket.on('newCompany', function(company) {
				console.log(company);
			});

			// Remove the event listener when the controller instance is destroyed
			$scope.$on('$destroy', function() {
				Socket.removeListener('newCompany');
			});
		}

		vm.newCompany = newCompany;

		// Create a controller method for sending messages
		function newCompany() {


			// Emit a 'chatMessage' message event
			Socket.emit('newCompany', true);
		}
	}
]);