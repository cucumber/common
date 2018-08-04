'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Argument = require('./argument');
var TreeRegexp = require('./tree_regexp');
var ParameterType = require('./parameter_type');

var _require = require('./errors'),
    UndefinedParameterTypeError = _require.UndefinedParameterTypeError,
    CucumberExpressionError = _require.CucumberExpressionError;

// RegExps with the g flag are stateful in JavaScript. In order to be able
// to reuse them we have to wrap them in a function.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test

// Does not include (){} characters because they have special meaning


var ESCAPE_REGEXP = function ESCAPE_REGEXP() {
  return (/([\\^[$.|?*+])/g
  );
};
var PARAMETER_REGEXP = function PARAMETER_REGEXP() {
  return (/(\\\\)?{([^}]+)}/g
  );
};
var OPTIONAL_REGEXP = function OPTIONAL_REGEXP() {
  return (/(\\\\)?\(([^)]+)\)/g
  );
};
var ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP = function ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP() {
  return (/([^\s^/]+)((\/[^\s^/]+)+)/g
  );
};
var DOUBLE_ESCAPE = '\\\\';
var PARAMETER_TYPES_CANNOT_BE_ALTERNATIVE = 'Parameter types cannot be alternative: ';
var PARAMETER_TYPES_CANNOT_BE_OPTIONAL = 'Parameter types cannot be optional: ';

var CucumberExpression = function () {
  /**
   * @param expression
   * @param parameterTypeRegistry
   */
  function CucumberExpression(expression, parameterTypeRegistry) {
    _classCallCheck(this, CucumberExpression);

    this._expression = expression;
    this._parameterTypes = [];

    expression = this.processEscapes(expression);
    expression = this.processOptional(expression);
    expression = this.processAlternation(expression);
    expression = this.processParameters(expression, parameterTypeRegistry);
    expression = '^' + expression + '$';

    this._treeRegexp = new TreeRegexp(expression);
  }

  _createClass(CucumberExpression, [{
    key: 'processEscapes',
    value: function processEscapes(expression) {
      return expression.replace(ESCAPE_REGEXP(), '\\$1');
    }
  }, {
    key: 'processOptional',
    value: function processOptional(expression) {
      var _this = this;

      return expression.replace(OPTIONAL_REGEXP(), function (match, p1, p2) {
        _this._checkNoParameterType(p2, PARAMETER_TYPES_CANNOT_BE_OPTIONAL);
        return p1 === DOUBLE_ESCAPE ? '\\(' + p2 + '\\)' : '(?:' + p2 + ')?';
      });
    }
  }, {
    key: 'processAlternation',
    value: function processAlternation(expression) {
      var _this2 = this;

      return expression.replace(ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP(), function (match) {
        // replace \/ with /
        // replace / with |
        var replacement = match.replace(/\//g, '|').replace(/\\\|/g, '/');
        if (replacement.indexOf('|') !== -1) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = replacement.split(/\|/)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var part = _step.value;

              _this2._checkNoParameterType(part, PARAMETER_TYPES_CANNOT_BE_ALTERNATIVE);
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

          return '(?:' + replacement + ')';
        } else {
          return replacement;
        }
      });
    }
  }, {
    key: 'processParameters',
    value: function processParameters(expression, parameterTypeRegistry) {
      var _this3 = this;

      return expression.replace(PARAMETER_REGEXP(), function (match, p1, p2) {
        if (p1 === DOUBLE_ESCAPE) return '\\{' + p2 + '\\}';

        var typeName = p2;
        ParameterType.checkParameterTypeName(typeName);
        var parameterType = parameterTypeRegistry.lookupByTypeName(typeName);
        if (!parameterType) throw new UndefinedParameterTypeError(typeName);
        _this3._parameterTypes.push(parameterType);
        return buildCaptureRegexp(parameterType.regexps);
      });
    }
  }, {
    key: 'match',
    value: function match(text) {
      return Argument.build(this._treeRegexp, text, this._parameterTypes);
    }
  }, {
    key: '_checkNoParameterType',
    value: function _checkNoParameterType(s, message) {
      if (s.match(PARAMETER_REGEXP())) {
        throw new CucumberExpressionError(message + this.source);
      }
    }
  }, {
    key: 'regexp',
    get: function get() {
      return this._treeRegexp.regexp;
    }
  }, {
    key: 'source',
    get: function get() {
      return this._expression;
    }
  }]);

  return CucumberExpression;
}();

function buildCaptureRegexp(regexps) {
  if (regexps.length === 1) {
    return '(' + regexps[0] + ')';
  }

  var captureGroups = regexps.map(function (group) {
    return '(?:' + group + ')';
  });

  return '(' + captureGroups.join('|') + ')';
}
module.exports = CucumberExpression;