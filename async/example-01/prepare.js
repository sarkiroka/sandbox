/**
 * @author sarkiroka on 2016.03.13.
 */
var debug = require('debug')('sandbox:async:example-01:prepare');
module.exports = function (params, callback) {
	debug('set 1000');
	params.result.sum = 1000;
	callback(null, params);
};
