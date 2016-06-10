/**
 * elinditja a http kiszolgálást
 * @author sarkiroka on 2016.06.10.
 */
var http = require('http');
module.exports = function (app) {
	var httpServer = http.Server(app);
	httpServer.listen(2700);
	return httpServer;
};
