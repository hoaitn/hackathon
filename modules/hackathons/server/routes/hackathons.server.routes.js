'use strict';

/**
 * Module dependencies
 */
var hackathons = require('../controllers/hackathons.server.controller');

module.exports = function(app) {

	app.route('/api/hackathons').all()
		.get(hackathons.list)
		.post(hackathons.create);

	// Single article routes
	app.route('/api/hackathons/:hackathonID')
		.get(hackathons.read)
		.put(hackathons.update)
		.delete(hackathons.delete);

	app.route('/api/hackathons/:hackathonID/members')
		.get(hackathons.getListMember)
		.post(hackathons.addMember);

	app.route('/api/hackathons/:hackathonID/members/invite')
		.get(hackathons.getListMemberInvite)
		.post(hackathons.userAccept)
		.delete(hackathons.userDenied);

	app.route('/api/hackathons/:hackathonID/members/:memberID')
		.delete(hackathons.deleteMember);

	app.route('/api/hackathons/:hackathonID/submissions')
		.post(hackathons.saveSubmission);

	app.route('/api/hackathons/:hackathonID/socials')
		.post(hackathons.saveSocial);

	app.route('/api/hackathons/:hackathonID/scheduler')
		.get(hackathons.listScheduler)
		.post(hackathons.createScheduler);

	app.route('/api/hackathons/:hackathonID/scheduler/:schedulerID')
		.get(hackathons.readScheduler)
		.put(hackathons.updateScheduler)
		.delete(hackathons.deleteScheduler);


	// Finish by binding the article middleware	


	app.route('/api/hackathon/picture').post(hackathons.changeThumbnailImage);
	app.route('/api/hackathon/changeheaderimage').post(hackathons.changeHeaderImage);
	app.route('/api/hackathon/logo').post(hackathons.changeLogoImage);

	app.param('hackathonID', hackathons.hackathonByID);


};