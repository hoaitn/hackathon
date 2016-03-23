'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	_ = require('lodash'),
	User = mongoose.model('User'),
	path = require('path'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a
 */
exports.create = function(req, res) {

};

/**
 * Show the current
 */
exports.read = function(req, res) {

};

/**
 * Update a
 */
exports.update = function(req, res) {

};

/**
 * Delete an
 */
exports.delete = function(req, res) {

};

/**
 * List of
 */
exports.list = function(req, res) {
	User.find({
		isVerify: false
	}).sort('-created').exec(function(err, lists) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(lists);
		}
	});
};

//List valid
exports.listValidate = function(req, res) {
	User.find({
		account_type: 'company',
		isVerify: false
	}).sort('-created').exec(function(err, lists) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(lists);
		}
	});
};

/**
 * Active company
 */

exports.activeCompany = function(req, res) {
	if (!mongoose.Types.ObjectId.isValid(req.params.companyId)) {
		return res.status(400).send({
			message: 'ID is invalid'
		});
	}
	User.findById(req.params.companyId).exec(function(err, company) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			if (!company.isVerify) {
				company.isVerify = true;
				company.save(function(err, newCom) {
					if (err) {
						return res.status(400).send({
							message: errorHandler.getErrorMessage(err)
						});
					} else {
						res.json(newCom);
					}
				});
			} else {
				return res.json(company);
			}

		}
	});
};