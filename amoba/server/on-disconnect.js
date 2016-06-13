/**
 * @author sarkiroka on 2016.06.10.
 */
module.exports = function (socket, users, sockets) {
	return function () {
		var user = sockets[socket.id];
		delete sockets[socket.id];
		if (user) {
			delete users[user.username];
		}
		socket.broadcast.emit('userlist', Object.keys(users));
	}
};
