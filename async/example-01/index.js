/**
 * @author sarkiroka on 2016.03.13.
 */
var prepare = require('./prepare');
var parallel1 = require('./parallel');
var parallel2 = require('./parallel');
var end = require('./end');
var async = require('../async');
var debug = require('debug')('sandbox:async:example-01:index');
module.exports = function () {
	debug('start');
	async(
		{result: {}},
		[prepare,
			[parallel1, parallel2],
			end],
		function (err, allresult) {
			debug('all ended');
			console.log(allresult.result);
		}
	);
};
