import Argument from './Argument.js'

export default interface Expression {
  readonly source: string
  match(text: string): readonly Argument<any>[]
}
