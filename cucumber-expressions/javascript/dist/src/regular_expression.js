'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Argument = require('./argument');
var TreeRegexp = require('./tree_regexp');
var ParameterType = require('./parameter_type');

var RegularExpression = function () {
  function RegularExpression(expressionRegexp, parameterTypeRegistry) {
    _classCallCheck(this, RegularExpression);

    this._expressionRegexp = expressionRegexp;
    this._parameterTypeRegistry = parameterTypeRegistry;
    this._treeRegexp = new TreeRegexp(expressionRegexp);
  }

  _createClass(RegularExpression, [{
    key: 'match',
    value: function match(text) {
      var _this = this;

      var parameterTypes = this._treeRegexp.groupBuilder.children.map(function (groupBuilder) {
        var parameterTypeRegexp = groupBuilder.source;

        return _this._parameterTypeRegistry.lookupByRegexp(parameterTypeRegexp, _this._treeRegexp, text) || new ParameterType(null, parameterTypeRegexp, String, function (s) {
          return s;
        }, false, false);
      });

      return Argument.build(this._treeRegexp, text, parameterTypes);
    }
  }, {
    key: 'regexp',
    get: function get() {
      return this._expressionRegexp;
    }
  }, {
    key: 'source',
    get: function get() {
      return this._expressionRegexp.source;
    }
  }]);

  return RegularExpression;
}();

module.exports = RegularExpression;