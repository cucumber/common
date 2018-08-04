'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _require = require('./errors'),
    CucumberExpressionError = _require.CucumberExpressionError;

var Argument = function () {
  _createClass(Argument, null, [{
    key: 'build',
    value: function build(treeRegexp, text, parameterTypes) {
      var group = treeRegexp.match(text);
      if (!group) return null;

      var argGroups = group.children;

      if (argGroups.length !== parameterTypes.length) {
        throw new CucumberExpressionError('Expression ' + treeRegexp.regexp + ' has ' + argGroups.length + ' capture groups (' + argGroups.map(function (g) {
          return g.value;
        }) + '), but there were ' + parameterTypes.length + ' parameter types (' + parameterTypes.map(function (p) {
          return p.name;
        }) + ')');
      }

      return parameterTypes.map(function (parameterType, i) {
        return new Argument(argGroups[i], parameterType);
      });
    }
  }]);

  function Argument(group, parameterType) {
    _classCallCheck(this, Argument);

    this._group = group;
    this._parameterType = parameterType;
  }

  _createClass(Argument, [{
    key: 'getValue',


    /**
     * Get the value returned by the parameter type's transformer function.
     *
     * @param thisObj the object in which the transformer function is applied.
     */
    value: function getValue(thisObj) {
      var groupValues = this._group ? this._group.values : null;
      return this._parameterType.transform(thisObj, groupValues);
    }
  }, {
    key: 'group',
    get: function get() {
      return this._group;
    }
  }]);

  return Argument;
}();

module.exports = Argument;