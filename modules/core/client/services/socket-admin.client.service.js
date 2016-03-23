'use strict';

angular.module('core').service('SocketAdmin', ['Authentication', '$state', '$timeout',

    function(Authentication, $state, $timeout) {
        this.connect = function() {
            // Connect only when authenticated
            if (Authentication.user && Authentication.user.isAdmin) {
                this.socket = io();
                this.socket.emit('join-admin');
            }
        };

        this.connect();

        this.on = function(eventName, callback) {
            if (this.socket) {
                this.socket.on(eventName, function(data) {
                    $timeout(function() {
                        callback(data);
                    });
                });
            }
        };


        this.emit = function(eventName, data) {
            if (this.socket) {
                this.socket.emit(eventName, data);
            }
        };


        this.removeListener = function(eventName) {
            if (this.socket) {
                this.socket.removeListener(eventName);
            }
        };
    }
]);