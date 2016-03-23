'use strict';

angular.module('tags').factory('TagService', ['$q', 'Restangular',

	function($q, Restangular) {
		// Tag service logic
		var tags = Restangular.all('tags');

		// Public API
		return {
			getList: function() {
				var defered = $q.defer();
				tags.getList().then(function(res) {
					defered.resolve(res);
				}, function(res) {
					defered.reject(res);
				});
				return defered.promise;
			},
			new: function() {
				return Restangular.restangularizeElement(null, {}, 'tags');
			},
			save: function(data) {
				var defered = $q.defer();
				data.save().then(function(res) {
					defered.resolve(res);
				}, function(res) {

				});
				return defered.promise;
			},
			update: function(data) {
				var defered = $q.defer();
				data.put().then(function(res) {
					defered.resolve(res);
				}, function(res) {

				});
				return defered.promise;
			},
			remove: function(data) {
				var defered = $q.defer();
				tags.one(data._id).remove().then(function(res) {
					defered.resolve(res);
				}, function(res) {
					defered.reject(res);
				});
				return defered.promise;
			},
			getItem: function(id) {
				var defered = $q.defer();
				tags.one(id).get().then(function(succ) {
					defered.resolve(succ);
				}, function(err) {
					defered.reject(err);
				});
				return defered.promise;
			}
		};
	}
]);