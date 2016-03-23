'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash');

/**
 * Extend user's controller
 */
module.exports = _.extend(
	require('./images/images.images.server.controller'),
	require('./hackathons/hackathons.main.server.controller'),
	require('./hackathons/member.server.controller'),
	require('./hackathons/scheduler.server.controller')
);