/**
 * beállítja az express-t és elinditja a http kiszolgálást
 * @author sarkiroka on 2016.06.09.
 */
var express = require('express');
var setupExpress = require('./setup-express');
var startServer = require('./start-server');
module.exports = function () {
	var app = express();
	setupExpress(app, express);
	var server = startServer(app);
	return server;
};
