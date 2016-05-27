# Amőba játék

## v0.2.0

* command line
	```DOS
	npm i socket.io --save
	```


* download
	[socket.io.js](https://cdn.socket.io/socket.io-1.4.5.js)


* index.pug
	```
	script(src="io.js")
	```


* server.js
	```
	var http = require('http').Server(app);
	var io = require('socket.io')(http);
	```
	```
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
	```


* client.js
	```
	var socket = io();
	var x = 42;
	setInterval(function () {
		socket.emit('test', x);
	}, 1000);
	socket.on('message', function (msg) {
		x = msg;
		console.log(msg);
	});
	```

---

## v0.1.0

* server.js
	```javascript
	var express = require('express');
	var app = express();
	app.set('view engine', 'pug');
	app.set('views', __dirname);
	app.use(express.static(__dirname));
	app.get('/', function (req, res) {
		res.render('index')
	});
	app.listen(2700);
	```


* command line
	```DOS
	for npm init

	npm i express --save

	npm i pug --save
	```


* index.pug
	```jade
	html
		head
			title Amőba játék
			script(src="client.js")

		body
			h1 Amőba játék

	```


* client.js
	```javascript
	alert(1);
	```
