/**
 * beállítja az express-t és elinditja a http kiszolgálást
 * @author sarkiroka on 2016.06.09.
 */
var setupExpress = require('./setup-express');
var startHttpServer = require('./start-http-server');
module.exports = function () {
	var app = setupExpress(express);
	var server = startHttpServer(app);
	return server;
};
