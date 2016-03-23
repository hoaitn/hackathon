'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	_ = require('lodash'),
	path = require('path'),

	Tag = mongoose.model('Tag'),
	Article = mongoose.model('Article'),
	ArticleTag = mongoose.model('ArticleTag'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a
 */
exports.create = function(req, res) {
	var ins = new Tag(req.body);

	ins.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(ins);
		}
	});
};

/**
 * Show the current
 */
exports.read = function(req, res) {
	ArticleTag.find({
		tagId: req.tag._id
	}).populate('articleId').exec(function(err, lists) {
		var tag = req.tag ? req.tag.toJSON() : {};
		tag.article = _.map(lists, 'articleId');
		res.json(tag);
	});
	// convert mongoose document to JSON

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

	var tag = req.tag;

	tag.remove(function(err) {

		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(tag);
		}
	});

};

/**
 * List of
 */
exports.list = function(req, res) {
	Tag.find().sort('-created').exec(function(err, tags) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(tags);
		}
	});
};

/**
 * Tag middleware
 */
exports.tagByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Tag is invalid'
		});
	}

	Tag.findById(id).exec(function(err, data) {
		if (err) {
			return next(err);
		} else if (!data) {
			return res.status(404).send({
				message: 'No tag with that identifier has been found'
			});
		}

		req.tag = data;
		next();
	});
};