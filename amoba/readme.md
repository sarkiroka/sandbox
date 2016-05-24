# Amőba játék

## v0.0.1

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

