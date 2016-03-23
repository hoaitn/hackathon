'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    _ = require('lodash'),
    timestamps = require('mongoose-timestamp');

var submissions = require('./submission.server.model');

/**
 * Hackathon Schema
 */
var HackathonSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        default: '',
        trim: true,
        required: 'Name of Hackathon cannot be blank'
    },
    tagline: {
        type: String,
        default: '',
        trim: true
    },
    url: {
        type: String,
        default: '',
        trim: true
    },
    contact_email: {
        type: String,
        default: '',
        trim: true
    },
    time_zone: {
        type: String,
        default: '',
        trim: true
    },
    location_name: {
        type: String,
        default: '',
        trim: true
    },
    address: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    hackathonThumb: {
        type: String,
        default: '',
        trim: true
    },
    imageHeaderURL: {
        type: String,
        default: '',
        trim: true
    },
    imageLogoURL: {
        type: String,
        default: '',
        trim: true
    },
    description: {
        type: String,
        default: '',
        trim: true
    },
    embed_video: {
        type: String,
        default: '',
        trim: true
    },
    embed_image: {
        type: String,
        default: '',
        trim: true
    },
    sponsors_name: {
        type: String,
        default: '',
        trim: true
    },

    submissions: submissions,
    socials: {},
    faqs: {
        type: 'array',
        default: '',
        trim: true
    },
    rules: {
        type: 'array',
        default: '',
        trim: true
    },
    judging: {
        type: 'object',
        default: '',
        trim: true
    },
    challenges: {
        type: 'object',
        default: '',
        trim: true
    },
    prizes: {
        type: 'object',
        default: '',
        trim: true
    }

});

HackathonSchema.plugin(timestamps);

mongoose.model('Hackathon', HackathonSchema);