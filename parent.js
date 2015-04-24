// Demonstrates the basics of Spawning Processes and Inter-Process Communication

var spawn = require('child_process').spawn;
var child = spawn('node', ['child.js']);
var count = 0;


function writeToChild()
{
	if (count == 3){
		child.kill("SIGUSR2");
		child.stdout.once('data', function(data){	//Listen for child output one time
			console.log('child replied to SIGUSR2 with: ' + data);
		});
	}
	else {
		var number = Math.floor(Math.random() * 10000); // Random number 
		child.stdin.write(number + "\n"); //Send number to child 	
		child.stdout.once('data', function(data){	//Listen for child output one time
			console.log('child replied to ' + number + ' with: ' + data);
		});
		count++;	
	}
}

// Parent process writes to child process once a second 
setInterval(writeToChild, 1000);

child.stderr.on('data', function(data) {
	process.stdout.write(data);
});

child.on('exit', function(code) {
	console.log('child process terminated with code ' + code);
	process.exit(0);
});