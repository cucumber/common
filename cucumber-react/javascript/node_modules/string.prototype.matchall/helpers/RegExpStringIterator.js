'use strict';

var define = require('define-properties');
var AdvanceStringIndex = require('es-abstract/2019/AdvanceStringIndex');
var CreateIterResultObject = require('es-abstract/2019/CreateIterResultObject');
var Get = require('es-abstract/2019/Get');
var GetIntrinsic = require('es-abstract/GetIntrinsic');
var ObjectCreate = require('es-abstract/2019/ObjectCreate');
var RegExpExec = require('es-abstract/2019/RegExpExec');
var Set = require('es-abstract/2019/Set');
var ToLength = require('es-abstract/2019/ToLength');
var ToString = require('es-abstract/2019/ToString');
var Type = require('es-abstract/2019/Type');
var hasSymbols = require('has-symbols')();

var hidden = require('./hidden')();
var undefined;

var RegExpStringIterator = function RegExpStringIterator(R, S, global, fullUnicode) {
	if (Type(S) !== 'String') {
		throw new TypeError('S must be a string');
	}
	if (Type(global) !== 'Boolean') {
		throw new TypeError('global must be a boolean');
	}
	if (Type(fullUnicode) !== 'Boolean') {
		throw new TypeError('fullUnicode must be a boolean');
	}
	hidden.set(this, '[[IteratingRegExp]]', R);
	hidden.set(this, '[[IteratedString]]', S);
	hidden.set(this, '[[Global]]', global);
	hidden.set(this, '[[Unicode]]', fullUnicode);
	hidden.set(this, '[[Done]]', false);
};

var IteratorPrototype = GetIntrinsic('%IteratorPrototype%', true);
if (IteratorPrototype) {
	RegExpStringIterator.prototype = ObjectCreate(IteratorPrototype);
}

define(RegExpStringIterator.prototype, {
	next: function next() {
		var O = this;
		if (Type(O) !== 'Object') {
			throw new TypeError('receiver must be an object');
		}
		if (
			!(O instanceof RegExpStringIterator)
			|| !hidden.has(O, '[[IteratingRegExp]]')
			|| !hidden.has(O, '[[IteratedString]]')
			|| !hidden.has(O, '[[Global]]')
			|| !hidden.has(O, '[[Unicode]]')
			|| !hidden.has(O, '[[Done]]')
		) {
			throw new TypeError('"this" value must be a RegExpStringIterator instance');
		}
		if (hidden.get(O, '[[Done]]')) {
			return CreateIterResultObject(undefined, true);
		}
		var R = hidden.get(O, '[[IteratingRegExp]]');
		var S = hidden.get(O, '[[IteratedString]]');
		var global = hidden.get(O, '[[Global]]');
		var fullUnicode = hidden.get(O, '[[Unicode]]');
		var match = RegExpExec(R, S);
		if (match === null) {
			hidden.set(O, '[[Done]]', true);
			return CreateIterResultObject(undefined, true);
		}
		if (global) {
			var matchStr = ToString(Get(match, '0'));
			if (matchStr === '') {
				var thisIndex = ToLength(Get(R, 'lastIndex'));
				var nextIndex = AdvanceStringIndex(S, thisIndex, fullUnicode);
				Set(R, 'lastIndex', nextIndex, true);
			}
			return CreateIterResultObject(match, false);
		}
		hidden.set(O, '[[Done]]', true);
		return CreateIterResultObject(match, false);
	}
});
if (hasSymbols) {
	var defineP = Object.defineProperty;
	if (Symbol.toStringTag) {
		if (defineP) {
			defineP(RegExpStringIterator.prototype, Symbol.toStringTag, {
				configurable: true,
				enumerable: false,
				value: 'RegExp String Iterator',
				writable: false
			});
		} else {
			RegExpStringIterator.prototype[Symbol.toStringTag] = 'RegExp String Iterator';
		}
	}

	if (!IteratorPrototype && Symbol.iterator) {
		var func = {};
		func[Symbol.iterator] = RegExpStringIterator.prototype[Symbol.iterator] || function SymbolIterator() {
			return this;
		};
		var predicate = {};
		predicate[Symbol.iterator] = function () {
			return RegExpStringIterator.prototype[Symbol.iterator] !== func[Symbol.iterator];
		};
		define(RegExpStringIterator.prototype, func, predicate);
	}
}

module.exports = RegExpStringIterator;
