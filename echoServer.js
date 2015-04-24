//Basic TCP Echo server

require('net').createServer(function(socket) { 
	socket.pipe(socket);
}).listen(4001);