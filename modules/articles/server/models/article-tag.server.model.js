'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	_ = require('lodash');

/**
 * ArticleTag Schema
 */
var ArticleTagSchema = new Schema({
	articleId: {
		type: Schema.Types.ObjectId,
		ref: 'Article'
	},
	tagId: {
		type: Schema.Types.ObjectId,
		ref: 'Tag'
	}
}, {
	collection: 'article_tags'
});

ArticleTagSchema.index({
	articleId: 1,
	tagId: 1
}, {
	unique: true
});


mongoose.model('ArticleTag', ArticleTagSchema);