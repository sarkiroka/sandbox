/**
 * megadja a "client" mappa helyét
 * @author sarkiroka on 2016.06.10.
 */
var path = require('path');
module.exports = function () {
	var retValue = path.normalize(path.join(__dirname, '..', '..', 'client'));
	return retValue;
};
