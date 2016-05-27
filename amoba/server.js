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
io.on('connection', function (socket) {
	console.log('a user connected');
	socket.on('disconnect', function () {
		console.log('user disconnected');
	});
	socket.on('test', function (msg) {
		io.emit('message', msg + 1);
	});
});
http.listen(2700);
