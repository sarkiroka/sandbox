var startExpress = require('./start-express/index');
var setupIo = require('./setup-io');
var onDisconnect = require('./on-disconnect');

var httpServer = startExpress();
var io = setupIo(httpServer);

var sockets = {};
var users = {};
var roomCount = 0;
var games = {};
io.on('connection', function (socket) {
	socket.on('disconnect', onDisconnect(socket,users,sockets));
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
				var hasCounter = namePartsRegex.test(msg);
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
		var thisUser = sockets[socket.id].username;
		var thatUser = user;
		var roomName = 'room_' + roomCount;
		roomCount++;
		socket.join(roomName);
		users[thatUser].socket.join(roomName);
		var table = [];
		for (var i = 0; i < 10; i++) {
			table.push([]);
			for (var j = 0; j < 10; j++) {
				table[i].push(' ');
			}
		}
		games[roomName] = {table: table, users: [thisUser, thatUser], room: roomName, step: 0};
		io.sockets.in(roomName).emit('game', games[roomName]);
	});
	socket.on('put', function (msg) {
		var room = msg.room;
		if (games[room] && games[room].table[msg.y][msg.x] == ' ') {
			var sign = games[room].step % 2 ? 'X' : 'O';
			games[room].table[msg.y][msg.x] = sign;
			games[room].step++;
			io.sockets.in(room).emit('game', games[room]);
		}
	});
});
