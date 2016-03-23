'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
    mongoose = require('mongoose'),
    Hackathon = mongoose.model('Hackathon'),
    multer = require('multer'),
    config = require(path.resolve('./config/config')),
    _ = require('lodash'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 *  Update Thumbnail Hackathon Image
 */
exports.changeThumbnailImage = function(req, res,next) {
    var user = req.user;
    var upload = multer(config.uploads.hackathonThumbUpload).single('newThumbPicture');
    var profileUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;

    // Filtering to upload only images
    upload.fileFilter = profileUploadFileFilter;
    var result = {};
    if (user) {
        upload(req, res, function(uploadError) {
            if (uploadError) {
                return res.status(400).send({
                    message: 'Error occurred while uploading profile picture'
                });
            } else {
                result.thumbImageURL = config.uploads.hackathonThumbUpload.dest + req.file.filename;
                res.json(result);
            }
        });
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};

exports.changeHeaderImage = function(req, res) {
    var user = req.user;
    var upload = multer(config.uploads.hackathonHeaderUpload).single('newHeaderImage');
    var profileUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;

    // Filtering to upload only images
    upload.fileFilter = profileUploadFileFilter;
    var result = {};
    if (user) {
        upload(req, res, function(uploadError) {
            if (uploadError) {
                return res.status(400).send({
                    message: 'Error occurred while uploading profile picture'
                });
            } else {
                result.imageHeaderURL = config.uploads.hackathonHeaderUpload.dest + req.file.filename;
                res.json(result);
            }
        });
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};

exports.changeLogoImage = function(req, res) {
    var user = req.user;
    var upload = multer(config.uploads.hackathonLogoUpload).single('newLogoPicture');
    var profileUploadFileFilter = require(path.resolve('./config/lib/multer')).profileUploadFileFilter;

    // Filtering to upload only images
    upload.fileFilter = profileUploadFileFilter;
    var result = {};
    if (user) {
        upload(req, res, function(uploadError) {
            if (uploadError) {
                return res.status(400).send({
                    message: 'Error occurred while uploading profile picture'
                });
            } else {
                result.imageLogoURL = config.uploads.hackathonLogoUpload.dest + req.file.filename;
                res.json(result);
            }
        });
    } else {
        res.status(400).send({
            message: 'User is not signed in'
        });
    }
};