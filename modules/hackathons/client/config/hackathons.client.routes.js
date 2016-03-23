(function() {
    'use strict';

    angular
        .module('hackathons.routes')
        .config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('hackathonMain', {
                template: '<ui-view />',
                controller: 'HackathonMainController',
                resolve: {
                    invites: myListInvite
                }
            })
            .state('hackathons', {
                parent: 'hackathonMain',
                abstract: true,
                url: '/hackathons',
                views: {
                    'header@hackathons': {
                        templateUrl: 'modules/hackathons/client/views/header.client.view.html',
                        controller: 'HackathonHeaderController',
                        controllerAs: 'vm'
                    },
                    'footer@hackathons': {
                        templateUrl: 'modules/core/client/views/footer.client.view.html'
                    },
                    'left-menu@hackathons': {
                        templateUrl: 'modules/core/client/views/left-menu.client.view.html'
                    },
                    '': {
                        templateUrl: 'modules/hackathons/client/views/layout.client.view.html'
                    }
                },

            })
            .state('hackathons.list', {
                url: '',
                templateUrl: 'modules/hackathons/client/views/list-hackathons.client.view.html',
                controller: 'HackathonsListController',
                controllerAs: 'vm',
                resolve: {
                    hackathons: listHackathon
                },
                data: {
                    roles: ['user', 'admin'],
                    pageTitle: 'Hackathons List'
                }
            })
            .state('hackathons.create', {
                url: '/create',
                views: {
                    'tab-1@hackathons.create': {
                        templateUrl: 'modules/hackathons/client/views/tabs/tab-1.html',
                        controller: 'HackathonsController',
                        controllerAs: 'hackathonsCtr'
                    },
                    'tab-2@hackathons.create': {
                        templateUrl: 'modules/hackathons/client/views/tabs/tab-2.html',
                        controller: 'HackathonDesignController',
                        controllerAs: 'vm'
                    },
                    'tab-3@hackathons.create': {
                        templateUrl: 'modules/hackathons/client/views/tabs/tab-3.html',
                        controller: 'HackathonSubmissionController',
                        controllerAs: 'vm'
                    },
                    'tab-4@hackathons.create': {
                        templateUrl: 'modules/hackathons/client/views/tabs/tab-4.html',
                        controller: 'HackathonJudgingController',
                        controllerAs: 'vm'
                    },
                    'tab-5@hackathons.create': {
                        templateUrl: 'modules/hackathons/client/views/tabs/tab-5.html',
                        controller: 'HackathonSchedulerController',
                        controllerAs: 'vm',
                        resolve: {
                            listScheduler: function() {
                                return [];
                            }
                        }
                    },
                    'tab-6@hackathons.create': {
                        templateUrl: 'modules/hackathons/client/views/tabs/tab-6.html',
                        controller: 'HackathonMemberController',
                        controllerAs: 'vm',
                        resolve: {
                            members: function() {
                                return [];
                            },
                            invites: function() {
                                return [];
                            }
                        },
                    },
                    '': {
                        templateUrl: 'modules/hackathons/client/views/create-hackathon.client.view.html',
                        controller: 'HackathonsController',
                        controllerAs: 'hackathonsCtr'
                    }
                },
                resolve: {
                    hackathonResolve: function() {
                        return {};
                    }
                },
                data: {
                    roles: ['user', 'admin'],
                    pageTitle: 'Create New Hackathon'
                }
            })
            .state('hackathons.edit', {
                url: '/:hackathonId/edit',
                views: {
                    'tab-1@hackathons.edit': {
                        templateUrl: 'modules/hackathons/client/views/tabs/tab-1.html',
                        controller: 'HackathonsController',
                        controllerAs: 'hackathonsCtr'
                    },
                    'tab-2@hackathons.edit': {
                        templateUrl: 'modules/hackathons/client/views/tabs/tab-2.html',
                        controller: 'HackathonDesignController',
                        controllerAs: 'vm'
                    },
                    'tab-3@hackathons.edit': {
                        templateUrl: 'modules/hackathons/client/views/tabs/tab-3.html',
                        controller: 'HackathonSubmissionController',
                        controllerAs: 'vm'
                    },
                    'tab-4@hackathons.edit': {
                        templateUrl: 'modules/hackathons/client/views/tabs/tab-4.html',
                        controller: 'HackathonJudgingController',
                        controllerAs: 'vm'
                    },
                    'tab-5@hackathons.edit': {
                        templateUrl: 'modules/hackathons/client/views/tabs/tab-5.html',
                        controller: 'HackathonSchedulerController',
                        controllerAs: 'vm',
                        resolve: {
                            listScheduler: listScheduler
                        }
                    },
                    'tab-6@hackathons.edit': {
                        templateUrl: 'modules/hackathons/client/views/tabs/tab-6.html',
                        controller: 'HackathonMemberController',
                        resolve: {
                            members: listMember,
                            invites: listInvite
                        },
                        controllerAs: 'vm'
                    },
                    '': {
                        templateUrl: 'modules/hackathons/client/views/create-hackathon.client.view.html',
                        controller: 'HackathonsController',
                        controllerAs: 'hackathonsCtr'
                    }
                },
                resolve: {
                    hackathonResolve: getHackathon
                },
                data: {
                    roles: ['user', 'admin'],
                    pageTitle: 'Update Hackathon'
                }
            })
            .state('hackathons.view', {
                url: '/:hackathonId',
                templateUrl: 'modules/hackathons/client/views/view-hackathon.client.view.html',
                controller: 'HackathonInfoController',
                controllerAs: 'vm',
                resolve: {
                    hackathonResolve: getHackathon,
                    members: listMember,
                    schedulers: listScheduler
                },
                data: {
                    roles: ['user', 'admin'],
                    pageTitle: 'Hackathons List'
                }
            });
    }

    listHackathon.$inject = ['HackathonsService'];

    function listHackathon(HackathonsService) {
        return HackathonsService.getList();
    }
    getHackathon.$inject = ['$stateParams', 'HackathonsService'];

    function getHackathon($stateParams, HackathonsService) {
        return HackathonsService.getItem($stateParams.hackathonId);
    }

    newHackathon.$inject = ['HackathonsService'];

    function newHackathon(HackathonsService) {
        return HackathonsService.new();
    }

    listScheduler.$inject = ['SchedulerService', 'hackathonResolve'];

    function listScheduler(SchedulerService, hackathonResolve) {
        return SchedulerService.getList(hackathonResolve);
    }

    listMember.$inject = ['HackathonsService', 'hackathonResolve'];

    function listMember(HackathonsService, hackathonResolve) {
        return HackathonsService.getListMember(hackathonResolve);
    }

    listInvite.$inject = ['HackathonsService', 'hackathonResolve'];

    function listInvite(HackathonsService, hackathonResolve) {
        return HackathonsService.getListInvite(hackathonResolve);
    }

    myListInvite.$inject = ['UsersService'];

    function myListInvite(UsersService) {
        return UsersService.getInvite();
    }

})();