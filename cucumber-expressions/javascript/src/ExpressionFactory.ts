import Expression from './Expression'
import CucumberExpression from './CucumberExpression'
import RegularExpression from './RegularExpression'
import ParameterTypeRegistry from './ParameterTypeRegistry'

export default class ExpressionFactory {
  public constructor(
    private readonly parameterTypeRegistry: ParameterTypeRegistry
  ) {}

  public createExpression(expression: string | RegExp): Expression {
    return typeof expression === 'string'
      ? new CucumberExpression(expression, this.parameterTypeRegistry)
      : new RegularExpression(expression, this.parameterTypeRegistry)
  }
}
