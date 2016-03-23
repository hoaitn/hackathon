'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	_ = require('lodash'),
	Interest = mongoose.model('Interest'),
	MemberInterest = mongoose.model('MemberInterest'),
	async = require('async'),
	slug = require('slug'),
	path = require('path'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a
 */
exports.create = function(req, res) {


	if (_.isArray(req.body)) {
		var n = _.filter(req.body, function(o) {
			return !o._id;
		});
		if (_.isArray(n)) {
			var data = [];
			async.each(n, function(value, callback) {

				Interest.findOneAndUpdate({
					slug: slug(value.name, {
						lower: true
					})
				}, {
					name: value.name
				}, {
					upsert: true,
					new: true
				}, function(err, item) {
					data.push(item);
					callback(null, data);
				});

			}, function(err, result) {

				if (err) {
					console.log('A file failed to process');
				} else {
					console.log(data);
				}
			});


			/*_.forEach(n, function(value, key) {
				calls.push(function(data, callback) {
					Interest.findOneAndUpdate({
						slug: slug(value.name, {
							lower: true
						})
					}, {
						name: value.name
					}, {
						upsert: true
					}, function(err, item) {
						data.push(item);
						callback(null, data);
					});
				});
			});
			async.parallel(calls, function(err, result) {

				if (err)
					return console.log(err);
				console.log(result);
			});*/
			/*Interest.create(n, function(err, info) {
				if (err) {
					res.status(400).json({
						message: 'Loi'
					});
				}
				res.json(info);
			});*/
		}

	}

	/*var interest = new Interest(req.body);

	interest.save(function(err) {
		if (err) {
			return res.status(400).send(err);
		} else {
			res.json(interest);
		}
	});*/
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
	Interest.find().sort('name').exec(function(err, datas) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(datas);
		}
	});
};

exports.listInterestByUser = function(req, res) {

	if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
		return res.status(400).send({
			message: 'User is invalid'
		});
	}

	MemberInterest.find({
		userId: req.params.userId
	}).populate('interestId', 'name').exec(function(err, list) {
		if (err) {
			return res.status(400).send(err);
		} else if (!list) {
			return res.status(400).send({
				message: 'Not is invalid'
			});
		}

		res.json(list);
	});


};