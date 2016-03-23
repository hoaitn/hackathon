'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	_ = require('lodash'),
	User = mongoose.model('User'),
	HackathonMember = mongoose.model('HackathonMember'),
	path = require('path'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a 
 */
exports.addMember = function(req, res) {
	var hackathon = req.hackathon;
	User.findOne({
		email: req.body.user_email
	}).exec(function(err, user) {
		if (err) {
			return res.status(400).json({
				message: errorHandler.getErrorMessage(err)
			});
		} else if (!user) {
			return res.status(404).json({
				message: 'User not found'
			});
		}

		HackathonMember.findOne({
				hackathon: req.hackathon,
				accept: false,
				user: user
			})
			.exec(function(err, succ) {
				if (err) {
					return res.status(404).json({
						message: errorHandler.getErrorMessage(err)
					});
				} else if (!succ) {
					var body = {
						hackathon: hackathon,
						user: user,
						role: req.body.role
					};
					var member = new HackathonMember(body);
					member.save(function(err, member) {
						if (err) {
							return res.status(404).json({
								message: errorHandler.getErrorMessage(err)
							});
						} else {
							return res.json(member);
						}

					});
				} else {
					if (succ.deleted) {
						succ.role = req.body.role;
						succ.restore(function(err, newMem) {
							if (err) {
								return res.status(404).json({
									message: errorHandler.getErrorMessage(err)
								});
							} else {
								newMem.user = user;
								return res.json(newMem);
							}
						});
					} else {
						return res.status(400).json({
							message: 'User already hackathon'
						});
					}
				}
			});


	});
};

/**
 * Show the current 
 */
exports.readMember = function(req, res) {

};

/**
 * Update a 
 */
exports.updateMember = function(req, res) {

};

/**
 * Delete an 
 */
exports.deleteMember = function(req, res) {
	HackathonMember.findOne({
			hackathon: req.hackathon,
			deleted: false,
			user: req.params.memberID
		})
		.exec(function(err, item) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else if (!item) {
				return res.status(400).send({
					message: 'User not found'
				});
			} else {
				item.softdelete(function(err) {
					if (err) {
						return res.status(400).send({
							message: errorHandler.getErrorMessage(err)
						});
					} else {
						res.json(item);
					}
				});
			}
		});
};

/**
 * List of 
 */
exports.getListMember = function(req, res) {
	HackathonMember.find({
			hackathon: req.hackathon,
			deleted: false,
			accept: true
		})
		.populate('user')
		.exec(function(err, items) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else if (!items) {
				return res.status(400).send({
					message: 'List user not found'
				});
			} else {
				res.json(items);
			}
		});
};

/**
 * [getListMemberInvite description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.getListMemberInvite = function(req, res) {
	HackathonMember.find({
		_id: false
	})

	.exec(function(err, items) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else if (!items) {
			return res.status(400).send({
				message: 'List user not found'
			});
		} else {
			res.json(items);
		}
	});
};


/**
 * [userAccept description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.userAccept = function(req, res) {
	HackathonMember.findOne({
		hackathon: req.hackathon,
		user: req.user,
		deleted: false,
		$or: [{
			accept: false,
		}, {
			accept: {
				$exists: false
			}
		}]
	}).exec(function(err, item) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else if (!item) {
			return res.status(400).send({
				message: 'User not found'
			});
		} else {
			item.accept = true;
			item.save(function(err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.json(req.hackathon);
				}
			});
		}
	});
};


/**
 * [userDenied description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.userDenied = function(req, res) {
	HackathonMember.findOne({
		hackathon: req.hackathon,
		user: req.user,
		deleted: false,
		$or: [{
			accept: false,
		}, {
			accept: {
				$exists: false
			}
		}]
	}).exec(function(err, item) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else if (!item) {
			return res.status(400).send({
				message: 'User not found'
			});
		} else {
			item.softdelete(function(err) {
				if (err) {
					return res.status(400).send({
						message: errorHandler.getErrorMessage(err)
					});
				} else {
					res.json(req.hackathon);
				}
			});
		}
	});
};