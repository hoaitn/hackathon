(function() {
	'use strict';

	angular
		.module('hackathons')
		.controller('HackathonsListController', HackathonsListController);

	HackathonsListController.$inject = ['HackathonsService', 'hackathons'];

	function HackathonsListController(HackathonsService, hackathons) {
		var vm = this;
		vm.hackathons = hackathons;
	}
})();