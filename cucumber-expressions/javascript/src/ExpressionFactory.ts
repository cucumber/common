import Expression from './Expression.js'
import CucumberExpression from './CucumberExpression.js'
import RegularExpression from './RegularExpression.js'
import ParameterTypeRegistry from './ParameterTypeRegistry.js'

export default class ExpressionFactory {
  public constructor(private readonly parameterTypeRegistry: ParameterTypeRegistry) {}

  public createExpression(expression: string | RegExp): Expression {
    return typeof expression === 'string'
      ? new CucumberExpression(expression, this.parameterTypeRegistry)
      : new RegularExpression(expression, this.parameterTypeRegistry)
  }
}
