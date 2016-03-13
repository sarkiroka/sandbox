/**
 * @author sarkiroka on 2016.03.13.
 */
var debug = require('debug')('sandbox:async:example-01:parallel');
module.exports = function (params, callback) {
	setTimeout(function () {
		debug('add 10');
		params.result.sum += 10;
		callback(null, params);
	}, 500);
};
