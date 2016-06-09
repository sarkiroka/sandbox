/**
 * beállítja az express-t és elinditja a http kiszolgálást
 * @author sarkiroka on 2016.06.09.
 */
var express = require('express');
var http = require('http');
module.exports = function () {
	var app = express();
	app.set('view engine', 'pug');
	app.set('views', __dirname + '/../client/views');
	app.use('/static', express.static(__dirname + '/../client/static'));
	app.get('/', function (req, res) {
		res.render('index')
	});
	var httpServer = http.Server(app);
	httpServer.listen(2700);
	return httpServer;
};
