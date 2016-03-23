'use strict';

module.exports = {
	secure: {
		ssl: false,
		privateKey: './config/sslcerts/key.pem',
		certificate: './config/sslcerts/cert.pem'
	},
	port: process.env.PORT || 8443,
	// Binding to 127.0.0.1 is safer in production.
	host: process.env.HOST || '127.0.0.1',
	sessionSecret: process.env.SESSION_SECRET || 'super amazing secret',
	db: {
		uri: process.env.MONGOHQ_URL || process.env.MONGOLAB_URI || 'mongodb://' + (process.env.DB_1_PORT_27017_TCP_ADDR || 'localhost') + '/mean-prod',
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
		format: process.env.LOG_FORMAT || 'combined',
		options: {
			// Stream defaults to process.stdout
			// Uncomment/comment to toggle the logging to a log on the file system
			stream: {
				directoryPath: process.env.LOG_DIR_PATH || process.cwd(),
				fileName: process.env.LOG_FILE || 'access.log',
				rotatingLogs: { // for more info on rotating logs - https://github.com/holidayextras/file-stream-rotator#usage
					active: process.env.LOG_ROTATING_ACTIVE === 'true' ? true : false, // activate to use rotating logs 
					fileName: process.env.LOG_ROTATING_FILE || 'access-%DATE%.log', // if rotating logs are active, this fileName setting will be used
					frequency: process.env.LOG_ROTATING_FREQUENCY || 'daily',
					verbose: process.env.LOG_ROTATING_VERBOSE === 'true' ? true : false
				}
			}
		}
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '1771860586378692',
		clientSecret: process.env.FACEBOOK_SECRET || 'c31652938fc2888de0bdc3b6bb0444e3',
		callbackURL: '/api/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'DYrH9iGVOfPxvS5IaLj2r98vk',
		clientSecret: process.env.TWITTER_SECRET || '6ocY1nb3FcIpTMfgwDpVc8Tyc5Xd1Bw8OTK3bJSlf9QsmuqCQf',
		callbackURL: '/api/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || '922803398208-fpon31i39c9poklhcghhc6kiskek8egt.apps.googleusercontent.com',
		clientSecret: process.env.GOOGLE_SECRET || 'I56Op9zfpV2kV25K6sjCacxw',
		callbackURL: '/api/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || '758vs6zryczk08',
		clientSecret: process.env.LINKEDIN_SECRET || '758vs6zryczk08',
		callbackURL: '/api/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/api/auth/github/callback'
	},
	paypal: {
		clientID: process.env.PAYPAL_ID || 'CLIENT_ID',
		clientSecret: process.env.PAYPAL_SECRET || 'CLIENT_SECRET',
		callbackURL: '/api/auth/paypal/callback',
		sandbox: false
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
				active: true,
				displayName: 'User Local',
				roles: ['user']
			},
			seedAdmin: {
				//username: process.env.MONGO_SEED_ADMIN_USERNAME || 'admin',
				provider: 'local',
				email: process.env.MONGO_SEED_ADMIN_EMAIL || 'admin@localhost.com',
				firstName: 'Admin',
				lastName: 'Local',
				active: true,
				displayName: 'Admin Local',
				roles: ['user', 'admin']
			}
		}
	}
};