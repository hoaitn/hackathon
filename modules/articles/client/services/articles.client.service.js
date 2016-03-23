(function() {
	'use strict';

	angular.module('articles.services')
		.factory('ArticlesService', ArticlesService);
	ArticlesService.$inject = ['$resource', 'Restangular', '$q'];

	function ArticlesService($resource, Restangular, $q) {
		var articles = Restangular.all('articles');
		var sv = {};
		sv.new = function() {
			return Restangular.restangularizeElement(null, {}, 'articles');
		};

		sv.getList = function() {
			var defered = $q.defer();
			articles.getList().then(function(succ) {
				defered.resolve(succ);
			}, function(err) {
				defered.reject(err);
			});
			return defered.promise;
		};

		sv.getItem = function(articleId) {
			var defered = $q.defer();
			articles.one(articleId).get().then(function(succ) {
                console.log('21212');
				defered.resolve(succ);
			}, function(err) {
				defered.reject(err);
			});
            console.log('defered.promise '+defered.promise);
			return defered.promise;
		};

		sv.update = function(article) {
			var defered = $q.defer();
			article.put().then(function(succ) {
				defered.resolve(succ);
			}, function(err) {
				defered.reject(err);
			});
			return defered.promise;
		};

		sv.save = function(article) {
			var defered = $q.defer();
			article.save().then(function(succ) {
				defered.resolve(succ);
			}, function(err) {
				defered.reject(err);
			});
			return defered.promise;
		};

		return sv;
		/*return $resource('api/articles/:articleId', {
			articleId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});*/
	}
})();