(function(app) {
	'use strict';

	app.registerModule('articles', ['textAngular']);
	app.registerModule('articles.rest', ['restangular', 'textAngular']);
	app.registerModule('articles.services', ['articles.rest']);
	app.registerModule('articles.routes', ['ui.router', 'articles.services', 'ngTagsInput']);
})(ApplicationConfiguration);