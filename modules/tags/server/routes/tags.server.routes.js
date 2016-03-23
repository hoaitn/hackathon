'use strict';

var policy = require('../policies/tags.server.policy'),
	tags = require('../controllers/tags.server.controller'),
	path = require('path');

module.exports = function(app) {
	// Articles collection routes
	app.route('/api/tags').all(policy.isAllowed)
		.get(tags.list)
		.post(tags.create);

	// Single article routes
	app.route('/api/tags/:tagId').all(policy.isAllowed)
		.get(tags.read)
		.put(tags.update)
		.delete(tags.delete);

	// Finish by binding the article middleware
	app.param('tagId', tags.tagByID);
};