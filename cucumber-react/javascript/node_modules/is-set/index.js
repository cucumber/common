'use strict';

var $Map = typeof Map === 'function' && Map.prototype ? Map : null;
var $Set = typeof Set === 'function' && Set.prototype ? Set : null;

if (!$Set) {
	// eslint-disable-next-line no-unused-vars
	module.exports = function isSet(x) {
		// `Set` is not present in this environment.
		return false;
	};
	return;
}

var $mapHas = $Map ? Map.prototype.has : null;
var $setHas = $Set ? Set.prototype.has : null;
if (!$setHas) {
	// eslint-disable-next-line no-unused-vars
	module.exports = function isSet(x) {
		// `Set` does not have a `has` method
		return false;
	};
	return;
}

module.exports = function isSet(x) {
	if (!x || typeof x !== 'object') {
		return false;
	}
	try {
		$setHas.call(x);
		if ($mapHas) {
			try {
				$mapHas.call(x);
			} catch (e) {
				return true;
			}
		}
		return x instanceof $Set; // core-js workaround, pre-v2.5.0
	} catch (e) {}
	return false;
};
