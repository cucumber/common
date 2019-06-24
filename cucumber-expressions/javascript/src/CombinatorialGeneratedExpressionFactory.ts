import GeneratedExpression from './GeneratedExpression'
import ParameterType from './ParameterType'

// 256 generated expressions ought to be enough for anybody
const MAX_EXPRESSIONS = 256

export default class CombinatorialGeneratedExpressionFactory {
  constructor(
    private readonly expressionTemplate: string,
    private readonly parameterTypeCombinations: Array<Array<ParameterType<any>>>
  ) {
    this.expressionTemplate = expressionTemplate
  }

  public generateExpressions() {
    const generatedExpressions: GeneratedExpression[] = []
    this._generatePermutations(generatedExpressions, 0, [])
    return generatedExpressions
  }

  public _generatePermutations(
    generatedExpressions: GeneratedExpression[],
    depth: number,
    currentParameterTypes: Array<ParameterType<any>>
  ) {
    if (generatedExpressions.length >= MAX_EXPRESSIONS) {
      return
    }

    if (depth === this.parameterTypeCombinations.length) {
      generatedExpressions.push(
        new GeneratedExpression(this.expressionTemplate, currentParameterTypes)
      )
      return
    }

    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.parameterTypeCombinations[depth].length; ++i) {
      // Avoid recursion if no elements can be added.
      if (generatedExpressions.length >= MAX_EXPRESSIONS) {
        return
      }

      const newCurrentParameterTypes = currentParameterTypes.slice() // clone
      newCurrentParameterTypes.push(this.parameterTypeCombinations[depth][i])
      this._generatePermutations(
        generatedExpressions,
        depth + 1,
        newCurrentParameterTypes
      )
    }
  }
}
