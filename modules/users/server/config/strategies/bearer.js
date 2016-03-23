'use strict';

/**
 * Module dependencies
 */
var passport = require('passport'),
    BearerStrategy = require('passport-http-bearer').Strategy,
    User = require('mongoose').model('User');

module.exports = function() {
    // Use bearer strategy
    passport.use(new BearerStrategy(
        function(token, done) {

            User.findOne({
                token: token,
                loginExpires: {
                    $gt: Date.now()
                }
            }, function(err, user) {
                if (err) {
                    return done(null, false, err);
                }
                if (!user) {
                    return done(null, false);
                }
                return done(null, user, {
                    scope: 'read'
                });
            });
        }
    ));
};