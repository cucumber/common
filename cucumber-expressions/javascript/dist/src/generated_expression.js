'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var util = require('util');

var GeneratedExpression = function () {
  function GeneratedExpression(expressionTemplate, parameterTypes) {
    _classCallCheck(this, GeneratedExpression);

    this._expressionTemplate = expressionTemplate;
    this._parameterTypes = parameterTypes;
  }

  _createClass(GeneratedExpression, [{
    key: 'source',
    get: function get() {
      return util.format.apply(util, [this._expressionTemplate].concat(_toConsumableArray(this._parameterTypes.map(function (t) {
        return t.name;
      }))));
    }

    /**
     * Returns an array of parameter names to use in generated function/method signatures
     *
     * @returns {Array.<String>}
     */

  }, {
    key: 'parameterNames',
    get: function get() {
      var usageByTypeName = {};
      return this._parameterTypes.map(function (t) {
        return getParameterName(t.name, usageByTypeName);
      });
    }

    /**
     * @returns {Array.<ParameterType>}
     */

  }, {
    key: 'parameterTypes',
    get: function get() {
      return this._parameterTypes;
    }
  }]);

  return GeneratedExpression;
}();

function getParameterName(typeName, usageByTypeName) {
  var count = usageByTypeName[typeName];
  count = count ? count + 1 : 1;
  usageByTypeName[typeName] = count;

  return count === 1 ? typeName : '' + typeName + count;
}

module.exports = GeneratedExpression;