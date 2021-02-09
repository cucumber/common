import { messages } from '@cucumber/messages'
import GherkinLine from './GherkinLine'
import { Item } from './Parser'

export default interface IToken<TokenType> {
  location: messages.ILocation
  line: GherkinLine

  isEof: boolean
  matchedText?: string
  matchedType: TokenType
  matchedItems: readonly Item[]
  matchedKeyword: string
  matchedIndent: number
  matchedGherkinDialect: string
  getTokenValue(): string
  detach(): void
}
