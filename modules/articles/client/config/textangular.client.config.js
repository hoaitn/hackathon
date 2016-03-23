'use strict';

// Articles module config
angular.module('articles').config(['$provide',
	function($provide) {
		// Config logic
		$provide.decorator('taOptions', ['$delegate',
			function(taOptions) {
				// $delegate is the taOptions we are decorating
				// here we override the default toolbars and classes specified in taOptions.
				taOptions.forceTextAngularSanitize = true; // set false to allow the textAngular-sanitize provider to be replaced
				taOptions.keyMappings = []; // allow customizable keyMappings for specialized key boards or languages
				taOptions.toolbar = [
					['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'pre', 'quote', 'bold', 'italics', 'underline', 'clear', 'ul', 'ol', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', 'html', 'insertImage', 'insertLink']
				];
				taOptions.classes = {
					focussed: 'focussed',
					toolbar: 'btn-toolbar',
					toolbarGroup: 'button-group small',
					toolbarButton: 'button secondary',
					toolbarButtonActive: 'active',
					disabled: 'disabled',
					textEditor: 'form-control has-border',
					htmlEditor: 'form-control has-border'
				};
				return taOptions; // whatever you return will be the taOptions
			}
		]);
	}
]);