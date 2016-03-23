'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    HackathonMember = mongoose.model('HackathonMember'),
    User = mongoose.model('User'),
    path = require('path'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'User is invalid'
        });
    }

    User.findOne({
        _id: id
    }).exec(function(err, user) {
        if (err) {
            return next(err);
        } else if (!user) {
            return next(new Error('Failed to load User ' + id));
        }

        req.profile = user;
        next();
    });
};

/**
 * Require login token routing middleware
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

/**
 * [listInvite description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.listInvite = function(req, res) {
    HackathonMember.find({
            user: req.user,
            accept: false
        })
        .populate('hackathon')
        .exec(function(err, items) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json(items);
            }
        });
};