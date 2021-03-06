'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function() {
	// Init module configuration options
	var applicationModuleName = 'mean';
	var applicationModuleVendorDependencies = [
		'ngResource',
		'ngAnimate',
		'ngMessages',
		'ngCookies',
		'ngDialog',
		'ui.router',
		'ui.bootstrap',
		'ui.utils',
		'ui.grid',
		'ui.validate',
		'ui.calendar',
		'ct.ui.router.extras',
		'angularFileUpload',
		'foundation',
		'perfect_scrollbar',
		'angularMoment',
		'toastr'
	];

	// Add a new vertical module
	var registerModule = function(moduleName, dependencies) {
		// Create angular module
		angular.module(moduleName, dependencies || []);

		// Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
	};

	return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();