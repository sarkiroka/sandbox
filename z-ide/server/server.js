/**
 * @author sarkiroka on 2016.03.18.
 */
var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.normalize(path.join(__dirname, '..', 'client'))));
app.use('*', function (req, res, next) {
	res.redirect('/z-ide.html');
});
app.listen(3030);
