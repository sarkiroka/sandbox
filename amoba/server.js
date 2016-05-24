var express = require('express');
var app = express();
app.set('view engine', 'pug');
app.set('views', __dirname);
app.use(express.static(__dirname));
app.get('/', function (req, res) {
	res.render('index')
});
app.listen(2700);
