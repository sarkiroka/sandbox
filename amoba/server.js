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
var roomCount=0;
io.on('connection', function (socket) {
	socket.on('disconnect', function () {
		var user = sockets[socket.id];
		delete sockets[socket.id];
		if (user) {
			delete users[user.username];
		}
		socket.broadcast.emit('userlist', Object.keys(users));
	});
	socket.on('username', function (msg) {
		var validRegex = /^[a-zíéáűőúöüóÍÉÁŰŐÚÖÜÓ]+(?:-\d+)?/i;
		if (validRegex.test(msg)) {
			if (!users[msg]) {
				sockets[socket.id] = {username: msg};
				users[msg] = {socket: socket};
				socket.emit('username accepted', msg);
				io.sockets.emit('userlist', Object.keys(users));
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
				users[newName] = {socket: socket};
				socket.emit('username accepted', newName);
				io.sockets.emit('userlist', Object.keys(users));
			}
		} else {
			socket.emit('username declined');
		}
	});
	socket.on('challenge', function (user) {
		if (users[user]) {
			users[user].socket.emit('challenge', sockets[socket.id].username);
		}
	});
	socket.on('challenge accepted', function (user) {
		var thisUser = users[socket.id];
		var thatUser = user;
		var roomName = 'room_'+roomCount;
		roomCount++;
		socket.join(roomName);
		users[thatUser].socket.join(roomName);
		io.sockets.in(roomName).emit('game','started');
	});
});
http.listen(2700);
