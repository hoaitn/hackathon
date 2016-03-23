(function(app) {
	'use strict';

	app.registerModule('hackathons',['angularFileUpload','textAngular','ui.bootstrap']);
	app.registerModule('hackathons.rest', ['restangular', 'textAngular']);
	app.registerModule('hackathons.services', ['hackathons.rest']);
	app.registerModule('hackathons.routes',['ui.router', 'hackathons.services']);

})(ApplicationConfiguration);