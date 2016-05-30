var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.set('view engine', 'pug');
app.set('views', __dirname);
app.use(express.static(__dirname));
app.get('/', function (req, res) {
	res.render('index')
});
var sockets = {};
var users = {};
io.on('connection', function (socket) {
	console.log('a user connected');
	socket.on('disconnect', function () {
		console.log('user disconnected');
		delete sockets[socket.id];
	});
	socket.on('test', function (msg) {
		socket.emit('message', msg + 1);
	});
	socket.on('username', function (msg) {
		var validRegex = /^[a-zíéáűőúöüóÍÉÁŰŐÚÖÜÓ]+(?:-\d+)?/i;
		if (validRegex.test(msg)) {
			if (!users[msg]) {
				sockets[socket.id] = {username: msg};
				users[msg] = {socket: socket.id};
				socket.emit('username accepted', msg);
			} else {
				var namePartsRegex = /^(.+)-(\d+)$/;
				var baseName = msg;
				var counter = 0;
				var hasCounter = namePartsRegex.test(msg)
				if (hasCounter) {
					var matches = msg.match(namePartsRegex);
					baseName = matches[1];
					counter = parseInt(matches[2], 10);
				}
				do {
					counter++;
					var newName = baseName + '-' + counter;
				} while (users[newName]);
				sockets[socket.id] = {username: newName};
				users[newName] = {socket: socket.id};
				socket.emit('username accepted', newName);
			}
		} else {
			socket.emit('username declined');
		}
	});
});
http.listen(2700);
