/**
 * @author sarkiroka on 2016.03.13.
 */
var debug = require('debug')('sandbox:async:async');
module.exports = function (initial, tasks, end) {
	debug('run async');
	for (var i = 0; i < tasks.length; i++) {
		if (typeof tasks[i] == 'function') {
			debug('run serial task');
			tasks[i](initial, function () {
			});
		} else if (typeof tasks[i] == 'object' && typeof tasks[i].length == 'number') {
			debug('run parallel tasks (%d)',tasks[i].length);
			for (var j = 0; j < tasks[i].length; j++) {
				debug('run parallel task');
				tasks[i][j](initial, function () {
				});
			}
		}else{
			debug('non runnable task');
		}
	}
	end(null, initial)
};
