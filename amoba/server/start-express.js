/**
 * beállítja az express-t és elinditja a http kiszolgálást
 * @author sarkiroka on 2016.06.09.
 */
var getClientPath = require('./get-client-path');
var express = require('express');
var http = require('http');
var path = require('path');
module.exports = function () {
	var app = express();
	app.set('view engine', 'pug');
	var clientPath = getClientPath();
	app.set('views', path.join(clientPath, 'views'));
	app.use('/static', express.static(path.join(clientPath, 'static')));
	app.get('/', function (req, res) {
		res.render('index')
	});
	var httpServer = http.Server(app);
	httpServer.listen(2700);
	return httpServer;
};
