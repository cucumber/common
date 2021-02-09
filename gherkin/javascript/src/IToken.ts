import { messages } from '@cucumber/messages'

export interface IGherkinLine {
  isEmpty: boolean
  indent?: number
  trimmedLineText: string

  getTableCells(): readonly Item[]

  startsWith(prefix: string): boolean

  getTags(): readonly Item[]

  getRestTrimmed(length: number): string

  getLineText(number: number): string

  startsWithTitleKeyword(keyword: string): boolean
}

// Represents tags or table cells
export type Item = {
  column: number
  text: string
}

export default interface IToken<TokenType> {
  location: messages.ILocation
  line: IGherkinLine

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
