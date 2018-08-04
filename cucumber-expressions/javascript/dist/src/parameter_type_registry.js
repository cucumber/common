'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ParameterType = require('./parameter_type');
var CucumberExpressionGenerator = require('./cucumber_expression_generator.js');

var _require = require('./errors'),
    CucumberExpressionError = _require.CucumberExpressionError,
    AmbiguousParameterTypeError = _require.AmbiguousParameterTypeError;

var INTEGER_REGEXPS = [/-?\d+/, /\d+/];
var FLOAT_REGEXP = /-?\d*\.\d+/;
var WORD_REGEXP = /\w+/;
var STRING_REGEXP = /"([^"\\]*(\\.[^"\\]*)*)"|'([^'\\]*(\\.[^'\\]*)*)'/;

var ParameterTypeRegistry = function () {
  function ParameterTypeRegistry() {
    _classCallCheck(this, ParameterTypeRegistry);

    this._parameterTypeByName = new Map();
    this._parameterTypesByRegexp = new Map();

    this.defineParameterType(new ParameterType('int', INTEGER_REGEXPS, Number, function (s) {
      return s && parseInt(s);
    }, true, true));
    this.defineParameterType(new ParameterType('float', FLOAT_REGEXP, Number, function (s) {
      return s && parseFloat(s);
    }, true, false));
    this.defineParameterType(new ParameterType('word', WORD_REGEXP, String, function (s) {
      return s;
    }, false, false));
    this.defineParameterType(new ParameterType('string', STRING_REGEXP, String, function (s) {
      return s.replace(/\\"/g, '"').replace(/\\'/g, "'");
    }, true, false));
  }

  _createClass(ParameterTypeRegistry, [{
    key: 'lookupByTypeName',
    value: function lookupByTypeName(typeName) {
      return this._parameterTypeByName.get(typeName);
    }
  }, {
    key: 'lookupByRegexp',
    value: function lookupByRegexp(parameterTypeRegexp, expressionRegexp, text) {
      var parameterTypes = this._parameterTypesByRegexp.get(parameterTypeRegexp);
      if (!parameterTypes) return null;
      if (parameterTypes.length > 1 && !parameterTypes[0].preferForRegexpMatch) {
        // We don't do this check on insertion because we only want to restrict
        // ambiguiuty when we look up by Regexp. Users of CucumberExpression should
        // not be restricted.
        var generatedExpressions = new CucumberExpressionGenerator(this).generateExpressions(text);
        throw new AmbiguousParameterTypeError.forRegExp(parameterTypeRegexp, expressionRegexp, parameterTypes, generatedExpressions);
      }
      return parameterTypes[0];
    }
  }, {
    key: 'defineParameterType',
    value: function defineParameterType(parameterType) {
      if (parameterType.name) {
        if (this._parameterTypeByName.has(parameterType.name)) throw new Error('There is already a parameter type with name ' + parameterType.name);
        this._parameterTypeByName.set(parameterType.name, parameterType);
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = parameterType.regexps[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var parameterTypeRegexp = _step.value;

          if (!this._parameterTypesByRegexp.has(parameterTypeRegexp)) {
            this._parameterTypesByRegexp.set(parameterTypeRegexp, []);
          }
          var parameterTypes = this._parameterTypesByRegexp.get(parameterTypeRegexp);
          var existingParameterType = parameterTypes[0];
          if (parameterTypes.length > 0 && existingParameterType.preferForRegexpMatch && parameterType.preferForRegexpMatch) {
            throw new CucumberExpressionError('There can only be one preferential parameter type per regexp. ' + ('The regexp /' + parameterTypeRegexp + '/ is used for two preferential parameter types, {' + existingParameterType.name + '} and {' + parameterType.name + '}'));
          }
          if (parameterTypes.indexOf(parameterType) === -1) {
            parameterTypes.push(parameterType);
            this._parameterTypesByRegexp.set(parameterTypeRegexp, parameterTypes.sort(ParameterType.compare));
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: 'parameterTypes',
    get: function get() {
      return this._parameterTypeByName.values();
    }
  }]);

  return ParameterTypeRegistry;
}();

module.exports = ParameterTypeRegistry;