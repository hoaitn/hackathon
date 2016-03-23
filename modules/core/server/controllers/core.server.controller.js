'use strict';

var validator = require('validator'),
	passport = require('passport'),
	_ = require('lodash');

/**
 * Render the main application page
 */
exports.renderIndex = function(req, res) {

	var safeUserObject = null;
	if (req.user) {
		safeUserObject = {
			_id: req.user._id,
			displayName: validator.escape(req.user.displayName),
			provider: validator.escape(req.user.provider),
			//username: validator.escape(req.user.username),
			created: req.user.created.toString(),
			roles: req.user.roles,
			profileImageURL: req.user.profileImageURL,
			email: validator.escape(req.user.email),
			account_type: req.user.account_type ? req.user.account_type : 'user',
			mobile: req.user.mobile,
			website: req.user.website,
			/*lastName: validator.escape(req.user.lastName),
			firstName: validator.escape(req.user.firstName),*/
			additionalProvidersData: req.user.additionalProvidersData,
			token: req.user.token
		};
		if (_.includes(req.user.roles, 'admin')) {
			safeUserObject.isAdmin = true;
		}
	}
	res.render('modules/core/server/views/index', {
		user: safeUserObject
	});
};

/**
 * Render the server error page
 */
exports.renderServerError = function(req, res) {
	res.status(500).render('modules/core/server/views/500', {
		error: 'Oops! Something went wrong...'
	});
};

/**
 * Render the server not found responses
 * Performs content-negotiation on the Accept HTTP header
 */
exports.renderNotFound = function(req, res) {

	res.status(404).format({
		'text/html': function() {
			res.render('modules/core/server/views/404', {
				url: req.originalUrl
			});
		},
		'application/json': function() {
			res.json({
				error: 'Path not found'
			});
		},
		'default': function() {
			res.send('Path not found');
		}
	});
};

/**
 *
 * Login token
 *
 */


exports.requiresLoginToken = function(req, res, next) {

	return passport.authenticate('bearer', {
		session: false
	}, function(err, user, info) {
		if (err) {
			//return next(err);
			return res.status(500).send({
				message: 'There was an internal server error processing your login token'
			});
		}
		if (!user) {
			return res.status(401).send({
				message: 'Token is incorrect or has expired. Please login again'
			});
		}
		req.user = user;
		return next();
	})(req, res, next);
};