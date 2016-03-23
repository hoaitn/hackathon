'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	_ = require('lodash'),
	Scheduler = mongoose.model('Scheduler'),
	path = require('path'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a 
 */
exports.createScheduler = function(req, res) {
	var scheduler = new Scheduler(req.body);
	scheduler.hackathon = req.hackathon;
	scheduler.author = req.user;
	scheduler.save(function(err, scheduler) {
		if (err) {
			return res.status(400).json({
				'message': errorHandler.getErrorMessage(err)
			});
		}
		return res.json(scheduler);
	});
};

/**
 * Show the current 
 */
exports.readScheduler = function(req, res) {

};

/**
 * Update a 
 */
exports.updateScheduler = function(req, res) {

};

/**
 * Delete an 
 */
exports.deleteScheduler = function(req, res) {
	if (!mongoose.Types.ObjectId.isValid(req.params.schedulerID)) {
		return res.status(400).send({
			message: 'ID not valid'
		});
	}
	Scheduler.findOne({
		_id: req.params.schedulerID,
		hackathon: req.hackathon,
		deleted: false
	}).exec(function(err, data) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			data.softdelete(function(err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.json(data);
				}
			});
		}
	});

};

/**
 * List of 
 */
exports.listScheduler = function(req, res) {
	Scheduler.find({
			hackathon: req.hackathon._id,
			deleted: false
		})
		.populate('author')
		.exec(function(err, items) {
			if (err) {
				return res.status(400).json({
					'message': errorHandler.getErrorMessage(err)
				});
			}
			return res.json(items);
		});
};

/**
 * [shedulerById description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @param  {[type]}   id   [description]
 * @return {[type]}        [description]
 */
exports.shedulerById = function(req, res, next, id) {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Scheduler is invalid'
		});
	}

	Scheduler.findOne({
			_id: id,
			hackathon: req.hackathon._id
		})
		.populate('author')
		.populate('hackathon')
		.exec(function(err, scheduler) {
			if (err) {
				return next(err);
			} else if (!scheduler) {
				return res.status(404).send({
					message: 'No scheduler with that identifier has been found'
				});
			}
			req.scheduler = scheduler;
			next();
		});
};