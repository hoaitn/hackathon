'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
	mongoose = require('mongoose'),
	Article = mongoose.model('Article'),
	ArticleTag = mongoose.model('ArticleTag'),
	_ = require('lodash'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an article
 */
exports.create = function(req, res) {
	var article = new Article(req.body);
	article.user = req.user;

	article.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			_.forEach(req.body.tags, function(value) {
				var article_tag = new ArticleTag({
					articleId: article._id,
					tagId: value._id
				});
				article_tag.save();
			});
			res.json(article);
		}
	});
};

/**
 * Show the current article
 */
exports.read = function(req, res) {
	req.article.getTags(function(err, tags) {
		// convert mongoose document to JSON		
		var article = req.article ? req.article.toJSON() : {};
		if (err) {

		} else {
			article.tags = _.map(tags, 'tagId');
		}

		// Add a custom field to the Article, for determining if the current User is the "owner".
		// NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
		article.isCurrentUserOwner = req.user && article.user && article.user._id.toString() === req.user._id.toString() ? true : false;

		res.json(article);
	});

};

/**
 * Update an article
 */
exports.update = function(req, res) {
	var article = req.article;

	article.title = req.body.title;
	article.content = req.body.content;
	article.tags = req.body.tags;

	article.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			/*_.forEach(req.body.tags, function(value) {
				var article_tag = new ArticleTag({
					articleId: article._id,
					tagId: value._id
				});
				article_tag.save(function(err) {
					console.log(err);
				});
			});*/
			res.json(article);
		}
	});
};

/**
 * Delete an article
 */
exports.delete = function(req, res) {
	var article = req.article;

	article.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(article);
		}
	});
};

/**
 * List of Articles
 */
exports.list = function(req, res) {
	Article.find().sort('-created').populate('user', 'displayName').exec(function(err, articles) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(articles);
		}
	});
};

/**
 * Article middleware
 */
exports.articleByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Article is invalid'
		});
	}

	Article.findById(id).populate('user', 'displayName').exec(function(err, article) {
		if (err) {
			return next(err);
		} else if (!article) {
			return res.status(404).send({
				message: 'No article with that identifier has been found'
			});
		}
		req.article = article;
		next();
		/*article.getTags(function(err, tags) {
			if (err) {

			} else {
				article.tags = tags;
			}
			var a = article.toJSON();
			a.tags = tags;
			req.article = a;
			next();
		});*/

	});
};