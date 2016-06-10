/**
 * beállítja a route szabályokat
 * @author sarkiroka on 2016.06.10.
 */
module.exports = function (app) {
	app.get('/', function (req, res) {
		res.render('index')
	});
};
