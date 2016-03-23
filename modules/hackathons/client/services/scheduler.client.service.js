'use strict';

angular.module('hackathons').factory('SchedulerService', [
    function() {
        // Scheduler service logic
        var prefix = 'scheduler';

        // Public API
        return {
            create: function(hackathon, scheduler) {
                return hackathon.all(prefix).post(scheduler);
            },
            getList: function(hackathon) {
                return hackathon.all(prefix).getList();
            },
            remove: function(hackathon, scheduler) {
                return hackathon.all(prefix).one(scheduler._id).remove();
            }
        };
    }
]);