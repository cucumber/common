import Expression from './Expression'
import Argument from './Argument'

export default class UndefinedParameterTypeExpression implements Expression {
  constructor(public readonly source: string) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public match(text: string): Array<Argument<any>> {
    return null
  }
}
