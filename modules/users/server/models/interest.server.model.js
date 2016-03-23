'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	slug = require('slug'),
	findOrCreate = require('mongoose-findorcreate');


/**
 * Interest Schema
 */
var InterestSchema = new Schema({
	// Interest model fields   
	created: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		trim: true,
		required: true
	},
	slug: {
		type: String,
		unique: true,
		trim: true
	}
});

InterestSchema.plugin(findOrCreate);


/**
 * Hook a pre save method to slug title
 */
InterestSchema.pre('save', function(next) {
	if (!this.slug) {
		this.slug = slug(this.name, {
			lower: true
		});
	}
	next();
});

/**
 * Hook a pre update method to slug title
 */
InterestSchema.pre('update', function(next) {
	if (!this.slug) {
		this.slug = slug(this.name, {
			lower: true
		});
	}
	next();
});


/**
 * Hook a pre remove method
 */
InterestSchema.pre('remove', function(next) {
	this.model('MemberInterest').remove({
		interestId: this._id
	}, function(err) {

	});
	next();
});


mongoose.model('Interest', InterestSchema);