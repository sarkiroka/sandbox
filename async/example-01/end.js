/**
 * @author sarkiroka on 2016.03.13.
 */
var debug = require('debug')('sandbox:async:example-01:end');
module.exports = function (params, callback) {
	debug('add 4');
	params.result.sum += 4;
	callback(null, params);
};
