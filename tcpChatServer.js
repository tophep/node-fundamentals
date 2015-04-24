var net = require('net');
var server = net.createServer();
var sockets = [],
	port 	= 4000;

server.on('listening', function () {
	console.log("Server Listening On Port", port)
});

server.on('connection', function(socket) { 
	console.log('New Connection!');
	sockets.push(socket);
	socket.write("Enter a Username:");

	socket.once('data', function(data) {
		socket.username = data.toString().replace(/\r?\n|\r/g, "");
		socket.write("Welcome " + socket.username + "\n");
		var hi = socket.username + " has joined!\n";
		console.log(hi);

		sockets.forEach(function(otherSocket) { 
			if (otherSocket !== socket) {
				otherSocket.write(hi); 
			}
		});

		socket.on('data', function(data) { 
			if (data.toString().replace(/\r?\n|\r/g, "").trim()){
				var message = socket.username + ": " + data.toString();
				console.log(message);

				sockets.forEach(function(otherSocket) { 
					if (otherSocket !== socket) {
						otherSocket.write(message); 
					}
				});
			}
		});
	});

	
	socket.on('close', function() { 
		var bye = socket.username + " has left!\n";
		console.log(bye); 
		var index = sockets.indexOf(socket); 
		sockets.splice(index, 1);
		sockets.forEach(function(otherSocket){
			otherSocket.write(bye);
		})
	});
});

server.on('error', function(err) { 
	console.log('Server error:', err.message);
});

server.on('close', function() { 
	console.log('Server closed');
}); 

server.listen(port);