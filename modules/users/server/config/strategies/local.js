'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    User = require('mongoose').model('User'),
    config = require(path.resolve('./config/config')),
    jwt = require('jsonwebtoken');


module.exports = function() {
    // Use local strategy
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
        function(email, password, done) {
            User.findOne({
                email: email.toLowerCase()
            }, function(err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {
                        message: 'Incorrect email.'
                    });
                }
                /*if (!user.validPassword(password)) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }*/

                if (!user.authenticate(password)) {
                    return done(null, false, {
                        message: 'Invalid username or password'
                    });
                }

                if (!user.active) {
                    return done(null, false, {
                        message: 'User not active. Please active account!'
                    });
                }

                var tokenPayload = {
                    email: user.email,
                    loginExpires: user.loginExpires
                };
                //user.loginExpires = Date.now() + (2 * 60 * 60 * 1000); // 2 hours
                user.loginExpires = Date.now() + (config.tokenExpiresSeconds * 1000); // 30 minutes

                // add token and exp date to user object
                user.token = jwt.sign(tokenPayload, config.app_key, {
                    expiresIn: config.tokenExpiresSeconds
                });

                // save user object to update database
                user.save(function(err) {
                    if (err) {
                        return done(null, false, err);
                    } else {
                        return done(null, user);
                    }
                });
            });
        }));
};