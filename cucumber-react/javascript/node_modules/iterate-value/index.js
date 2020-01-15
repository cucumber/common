'use strict';

var getIterator = require('es-get-iterator');
var $TypeError = TypeError;

// eslint-disable-next-line consistent-return
module.exports = function iterateValue(iterable, callback) {
	var iterator = getIterator(iterable);
	if (!iterator) {
		throw new $TypeError('non-iterable value provided');
	}
	if (arguments.length > 1 && typeof callback !== 'function') {
		throw new $TypeError('`callback`, if provided, must be a function');
	}
	var values = callback || [];
	var result;
	while ((result = iterator.next()) && !result.done) {
		if (callback) {
			callback(result.value); // eslint-disable-line callback-return
		} else {
			values.push(result.value);
		}
	}
	if (!callback) {
		return values;
	}
};
