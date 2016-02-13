module.exports = function (source) {
	var coverageVariable,
		istanbulCoverageMayBeRunning = false,
		fromNodeModules = false;

	Object.keys(global).forEach(function (name) {
		if ((name.indexOf("$$cov_") === 0 || name === '__coverage__') && global[name]) {
			istanbulCoverageMayBeRunning = true;
			coverageVariable = name;
		}
	});

	if (this.filename.match(/node_modules/)) {
		fromNodeModules = true;
	}

	if (istanbulCoverageMayBeRunning && !fromNodeModules) {
		try {
			var istanbul = require('istanbul'),
				instrumenter = new istanbul.Instrumenter({coverageVariable: coverageVariable}),
				instrumentMethod = instrumenter.instrumentSync.bind(instrumenter);
			source = instrumentMethod(source, this.filename);
		} catch (e) {
		}
	}
	return source;
};
