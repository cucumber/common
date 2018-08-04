'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GeneratedExpression = require('./generated_expression');

var CombinatorialGeneratedExpressionFactory = function () {
  function CombinatorialGeneratedExpressionFactory(expressionTemplate, parameterTypeCombinations) {
    _classCallCheck(this, CombinatorialGeneratedExpressionFactory);

    this._expressionTemplate = expressionTemplate;
    this._parameterTypeCombinations = parameterTypeCombinations;
  }

  _createClass(CombinatorialGeneratedExpressionFactory, [{
    key: 'generateExpressions',
    value: function generateExpressions() {
      var generatedExpressions = [];
      this._generatePermutations(generatedExpressions, 0, []);
      return generatedExpressions;
    }
  }, {
    key: '_generatePermutations',
    value: function _generatePermutations(generatedExpressions, depth, currentParameterTypes) {
      if (depth === this._parameterTypeCombinations.length) {
        generatedExpressions.push(new GeneratedExpression(this._expressionTemplate, currentParameterTypes));
        return;
      }

      for (var i = 0; i < this._parameterTypeCombinations[depth].length; ++i) {
        var newCurrentParameterTypes = currentParameterTypes.slice(); // clone
        newCurrentParameterTypes.push(this._parameterTypeCombinations[depth][i]);
        this._generatePermutations(generatedExpressions, depth + 1, newCurrentParameterTypes);
      }
    }
  }]);

  return CombinatorialGeneratedExpressionFactory;
}();

module.exports = CombinatorialGeneratedExpressionFactory;