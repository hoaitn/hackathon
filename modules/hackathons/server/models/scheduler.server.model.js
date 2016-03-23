'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	timestamps = require('mongoose-timestamp'),
	validators = require('mongoose-validators');


/**
 * Scheduler Schema
 */
var SchedulerSchema = new Schema({
	// Scheduler model fields   
	hackathon: {
		type: Schema.Types.ObjectId,
		ref: 'Hackathon',
		required: true
	},
	title: {
		type: String,
		required: true
	},
	type: {
		type: String
	},
	start: {
		type: Date,
		required: 'Date start is required',
		validate: validators.isDate()
	},
	end: {
		type: Date,
		required: 'End date is required',
		validate: validators.isDate()
	},
	allDay: {
		type: Boolean,
		default: false
	},
	url: {
		type: String,
		validate: validators.isURL({
			protocols: ['http', 'https', 'ftp'],
			require_tld: true,
			require_protocol: false,
			allow_underscores: false
		})
	},
	className: {
		type: String
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	}
});

SchedulerSchema.plugin(timestamps);

mongoose.model('Scheduler', SchedulerSchema);