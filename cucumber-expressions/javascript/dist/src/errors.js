'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CucumberExpressionError = function (_Error) {
  _inherits(CucumberExpressionError, _Error);

  function CucumberExpressionError() {
    _classCallCheck(this, CucumberExpressionError);

    return _possibleConstructorReturn(this, (CucumberExpressionError.__proto__ || Object.getPrototypeOf(CucumberExpressionError)).apply(this, arguments));
  }

  return CucumberExpressionError;
}(Error);

var AmbiguousParameterTypeError = function (_CucumberExpressionEr) {
  _inherits(AmbiguousParameterTypeError, _CucumberExpressionEr);

  function AmbiguousParameterTypeError() {
    _classCallCheck(this, AmbiguousParameterTypeError);

    return _possibleConstructorReturn(this, (AmbiguousParameterTypeError.__proto__ || Object.getPrototypeOf(AmbiguousParameterTypeError)).apply(this, arguments));
  }

  _createClass(AmbiguousParameterTypeError, null, [{
    key: 'forConstructor',
    value: function forConstructor(keyName, keyValue, parameterTypes, generatedExpressions) {
      return new this('parameter type with ' + keyName + '=' + keyValue + ' is used by several parameter types: ' + parameterTypes + ', ' + generatedExpressions);
    }
  }, {
    key: 'forRegExp',
    value: function forRegExp(parameterTypeRegexp, expressionRegexp, parameterTypes, generatedExpressions) {
      return new this('Your Regular Expression ' + expressionRegexp + '\nmatches multiple parameter types with regexp ' + parameterTypeRegexp + ':\n   ' + this._parameterTypeNames(parameterTypes) + '\n\nI couldn\'t decide which one to use. You have two options:\n\n1) Use a Cucumber Expression instead of a Regular Expression. Try one of these:\n   ' + this._expressions(generatedExpressions) + '\n\n2) Make one of the parameter types preferential and continue to use a Regular Expression.\n');
    }
  }, {
    key: '_parameterTypeNames',
    value: function _parameterTypeNames(parameterTypes) {
      return parameterTypes.map(function (p) {
        return '{' + p.name + '}';
      }).join('\n   ');
    }
  }, {
    key: '_expressions',
    value: function _expressions(generatedExpressions) {
      return generatedExpressions.map(function (e) {
        return e.source;
      }).join('\n   ');
    }
  }]);

  return AmbiguousParameterTypeError;
}(CucumberExpressionError);

var UndefinedParameterTypeError = function (_CucumberExpressionEr2) {
  _inherits(UndefinedParameterTypeError, _CucumberExpressionEr2);

  function UndefinedParameterTypeError(typeName) {
    _classCallCheck(this, UndefinedParameterTypeError);

    return _possibleConstructorReturn(this, (UndefinedParameterTypeError.__proto__ || Object.getPrototypeOf(UndefinedParameterTypeError)).call(this, 'Undefined parameter type {' + typeName + '}'));
  }

  return UndefinedParameterTypeError;
}(CucumberExpressionError);

module.exports = {
  AmbiguousParameterTypeError: AmbiguousParameterTypeError,
  UndefinedParameterTypeError: UndefinedParameterTypeError,
  CucumberExpressionError: CucumberExpressionError
};