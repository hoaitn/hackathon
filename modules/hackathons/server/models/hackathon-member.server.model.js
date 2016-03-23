'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	timestamps = require('mongoose-timestamp');

/**
 * HackathonMember Schema
 */
var HackathonMemberSchema = new Schema({
	// HackathonMember model fields   
	hackathon: {
		type: Schema.Types.ObjectId,
		ref: 'Hackathon'
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	accept: {
		type: Boolean,
		default: false
	},
	role: {
		type: String
	}
});

HackathonMemberSchema.index({
	hackathon: 1,
	user: 1
}, {
	unique: true
});

HackathonMemberSchema.pre('save', function(next) {

	if (!this.accept) {
		this.accept = false;
	}
	next();
});

HackathonMemberSchema.plugin(timestamps);
mongoose.model('HackathonMember', HackathonMemberSchema);