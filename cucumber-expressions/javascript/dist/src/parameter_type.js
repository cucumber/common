'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('./errors'),
    CucumberExpressionError = _require.CucumberExpressionError;

var ILLEGAL_PARAMETER_NAME_PATTERN = /([[\]()$.|?*+])/;
var UNESCAPE_PATTERN = function UNESCAPE_PATTERN() {
  return (/(\\([[$.|?*+\]]))/g
  );
};

var ParameterType = function () {
  _createClass(ParameterType, null, [{
    key: 'compare',
    value: function compare(pt1, pt2) {
      if (pt1.preferForRegexpMatch && !pt2.preferForRegexpMatch) return -1;
      if (pt2.preferForRegexpMatch && !pt1.preferForRegexpMatch) return 1;
      return pt1.name.localeCompare(pt2.name);
    }
  }, {
    key: 'checkParameterTypeName',
    value: function checkParameterTypeName(typeName) {
      var unescapedTypeName = typeName.replace(UNESCAPE_PATTERN(), '$2');
      var match = unescapedTypeName.match(ILLEGAL_PARAMETER_NAME_PATTERN);
      if (match) throw new CucumberExpressionError('Illegal character \'' + match[1] + '\' in parameter name {' + unescapedTypeName + '}');
    }

    /**
     * @param name {String} the name of the type
     * @param regexps {Array.<RegExp>,RegExp,Array.<String>,String} that matches the type
     * @param type {Function} the prototype (constructor) of the type. May be null.
     * @param transform {Function} function transforming string to another type. May be null.
     * @param useForSnippets {boolean} true if this should be used for snippets. Defaults to true.
     * @param preferForRegexpMatch {boolean} true if this is a preferential type. Defaults to false.
     */

  }]);

  function ParameterType(name, regexps, type, transform, useForSnippets, preferForRegexpMatch) {
    _classCallCheck(this, ParameterType);

    if (transform === undefined) transform = function transform(s) {
      return s;
    };
    if (useForSnippets === undefined) useForSnippets = true;
    if (preferForRegexpMatch === undefined) preferForRegexpMatch = false;

    if (name) ParameterType.checkParameterTypeName(name);

    this._name = name;
    this._regexps = stringArray(regexps);
    this._type = type;
    this._transform = transform;
    this._useForSnippets = useForSnippets;
    this._preferForRegexpMatch = preferForRegexpMatch;
  }

  _createClass(ParameterType, [{
    key: 'transform',
    value: function transform(thisObj, groupValues) {
      return this._transform.apply(thisObj, groupValues);
    }
  }, {
    key: 'name',
    get: function get() {
      return this._name;
    }
  }, {
    key: 'regexps',
    get: function get() {
      return this._regexps;
    }
  }, {
    key: 'type',
    get: function get() {
      return this._type;
    }
  }, {
    key: 'preferForRegexpMatch',
    get: function get() {
      return this._preferForRegexpMatch;
    }
  }, {
    key: 'useForSnippets',
    get: function get() {
      return this._useForSnippets;
    }
  }]);

  return ParameterType;
}();

function stringArray(regexps) {
  var array = Array.isArray(regexps) ? regexps : [regexps];
  return array.map(function (r) {
    return typeof r === 'string' ? r : regexpSource(r);
  });
}

function regexpSource(regexp) {
  var flags = regexpFlags(regexp);

  var _arr = ['g', 'i', 'm', 'y'];
  for (var _i = 0; _i < _arr.length; _i++) {
    var flag = _arr[_i];
    if (flags.indexOf(flag) !== -1) throw new CucumberExpressionError('ParameterType Regexps can\'t use flag \'' + flag + '\'');
  }
  return regexp.source;
}

// Backport RegExp.flags for Node 4.x
// https://github.com/nodejs/node/issues/8390
//
// For some strange reason this is not needed for
// `./mocha dist/test`, but it is needed for
// `./mocha dist/test/parameter_type_test.js`
function regexpFlags(regexp) {
  var flags = regexp.flags;
  if (flags === undefined) {
    flags = '';
    if (regexp.ignoreCase) flags += 'i';
    if (regexp.global) flags += 'g';
    if (regexp.multiline) flags += 'm';
  }
  return flags;
}

module.exports = ParameterType;