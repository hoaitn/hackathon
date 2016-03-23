'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
    function ($scope, Authentication) {
        // This provides Authentication context.
        $scope.authentication = Authentication;

        $scope.boxItems = [{
            id: 1,
            img: 'http://lorempixel.com/400/200/technics/1/',
            time: '24 May 2016',
            location: 'Sydney Australia',
            other: 'Harvard University',
            feature : 0
        }, {
            id: 2,
            img: 'http://lorempixel.com/400/200/technics/2/',
            time: '24 May 2016',
            location: 'Sydney Australia',
            other: 'Harvard University',
            feature : 0
        }, {
            id: 3,
            img: 'http://lorempixel.com/400/200/technics/3/',
            time: '24 May 2016',
            location: 'Sydney Australia',
            other: 'Harvard University',
            feature : 0
        }, {
            id: 4,
            img: 'http://lorempixel.com/400/200/technics/6/',
            time: '24 May 2016',
            location: 'Sydney Australia',
            other: 'Harvard University',
            feature : 0
        }, {
            id: 5,
            img: 'http://lorempixel.com/400/200/technics/9/',
            time: '24 May 2016',
            location: 'Sydney Australia',
            other: 'Harvard University',
            feature : 1
        }, {
            id: 6,
            img: 'http://lorempixel.com/400/200/technics/8/',
            time: '24 May 2016',
            location: 'Sydney Australia',
            other: 'Harvard University',
            feature : 1
        }, {
            id: 7,
            img: 'http://lorempixel.com/400/200/technics/4/',
            time: '24 May 2016',
            location: 'Sydney Australia',
            other: 'Harvard University'
        }, {
            id: 8,
            img: 'http://lorempixel.com/400/200/technics/2/',
            time: '24 May 2016',
            location: 'Sydney Australia',
            other: 'Harvard University',
            feature : 0
        }, {
            id: 9,
            img: 'http://lorempixel.com/400/200/technics/5/',
            time: '24 May 2016',
            location: 'Sydney Australia',
            other: 'Harvard University',
            feature : 1
        }, {
            id: 10,
            img: 'http://lorempixel.com/400/200/technics/6/',
            time: '24 May 2016',
            location: 'Sydney Australia',
            other: 'Harvard University',
            feature : 1
        }, {
            id: 11,
            img: 'http://lorempixel.com/400/200/technics/7/',
            time: '24 May 2016',
            location: 'Sydney Australia',
            other: 'Harvard University',
            feature : 1
        },{
            id: 2,
            img: 'http://lorempixel.com/400/200/technics/2/',
            time: '24 May 2016',
            location: 'Sydney Australia',
            other: 'Harvard University',
            feature : 0
        }, {
            id: 3,
            img: 'http://lorempixel.com/400/200/technics/3/',
            time: '24 May 2016',
            location: 'Sydney Australia',
            other: 'Harvard University',
            feature : 0
        }, {
            id: 4,
            img: 'http://lorempixel.com/400/200/technics/6/',
            time: '24 May 2016',
            location: 'Sydney Australia',
            other: 'Harvard University',
            feature : 0
        }, {
            id: 5,
            img: 'http://lorempixel.com/400/200/technics/9/',
            time: '24 May 2016',
            location: 'Sydney Australia',
            other: 'Harvard University',
            feature : 1
        }, {
            id: 6,
            img: 'http://lorempixel.com/400/200/technics/8/',
            time: '24 May 2016',
            location: 'Sydney Australia',
            other: 'Harvard University',
            feature : 1
        }, {
            id: 7,
            img: 'http://lorempixel.com/400/200/technics/4/',
            time: '24 May 2016',
            location: 'Sydney Australia',
            other: 'Harvard University'
        }, {
            id: 8,
            img: 'http://lorempixel.com/400/200/technics/2/',
            time: '24 May 2016',
            location: 'Sydney Australia',
            other: 'Harvard University',
            feature : 0
        }, {
            id: 8,
            img: 'http://lorempixel.com/400/200/technics/2/',
            time: '24 May 2016',
            location: 'Sydney Australia',
            other: 'Harvard University',
            feature : 0
        },{
            id: 9,
            img: 'http://lorempixel.com/400/200/technics/5/',
            time: '24 May 2016',
            location: 'Sydney Australia',
            other: 'Harvard University',
            feature : 1
        },{
            id: 8,
            img: 'http://lorempixel.com/400/200/technics/2/',
            time: '24 May 2016',
            location: 'Sydney Australia',
            other: 'Harvard University',
            feature : 1
        }];
    }
]);