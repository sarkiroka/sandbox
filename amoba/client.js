var socket = io();
var x = 42;
setInterval(function () {
	socket.emit('test', x);
}, 1000);
socket.on('message', function (msg) {
	x = msg;
	console.log(msg);
});
