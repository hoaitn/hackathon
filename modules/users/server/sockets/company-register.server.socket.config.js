'use strict';

// Create the chat configuration
module.exports = function(io, socket) {
	//var nsp = io.of('/admin');
	// Emit the status event when a new socket client is connected
	socket.on('join-admin', function() {
		socket.join('admin');
	});

	io.to('admin').on('newCompany', function(company) {
		io.to('admin').emit('newCompany', company);
	});

	/*io.sockets.in(room).emit('message', 'what is going on, party people?');
	io.sockets.in('admin').emit('message', 'what is going on, party people?');
	// Send a chat messages to all connected sockets when a message is received
	socket.on('newCompany', function(company) {
		io.emit('newCompany', company);
	});*/

};