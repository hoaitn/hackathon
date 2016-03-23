(function(app) {
	'use strict';
	app.registerModule('tags', ['restangular']);
	app.registerModule('tags.routes', ['ui.router', 'tags']);

})(ApplicationConfiguration);