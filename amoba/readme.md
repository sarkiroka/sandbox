# Amőba játék

## v0.4.0 Authenticate

* download
	[angular](https://code.angularjs.org/1.5.6/angular.min.js)
	and copy to `angular.js`


* client.js
	```
	var SFKB=angular.module('sfkb',[]);
	SFKB.controller('amoba', ['$scope', function ($scope) {
		$scope.login = function (name) {
			socket.emit('username', name);
			socket.on('username accepted', function (username) {
				$scope.username = username;
				$scope.$apply();
			});
			socket.on('username declined', function () {
				delete $scope.username;
				$scope.$apply();
			});
		}
	}]);
	```


* server.js
	```
	var sockets = {};
	var users = {};

	//on disconnect
	delete sockets[socket.id];

	//on test
	socket.emit('message', msg + 1);

	//on username received
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
	```


* index.pug
	```
	html(data-ng-app="sfkb")
	...
	script(src="angular.js")
	...
	body(data-ng-controller="amoba")
	...
	input(... data-ng-model="name" ...)
	button(... data-ng-click="login(name)" ...)
	```

---

## v0.3.0 Design

* download
	[bootstrap](https://github.com/twbs/bootstrap/releases/download/v3.3.6/bootstrap-3.3.6-dist.zip)


* unzip bootstrap.min.css from bootstrap.zip to `bootstrap.css`


* style.css
	```css
	html, body {
		background: lightgray;
		height: 100%
	}

	.vertical-center {
		min-height: 100%; /* Fallback for browsers do NOT support vh unit */
		min-height: 100vh; /* These two lines are counted as one :-)       */
		display: flex;
		align-items: center;
	}

	.shadow {
		box-shadow: 5px 7px 4px 4px #aaa;
	}
	```


* index.pug
	```jade
	html
		head
			title Amőba játék
			link(rel="stylesheet", href="bootstrap.css")
			link(rel="stylesheet", href="style.css")
			script(src="io.js")
			script(src="client.js")

		body
			.col-sm-6.col-md-4.col-md-offset-4.vertical-center
				form.panel.panel-info.shadow
					.panel-heading
						.text-center Amőba
					.panel-body
						.input-group
							input.form-control(name="name", type='text', placeholder='Név...', autofocus="")
							span.input-group-btn
								button.btn.btn-primary(type='submit') Belépés
	```


---

## v0.2.0 - Socket

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

## v0.1.0 - Alapok

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
