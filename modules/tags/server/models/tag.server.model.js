'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	slug = require('slug');

/**
 * Tag Schema
 */
var TagSchema = new Schema({
	// Tag model fields   
	created: {
		type: Date,
		default: Date.now
	},
	name: {
		type: String,
		default: '',
		trim: true,
		required: true
	},
	slug: {
		type: String,
		default: '',
		trim: true
	}
});

/**
 * Hook a pre save method to slug title
 */
TagSchema.pre('save', function(next) {
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
TagSchema.pre('update', function(next) {
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
TagSchema.pre('remove', function(next) {
	this.model('ArticleTag').remove({
		tagId: this._id
	}, function(err) {

	});
	next();
});


mongoose.model('Tag', TagSchema);