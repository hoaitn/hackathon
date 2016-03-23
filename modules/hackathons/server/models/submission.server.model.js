'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Submission Schema
 */
var SubmissionSchema = new Schema({
	// Submission model fields   
	eligibility: [new Schema({
		value: Number
	}, {
		_id: false
	})],
	requirement: String,
	registration: {
		free: String,
		value: Number,
		ticketType: Number,
		period: {
			from: Date,
			to: Date
		}
	},
	projectSubmission: {
		submitIdea: Boolean,
		requirement: String,
		period: {
			from: Date,
			to: Date
		},
		possibility: Number
	}

}, {
	_id: false
});
module.exports = SubmissionSchema;
//mongoose.model('Submission', SubmissionSchema);