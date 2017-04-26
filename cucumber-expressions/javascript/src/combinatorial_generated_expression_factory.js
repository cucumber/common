const GeneratedExpression = require('./generated_expression')

class CombinatorialGeneratedExpressionFactory {
  constructor(expressionTemplate, parameterTypeCombinations) {
    this._expressionTemplate = expressionTemplate
    this._parameterTypeCombinations = parameterTypeCombinations
  }

  generateExpressions() {
    const generatedExpressions = []
    this._generatePermutations(generatedExpressions, 0, [])
    return generatedExpressions
  }

  _generatePermutations(generatedExpressions, depth, currentParameterTypes) {
    if (depth === this._parameterTypeCombinations.length) {
      generatedExpressions.push(new GeneratedExpression(this._expressionTemplate, currentParameterTypes))
      return
    }

    for (let i = 0; i < this._parameterTypeCombinations[depth].length; ++i) {
      const newCurrentParameterTypes = currentParameterTypes.slice() // clone
      newCurrentParameterTypes.push(this._parameterTypeCombinations[depth][i])
      this._generatePermutations(
        generatedExpressions,
        depth + 1,
        newCurrentParameterTypes
      )
    }
  }
}

module.exports = CombinatorialGeneratedExpressionFactory