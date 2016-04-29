/**
 * @author sarkiroka
 */
module.exports = function (control, data) {
	var start = 0;
	var retValue = [];
	for (var i = 0, iMax = control.length, isChanged = false; i < iMax; i++, isChanged = control[i] != control[i - 1]) {
		if (isChanged) {
			retValue = retValue.concat(data.slice(start, i).reverse());
			start = i;
		}
	}
	retValue = retValue.concat(data.slice(start, control.length).reverse());
	return retValue;
};
