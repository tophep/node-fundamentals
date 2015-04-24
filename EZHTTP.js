// Behold the power and beauty of Node.js
// What other language/framework lets you create an HTTP server
// in 4 lines of code using only the default modules

require("http").createServer(function (request, response) {
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end("HELLO WORLD");
}).listen(8080);


