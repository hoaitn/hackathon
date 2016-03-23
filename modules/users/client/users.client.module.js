/*'use strict';

// Use Application configuration module to register a new module
ApplicationConfiguration.registerModule('users.config.rest');
ApplicationConfiguration.registerModule('users', ['core']);
ApplicationConfiguration.registerModule('users.admin', ['core.admin']);
ApplicationConfiguration.registerModule('users.admin.routes', ['core.admin.routes']);*/


(function(app) {
	'use strict';

	app.registerModule('users', ['core']);
	app.registerModule('users.admin', ['core.admin']);
	app.registerModule('users.admin.routes', ['core.admin.routes']);

})(ApplicationConfiguration);