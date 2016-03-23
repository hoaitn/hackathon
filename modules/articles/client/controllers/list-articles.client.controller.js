(function() {
	'use strict';

	angular
		.module('articles')
		.controller('ArticlesListController', ArticlesListController);

	ArticlesListController.$inject = ['ArticlesService'];

	function ArticlesListController(ArticlesService) {
		var vm = this;

		ArticlesService.getList().then(function(succ) {
			vm.articles = succ;
		}, function(err) {

		});
	}
})();