'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	_ = require('lodash');

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	content: {
		type: String,
		default: '',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

ArticleSchema.methods.getTags = function(cb) {
	return this.model('ArticleTag').find({
		articleId: this._id
	}, {
		tagId: true,
		read: 'tagId'
	}).populate('tagId').exec(cb);
};

ArticleSchema.post('remove', function(doc) {
	this.model('ArticleTag').remove({
		articleId: this._id
	}, function(err) {

	});
});

ArticleSchema.pre('save', function(next) {
	var _this = this;
	var tags = _.map(_this.tags, function(n) {
		var t = {};
		t.articleId = _this._id;
		t.tagId = n._id;
		return t;
	});
	_this.model('ArticleTag').create(tags, function(err, jellybean, snickers) {

		_this.model('ArticleTag').remove({
			articleId: _this._id,
			tagId: {
				$nin: _.map(_this.tags, '_id')
			}
		}, function(err) {

		});
	});

	next();
});

mongoose.model('Article', ArticleSchema);