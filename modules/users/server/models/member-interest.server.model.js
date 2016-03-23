'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * MemberInterest Schema
 */
var MemberInterestSchema = new Schema({
	// MemberInterest model fields   
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	interestId: {
		type: Schema.Types.ObjectId,
		ref: 'Interest'
	}
});

MemberInterestSchema.index({
	userId: 1,
	interestId: 1
}, {
	unique: true
});

mongoose.model('MemberInterest', MemberInterestSchema);