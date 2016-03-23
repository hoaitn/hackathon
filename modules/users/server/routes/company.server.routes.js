'use strict';

var adminPolicy = require('../policies/company.server.policy');
var company = require('../controllers/admin-company.server.controller');
module.exports = function(app) {
	app.route('/api/admin').all(adminPolicy.isAllowed);

	app.route('/api/admin/company/not-validate')
		.get(adminPolicy.isAllowed, company.listValidate);

	app.route('/api/admin/company/active/:companyId')
		.post(adminPolicy.isAllowed, company.activeCompany);
};