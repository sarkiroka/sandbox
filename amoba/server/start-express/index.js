/**
 * beállítja az express-t és elinditja a http kiszolgálást
 * @author sarkiroka on 2016.06.09.
 */
var express = require('express');
var http = require('http');
var setupExpress = require('./setup-express');
module.exports = function () {
	var app = express();
	setupExpress(app, express);
	var httpServer = http.Server(app);
	httpServer.listen(2700);
	return httpServer;
};
