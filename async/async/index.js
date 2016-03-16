/**
 * @author sarkiroka on 2016.03.13.
 */
var debug = require('debug')('sandbox:async:async');
module.exports = function (initial, tasks, end) {
	debug('run async');
	for (var i = 0; i < tasks.length; i++) {
		(function (tasksi) {
			if (typeof tasksi == 'function') {
				debug('run serial task');
				setImmediate(function () {
					tasksi(initial, function (err, params) {
						debug('serial end %o', params);
					});
				});
			} else if (typeof tasksi == 'object' && typeof tasksi.length == 'number') {
				debug('run parallel tasks (%d)', tasksi.length);
				for (var j = 0; j < tasksi.length; j++) {
					(function (tasksij) {
						debug('run parallel task');
						setImmediate(function () {
							tasksij(initial, function (err, params) {
								debug('parallel end %o', params);
							});
						});
					})(tasksi[j]);
				}
			} else {
				debug('non runnable task');
			}
		})(tasks[i]);
	}
	end(null, initial);
};
