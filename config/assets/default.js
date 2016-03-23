'use strict';

module.exports = {
	client: {
		lib: {
			css: [
				'public/lib/motion-ui/dist/motion-ui.css',
				'public/lib/bootstrap/dist/css/bootstrap.min.css',
				'public/lib/foundation-apps/dist/css/foundation-apps.css',
				'public/lib/foundation-datepicker/css/foundation-datepicker.min.css',
				'public/lib/foundation-sites/dist/foundation.css',
				'public/lib/textAngular/dist/textAngular.css',
				'public/lib/font-awesome/css/font-awesome.css',
				'public/lib/ng-tags-input/ng-tags-input.css',
				'public/lib/perfect-scrollbar/src/perfect-scrollbar.css',
				'public/lib/angular-ui-grid/ui-grid.css',
				'public/lib/ng-dialog/css/ngDialog.css',
				'public/lib/angular-toastr/dist/angular-toastr.min.css',
				'public/lib/fullcalendar/dist/fullcalendar.min.css',
				'public/lib/fullcalendar-scheduler/dist/scheduler.min.css',
			],
			js: [
				'public/lib/jquery/dist/jquery.js',
				'public/lib/foundation-sites/dist/foundation.js',
				'public/lib/foundation-datepicker/js/foundation-datepicker.min.js',
				'public/lib/motion-ui/dist/motion-ui.js',
				'public/lib/lodash/dist/lodash.js',
				'public/lib/moment/min/moment-with-locales.js',
				'public/lib/perfect-scrollbar/src/perfect-scrollbar.js',
				'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
				'public/lib/fullcalendar/dist/fullcalendar.min.js',
				'public/lib/fullcalendar/dist/gcal.js',
				'public/lib/fullcalendar-scheduler/dist/scheduler.min.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-messages/angular-messages.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-ui-grid/ui-grid.js',
				'public/lib/angular-ui-validate/dist/validate.js',
				'public/lib/angular-bootstrap/ui-bootstrap.min.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/angular-file-upload/dist/angular-file-upload.js',
				'public/lib/restangular/dist/restangular.js',
				'public/lib/textAngular/dist/textAngular-rangy.min.js',
				'public/lib/textAngular/dist/textAngular-sanitize.js',
				'public/lib/textAngular/dist/textAngular.js',
				'public/lib/textAngular/dist/textAngularSetup.js',
				'public/lib/ng-tags-input/ng-tags-input.js',
				'public/lib/ui-router-extras/release/ct-ui-router-extras.js',
				'public/lib/foundation-apps/dist/js/foundation-apps.js',
				'public/lib/foundation-apps/dist/js/foundation-apps-templates.js',
				'public/lib/angular-perfect-scrollbar/src/angular-perfect-scrollbar.js',
				'public/lib/angular-moment/angular-moment.js',
				'public/lib/ng-dialog/js/ngDialog.js',
				'public/lib/angular-toastr/dist/angular-toastr.min.js',
				'public/lib/angular-toastr/dist/angular-toastr.tpls.min.js',
				'public/lib/angular-ui-calendar/src/calendar.js'
			],
			tests: ['public/lib/angular-mocks/angular-mocks.js']
		},
		css: [
			'modules/*/client/css/*.css'
		],
		less: [
			'modules/*/client/less/*.less'
		],
		includePaths: [
			'public/lib/bootstrap-sass/assets/stylesheets',
			'public/lib/foundation-sites/scss'
		],
		sass: [

			'modules/*/client/scss/*.scss'
		],
		js: [
			'modules/core/client/app/config.js',
			'modules/core/client/app/init.js',
			'modules/*/client/*.js',
			'modules/*/client/**/*.js'
		],
		img: [
			'modules/**/*/img/**/*.jpg',
			'modules/**/*/img/**/*.png',
			'modules/**/*/img/**/*.gif',
			'modules/**/*/img/**/*.svg'
		],
		views: ['modules/*/client/views/**/*.html'],
		templates: ['build/templates.js']
	},
	server: {
		gruntConfig: ['gruntfile.js'],
		gulpConfig: ['gulpfile.js'],
		allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
		models: 'modules/*/server/models/**/*.js',
		routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
		sockets: 'modules/*/server/sockets/**/*.js',
		config: ['modules/*/server/config/*.js'],
		policies: 'modules/*/server/policies/*.js',
		views: ['modules/*/server/views/*.html']
	}
};