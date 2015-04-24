// When Moving data from a faster stream (Disk) to a slower stream (Network Connection), buffering too much
// data hogs memory, this is a solution

require('http').createServer( function(req, res) {
	var rs = fs.createReadStream('/path/to/big/file');
	rs.on('data', function(data) { 
		if (!res.write(data)) { //If the WriteStream buffer isn't flushed
			rs.pause(); 		// Pause the read stream
		}			
	});
	
	res.on('drain', function() { 
		rs.resume();
	});

	rs.on('end', function() { 
		res.end();
	});

}).listen(8080);


// The above behavior can be achieved with the following

require('http').createServer( function(req, res) {
	var rs = fs.createReadStream('/path/to/big/file');
	rs.pipe(res);
}).listen(8080);