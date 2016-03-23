(function() {
    'use strict';

    angular.module('hackathons.services')
        .factory('HackathonsService', HackathonsService);
    HackathonsService.$inject = ['$resource', 'Restangular'];

    function HackathonsService($resource, Restangular) {
        var hackathons = Restangular.all('hackathons');

        var sv = {};
        sv.new = function() {
            return Restangular.restangularizeElement(null, {}, 'hackathons');
        };

        sv.getList = function() {
            return hackathons.getList();
        };

        sv.getItem = function(hackathonId) {
            return hackathons.one(hackathonId).get();
        };

        sv.update = function(hackathon) {
            return hackathon.put();
        };

        sv.save = function(data) {

            return hackathons.post(data);

        };

        sv.addMember = function(item, member) {
            return item.all('members').post(member);
        };

        sv.saveSubmission = function(item, submissions) {
            return item.all('submissions').post(submissions);
        };

        sv.saveSocial = function(item, socials) {
            return item.all('socials').post(socials);
        };

        sv.getListMember = function(item) {
            return item.all('members').getList();
        };
        sv.getListInvite = function(item) {
            return item.all('members/invite').getList();
        };
        sv.removeMember = function(hackathon, member) {
            return hackathon.all('members').one(member._id).remove();
        };

        sv.accept = function(hackathon) {
            return hackathons.one(hackathon._id, 'members').one('invite').post();
        };

        sv.denied = function(hackathon) {
            return hackathons.one(hackathon._id, 'members').one('invite').remove();
        };
        return sv;
    }
})();