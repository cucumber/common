import Argument from './Argument'

export default interface Expression {
  readonly source: string
  readonly undefinedParameterTypeNames: Set<string>
  match(text: string): Array<Argument<any>>
}
