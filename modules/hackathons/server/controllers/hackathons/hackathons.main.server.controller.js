'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Hackathon = mongoose.model('Hackathon'),
    User = mongoose.model('User'),
    _ = require('lodash'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
var acl = require('acl');
/**
 * Create an article
 */
exports.create = function(req, res) {

    var hackathon = new Hackathon();
    hackathon.name = req.body.name;
    hackathon.tagline = req.body.tagline;
    hackathon.url = req.body.url;
    hackathon.contact_email = req.body.contact_email;
    hackathon.time_zone = req.body.time_zone;
    hackathon.location_name = req.body.location_name;

    /* hackathon.hackathonThumb = req.body.hackathonThumb;
     hackathon.imageHeaderURL = req.body.imageHeaderURL;
     hackathon.imageLogoURL = req.body.imageLogoURL;

     hackathon.description = req.body.description;
     hackathon.embed_video = req.body.embed_video;
     hackathon.embed_image = req.body.embed_image;
     hackathon.sponsors_name = req.body.sponsors_name;

     hackathon.faqs = req.body.faqs;
     hackathon.rules = req.body.rules;
     hackathon.relevant_information = req.body.relevant_information;

     hackathon.judging = {
         criterias: req.body.judging.criterias,
         type: req.body.judging.type,
         from_date: req.body.judging.from_date,
         to_date: req.body.judging.to_date
     };
     hackathon.challenges = {
         relevant_information: req.body.challenges.relevant_information
     };

     hackathon.prizes = {
         winner_date: req.body.prizes.winner_date,
         name: req.body.prizes.name,
         value: req.body.prizes.value,
         number_winner: req.body.prizes.number_winner,
         description: req.body.prizes.description,
         given_by: req.body.prizes.given_by
     };*/

    hackathon.user = req.user;

    hackathon.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(hackathon);
        }
    });
};

/**
 * Show the current article
 */
exports.read = function(req, res) {

    var hackathon = req.hackathon;

    var data = hackathon.toObject();

    data.isCurrentUserOwner = req.user && hackathon.user && hackathon.user._id.toString() === req.user._id.toString() ? true : false;

    return res.json(data);

};

/**
 * Update an article
 */
exports.update = function(req, res) {
    /*var hackathon = req.hackathon;*/

    /*hackathon.name = req.body.name;
    hackathon.tagline = req.body.tagline;
    hackathon.url = req.body.url;
    hackathon.contact_email = req.body.contact_email;
    hackathon.time_zone = req.body.time_zone;
    hackathon.location_name = req.body.location_name;

    hackathon.hackathonThumb = req.body.hackathonThumb;
    hackathon.imageHeaderURL = req.body.imageHeaderURL;
    hackathon.imageLogoURL = req.body.imageLogoURL;

    hackathon.description = req.body.description;
    hackathon.embed_video = req.body.embed_video;
    hackathon.embed_image = req.body.embed_image;
    hackathon.sponsors_name = req.body.sponsors_name;

    hackathon.faqs = req.body.faqs;
    hackathon.rules = req.body.rules;
    hackathon.relevant_information = req.body.relevant_information;

    hackathon.judging = {
        criterias: req.body.judging.criterias,
        type: req.body.judging.type,
        from_date: req.body.judging.from_date,
        to_date: req.body.judging.to_date
    };
    hackathon.challenges = {
        relevant_information: req.body.challenges.relevant_information
    };

    hackathon.prizes = {
        winner_date: req.body.prizes.winner_date,
        name: req.body.prizes.name,
        value: req.body.prizes.value,
        number_winner: req.body.prizes.number_winner,
        description: req.body.prizes.description,
        given_by: req.body.prizes.given_by
    };*/

    /*hackathon.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(hackathon);
        }
    });*/


    Hackathon.findByIdAndUpdate(req.params.hackathonID, {
        $set: req.body
    }, function(err, data) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.json(data);
    });

};

/**
 * Delete an article
 */
exports.delete = function(req, res) {

};

/**
 * List of Articles
 */
exports.list = function(req, res) {

    Hackathon.find({
            deleted: false,
            user: req.user
        })
        .sort('-created')
        .populate('user', 'displayName').exec(function(err, hackathons) {
            if (err) {
                return res.status(400).send({
                    message: errorHandler.getErrorMessage(err)
                });
            } else {
                res.json(hackathons);
            }
        });
};

/**
 * Article middleware
 */
exports.hackathonByID = function(req, res, next, id) {

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'Hackathon is invalid'
        });
    }

    Hackathon.findOne({
            _id: id,
            deleted: false
        })
        .populate('user', 'displayName')
        .exec(function(err, hackathon) {
            if (err) {
                return next(err);
            } else if (!hackathon) {
                return res.status(404).send({
                    message: 'No hackathon with that identifier has been found'
                });
            } else {
                req.hackathon = hackathon;
                next();
            }

        });
};

/**
 * [saveSubmission description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.saveSubmission = function(req, res) {
    var hackathon = req.hackathon;
    //hackathon.submissions.test = req.body.submissions;

    if (!hackathon.submissions) {
        hackathon.submissions = {};
    }
    hackathon.submissions = req.body;

    hackathon.save(function(err, hackathon) {
        if (err) {
            return res.status(400).json({
                message: errorHandler.getErrorMessage(err)
            });
        }
        return res.json(hackathon);
    });

};

/**
 * [saveSocial description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
exports.saveSocial = function(req, res) {
    var hackathon = req.hackathon;
    if (!hackathon.socials) {
        hackathon.socials = {};
    }
    hackathon.socials = req.body;
    hackathon.markModified('socials');
    hackathon.save(function(err, hackathon) {
        if (err) {
            return res.status(400).json({
                message: 'Something wrong!'
            });
        }
        return res.json(hackathon);
    });
};