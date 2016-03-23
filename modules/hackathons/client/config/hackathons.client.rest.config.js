(function() {
	'use strict';

	angular.module('hackathons.rest')
		.config(restConfig);

	restConfig.$inject = ['RestangularProvider', '$sceProvider'];

	function restConfig(RestangularProvider, $sceProvider) {
		$sceProvider.enabled(false);
		RestangularProvider.setBaseUrl('/api');
	}
})();