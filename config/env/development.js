'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
	db: {
		uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/mean-dev',
		options: {
			user: '',
			pass: ''
		},
		// Enable mongoose debug mode
		debug: process.env.MONGODB_DEBUG || false
	},
	log: {
		// logging with Morgan - https://github.com/expressjs/morgan
		// Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
		format: 'dev',
		options: {
			// Stream defaults to process.stdout
			// Uncomment/comment to toggle the logging to a log on the file system
			stream: {
				directoryPath: process.cwd(),
				fileName: 'access.log',
				rotatingLogs: { // for more info on rotating logs - https://github.com/holidayextras/file-stream-rotator#usage
					active: false, // activate to use rotating logs 
					fileName: 'access-%DATE%.log', // if rotating logs are active, this fileName setting will be used
					frequency: 'daily',
					verbose: false
				}
			}
		}
	},
	app: {
		title: defaultEnvConfig.app.title + ' - Development Environment'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '1137907212888992',
		clientSecret: process.env.FACEBOOK_SECRET || '3ee2dc12145499a35f6c7a72cc3598c0',
		callbackURL: '/api/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'DYrH9iGVOfPxvS5IaLj2r98vk',
		clientSecret: process.env.TWITTER_SECRET || '6ocY1nb3FcIpTMfgwDpVc8Tyc5Xd1Bw8OTK3bJSlf9QsmuqCQf',
		callbackURL: '/api/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || '842968391549-tpuet41fv7a3ulrmnslk9g10jo2nl67u.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || 'Eu6FkLVBa6STY86BfGTJwRa4',
		callbackURL: '/api/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || '752exlzfei88hj',
		clientSecret: process.env.LINKEDIN_SECRET || 'ufVRUAzHBQtUb2GV',
		callbackURL: '/api/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'd7092153e90d09a85720',
		clientSecret: process.env.GITHUB_SECRET || '49283fbc4b66cbd0da7c4b7c78a3bb4736d35912',
		callbackURL: '/api/auth/github/callback'
	},
	paypal: {
		clientID: process.env.PAYPAL_ID || 'CLIENT_ID',
		clientSecret: process.env.PAYPAL_SECRET || 'CLIENT_SECRET',
		callbackURL: '/api/auth/paypal/callback',
		sandbox: true
	},
	mailer: {
		from: process.env.MAILER_FROM || '"QSoft Vietnam" <qsoftvietnam2015@gmail.com>',
		options: {
			host: process.env.MAILER_SERVICE_HOST || 'smtp.gmail.com',
			port: process.env.MAILER_SERVICE_PORT || 465,
			secure: true, // use SSL
			service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'qsoftvietnam2015@gmail.com',
				pass: process.env.MAILER_PASSWORD || 'qsoft@123'
			}
		}
	},
	livereload: true,
	seedDB: {
		seed: process.env.MONGO_SEED === 'true' ? true : false,
		options: {
			logResults: process.env.MONGO_SEED_LOG_RESULTS === 'false' ? false : true,
			seedUser: {
				//username: process.env.MONGO_SEED_USER_USERNAME || 'user',
				provider: 'local',
				email: process.env.MONGO_SEED_USER_EMAIL || 'user@localhost.com',
				firstName: 'User',
				lastName: 'Local',
				displayName: 'User Local',
				roles: ['user']
			},
			seedAdmin: {
				//username: process.env.MONGO_SEED_ADMIN_USERNAME || 'admin',
				provider: 'local',
				email: process.env.MONGO_SEED_ADMIN_EMAIL || 'admin@localhost.com',
				firstName: 'Admin',
				lastName: 'Local',
				displayName: 'Admin Local',
				roles: ['user', 'admin']
			}
		}
	}
};