var otherModule = require('./untested-function');
var neverTestedModule = require('./never-tested');
var debug = require('debug')('asd:f');
module.exports = function (str) {
	var retValue = null;
	console.log('incoming parameter is "' + str + '", now otherModule source is', otherModule.toString());
	if (('' + str).indexOf('server') == 0) {
		console.log('normal run');
		var x = neverTestedModule('test');
		debug('normal run %s', x);
		retValue = otherModule(1);
	} else {
		console.log('test case');
	}
	console.log('the return value is', retValue);
	return retValue;
};
