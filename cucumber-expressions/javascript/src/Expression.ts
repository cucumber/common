import Argument from './Argument'

export default interface Expression {
  readonly source: string
  match(text: string): ReadonlyArray<Argument<any>>
}
