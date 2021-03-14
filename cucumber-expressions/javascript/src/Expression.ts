import Argument from './Argument'

export default interface Expression {
  readonly source: string
  match(text: string): readonly Argument<any>[]
}
