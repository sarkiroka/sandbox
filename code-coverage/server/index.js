var app = require('express')();
var f = require('./tested-function');
console.log(f('server'));
app.listen(3000);
app.get('/', function (req, res, next) {
	res.send('ok');
});
module.exports = app;
