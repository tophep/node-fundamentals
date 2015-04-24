// Command-line program that demonstrates the basics of events and event-listeners with callbacks

var util = require('util'),
EventEmitter = require('events').EventEmitter,
Ticker = function() { 
	var self = this; //Preserve Ticker in setInterval callback scope
	setInterval(function(){self.emit("tick");}, 1000); //Emit a tick every second
};

util.inherits(Ticker, EventEmitter); //Add EventEmitter to Ticker prototype chain (inheritance)

var numSecs = 0;

function print(){
	numSecs++;
	process.stdout.clearLine(); 
    process.stdout.cursorTo(0);
	process.stdout.write(numSecs.toString());
}; //Prints the number of ticks to the console

var ticker = new Ticker(); //Starts ticking
ticker.on("tick", print); //Add listener for "tick" event