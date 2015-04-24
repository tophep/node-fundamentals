// Run this app and navigate your web browser to localhost:8080
// You should see a copy of www.google.com
// Type the name of a website on the console to change which site shows up

var http = require('http'),
	site = "www.google.com";

process.stdin.resume();

process.stdin.on("data", function(data){
	site = data.toString().replace(/\r?\n|\r/g, "");
	console.log("Site Changed to", site);
});

http.createServer(function(request, response){
	var options = {
		host: site, port: 80,
		path: "/"
	};

	var siteReq = http.get(options, function(sitedata) {
		response.writeHead(200, {"Content-Type" : "text/html"});
		sitedata.pipe(response);
	});

}).listen(8080);
