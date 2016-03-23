'use strict';

var interest = require('../controllers/interest.server.controller'),
	interestPolicy = require('../policies/interest.server.policy');

module.exports = function(app) {
	// Routing logic   


	// Articles collection routes
	app.route('/api/interest').all(interestPolicy.isAllowed)
		.get(interest.list)
		.post(interest.create);

	app.route('/api/interest/company/:userId').get(interest.listInterestByUser);

	// Single article routes
	app.route('/api/interest/:interestId')
		.get(interest.read)
		.put(interest.update)
		.delete(interest.delete);
};