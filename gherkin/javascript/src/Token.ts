import { messages } from 'cucumber-messages'
import GherkinLine from './GherkinLine'
import { TokenType } from './Parser'

export default class Token {
  public isEof: boolean
  public matchedText?: string
  public matchedType: TokenType
  public matchedItems: GherkinLine[]
  public matchedKeyword: string
  public matchedIndent: number
  public matchedGherkinDialect: string

  constructor(
    public readonly line: GherkinLine,
    public readonly location: messages.ILocation
  ) {
    this.isEof = line == null
  }

  public getTokenValue() {
    return this.isEof ? 'EOF' : this.line.getLineText(-1)
  }

  public detach() {
    // TODO: Detach line, but is this really needed?
  }
}
