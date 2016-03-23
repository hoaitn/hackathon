'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  HackathonMember = mongoose.model('HackathonMember');

/**
 * Globals
 */
var user, hackathonMember;

/**
 * Unit tests
 */
describe('Hackathon member Model Unit Tests:', function() {
  beforeEach(function(done) {
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: 'username',
      password: 'password'
    });

    user.save(function() { 
      hackathonMember = new HackathonMember({
        // Add model fields
        // ...
      });

      done();
    });
  });

  describe('Method Save', function() {
    it('should be able to save without problems', function(done) {
      return hackathonMember.save(function(err) {
        should.not.exist(err);
        done();
      });
    });
  });

  afterEach(function(done) { 
    HackathonMember.remove().exec();
    User.remove().exec();

    done();
  });
});
