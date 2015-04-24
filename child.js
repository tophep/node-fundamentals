// The code to be executed when parent.js spawns a new process

process.stdin.resume(); 
process.stdin.on('data', function(data) {
	var number; 
	try {
		number = parseInt(data.toString(), 10);
		process.stdout.write(number + "\n"); 
	} 
	catch(err) 
	{
		process.stderr.write(err.message + "\n"); 
	}
});

process.on("SIGUSR2", function(){
	console.log("Child Process Says - Received a SIGUSR2");
	process.exit(0);
})