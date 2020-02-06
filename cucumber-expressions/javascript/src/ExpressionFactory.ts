import Expression from './Expression'
import CucumberExpression from './CucumberExpression'
import RegularExpression from './RegularExpression'
import UndefinedParameterTypeExpression from './UndefinedParameterTypeExpression'
import ParameterTypeRegistry from './ParameterTypeRegistry'

export default class ExpressionFactory {
  public constructor(
    private readonly parameterTypeRegistry: ParameterTypeRegistry
  ) {}

  public createExpression(expression: string | RegExp): Expression {
    return typeof expression === 'string'
      ? this.createCucumberExpression(expression)
      : new RegularExpression(expression, this.parameterTypeRegistry)
  }

  private createCucumberExpression(expression: string) {
    try {
      return new CucumberExpression(expression, this.parameterTypeRegistry)
    } catch (e) {
      if (e.undefinedParameterTypeName) {
        return new UndefinedParameterTypeExpression(expression)
      } else {
        throw e
      }
    }
  }
}
