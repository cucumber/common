"use strict";

const GeneratedExpression = require('./generated_expression'); // 256 generated expressions ought to be enough for anybody


const MAX_EXPRESSIONS = 256;

class CombinatorialGeneratedExpressionFactory {
  constructor(expressionTemplate, parameterTypeCombinations) {
    this._expressionTemplate = expressionTemplate;
    this._parameterTypeCombinations = parameterTypeCombinations;
  }

  generateExpressions() {
    const generatedExpressions = [];

    this._generatePermutations(generatedExpressions, 0, []);

    return generatedExpressions;
  }

  _generatePermutations(generatedExpressions, depth, currentParameterTypes) {
    if (generatedExpressions.length >= MAX_EXPRESSIONS) {
      return;
    }

    if (depth === this._parameterTypeCombinations.length) {
      generatedExpressions.push(new GeneratedExpression(this._expressionTemplate, currentParameterTypes));
      return;
    }

    for (let i = 0; i < this._parameterTypeCombinations[depth].length; ++i) {
      // Avoid recursion if no elements can be added.
      if (generatedExpressions.length >= MAX_EXPRESSIONS) {
        return;
      }

      const newCurrentParameterTypes = currentParameterTypes.slice(); // clone

      newCurrentParameterTypes.push(this._parameterTypeCombinations[depth][i]);

      this._generatePermutations(generatedExpressions, depth + 1, newCurrentParameterTypes);
    }
  }

}

module.exports = CombinatorialGeneratedExpressionFactory;