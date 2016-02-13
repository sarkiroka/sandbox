require('expectations');
var sinon = require('sinon');
var sandboxedModule = require('sandboxed-module');

describe('the tests', function () {
	var MOCK_VALUE=123;
	var requires = {
		'./untested-function': function (a) {return a==1?MOCK_VALUE:null;},
		'debug': function () {return sinon.stub();}
	};
	sandboxedModule.registerBuiltInSourceTransformer('istanbul');
	var testfile = sandboxedModule.require('../server/tested-function', {
		requires: requires,
		sourceTransformers: require('./fix')
	});

	it('should execute the IF true branch', function () {
		console.log('now testing if true branch');
		var result = testfile('server');
		expect(result).toEqual(MOCK_VALUE);
	});
	it('should execute IF else branch', function () {
		console.log('now testing if else branch');
		var result = testfile('other thing');
		expect(result).toEqual(null);
	});
});
