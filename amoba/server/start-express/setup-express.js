/**
 * az alkalmazásnak megfelelően beállítja a express libet
 * @author sarkiroka on 2016.06.10.
 */
var express = require('express');
var getClientPath = require('./get-client-path');
var path = require('path');
module.exports = function (app, express) {
	var app = express();
	app.set('view engine', 'pug');
	var clientPath = getClientPath();
	app.set('views', path.join(clientPath, 'views'));
	app.use('/static', express.static(path.join(clientPath, 'static')));
	app.get('/', function (req, res) {
		res.render('index')
	});
};
