import DIALECTS from './gherkin-languages.json'
import Dialect from './Dialect'
import {NoSuchLanguageException} from './Errors'
import {messages} from '@cucumber/messages'
import IToken from './IToken'
import {TokenType} from './Parser'

const DIALECT_DICT: { [key: string]: Dialect } = DIALECTS
const LANGUAGE_PATTERN = /^\s*#\s*language\s*:\s*([a-zA-Z\-_]+)\s*$/

export default class TokenMatcher {
  private dialect: Dialect
  private dialectName: string
  private activeDocStringSeparator: string
  private indentToRemove: number

  constructor(private readonly defaultDialectName: string = 'en') {
    this.reset()
  }

  public changeDialect(newDialectName: string, location?: messages.ILocation) {
    const newDialect = DIALECT_DICT[newDialectName]
    if (!newDialect) {
      throw NoSuchLanguageException.create(newDialectName, location)
    }

    this.dialectName = newDialectName
    this.dialect = newDialect
  }

  public reset() {
    if (this.dialectName !== this.defaultDialectName) {
      this.changeDialect(this.defaultDialectName)
    }
    this.activeDocStringSeparator = null
    this.indentToRemove = 0
  }

  public match_TagLine(token: IToken<TokenType>) {
    if (token.line.startsWith('@')) {
      this.setTokenMatched(
        token,
        TokenType.TagLine,
        null,
        null,
        null,
        token.line.getTags()
      )
      return true
    }
    return false
  }

  public match_FeatureLine(token: IToken<TokenType>) {
    return this.matchTitleLine(
      token,
      TokenType.FeatureLine,
      this.dialect.feature
    )
  }

  public match_ScenarioLine(token: IToken<TokenType>) {
    return (
      this.matchTitleLine(
        token,
        TokenType.ScenarioLine,
        this.dialect.scenario
      ) ||
      this.matchTitleLine(
        token,
        TokenType.ScenarioLine,
        this.dialect.scenarioOutline
      )
    )
  }

  public match_BackgroundLine(token: IToken<TokenType>) {
    return this.matchTitleLine(
      token,
      TokenType.BackgroundLine,
      this.dialect.background
    )
  }

  public match_ExamplesLine(token: IToken<TokenType>) {
    return this.matchTitleLine(
      token,
      TokenType.ExamplesLine,
      this.dialect.examples
    )
  }

  public match_RuleLine(token: IToken<TokenType>) {
    return this.matchTitleLine(token, TokenType.RuleLine, this.dialect.rule)
  }

  public match_TableRow(token: IToken<TokenType>) {
    if (token.line.startsWith('|')) {
      // TODO: indent
      this.setTokenMatched(
        token,
        TokenType.TableRow,
        null,
        null,
        null,
        token.line.getTableCells()
      )
      return true
    }
    return false
  }

  public match_Empty(token: IToken<TokenType>) {
    if (token.line.isEmpty) {
      this.setTokenMatched(token, TokenType.Empty, null, null, 0)
      return true
    }
    return false
  }

  public match_Comment(token: IToken<TokenType>) {
    if (token.line.startsWith('#')) {
      const text = token.line.getLineText(0) // take the entire line, including leading space
      this.setTokenMatched(token, TokenType.Comment, text, null, 0)
      return true
    }
    return false
  }

  public match_Language(token: IToken<TokenType>) {
    const match = token.line.trimmedLineText.match(LANGUAGE_PATTERN)
    if (match) {
      const newDialectName = match[1]
      this.setTokenMatched(token, TokenType.Language, newDialectName)

      this.changeDialect(newDialectName, token.location)
      return true
    }
    return false
  }

  public match_DocStringSeparator(token: IToken<TokenType>) {
    return this.activeDocStringSeparator == null
      ? // open
      this._match_DocStringSeparator(token, '"""', true) ||
      this._match_DocStringSeparator(token, '```', true)
      : // close
      this._match_DocStringSeparator(
        token,
        this.activeDocStringSeparator,
        false
      )
  }

  public _match_DocStringSeparator(
    token: IToken<TokenType>,
    separator: string,
    isOpen: boolean
  ) {
    if (token.line.startsWith(separator)) {
      let mediaType = null
      if (isOpen) {
        mediaType = token.line.getRestTrimmed(separator.length)
        this.activeDocStringSeparator = separator
        this.indentToRemove = token.line.indent
      } else {
        this.activeDocStringSeparator = null
        this.indentToRemove = 0
      }

      // TODO: Use the separator as keyword. That's needed for pretty printing.
      this.setTokenMatched(token, TokenType.DocStringSeparator, mediaType)
      return true
    }
    return false
  }

  public match_EOF(token: IToken<TokenType>) {
    if (token.isEof) {
      this.setTokenMatched(token, TokenType.EOF)
      return true
    }
    return false
  }

  public match_StepLine(token: IToken<TokenType>) {
    const keywords = []
      .concat(this.dialect.given)
      .concat(this.dialect.when)
      .concat(this.dialect.then)
      .concat(this.dialect.and)
      .concat(this.dialect.but)
    for (const keyword of keywords) {
      if (token.line.startsWith(keyword)) {
        const title = token.line.getRestTrimmed(keyword.length)
        this.setTokenMatched(token, TokenType.StepLine, title, keyword)
        return true
      }
    }
    return false
  }

  public match_Other(token: IToken<TokenType>) {
    const text = token.line.getLineText(this.indentToRemove) // take the entire line, except removing DocString indents
    this.setTokenMatched(
      token,
      TokenType.Other,
      this.unescapeDocString(text),
      null,
      0
    )
    return true
  }

  private matchTitleLine(
    token: IToken<TokenType>,
    tokenType: TokenType,
    keywords: readonly string[]
  ) {
    for (const keyword of keywords) {
      if (token.line.startsWithTitleKeyword(keyword)) {
        const title = token.line.getRestTrimmed(keyword.length + ':'.length)
        this.setTokenMatched(token, tokenType, title, keyword)
        return true
      }
    }
    return false
  }

  private setTokenMatched(
    token: IToken<TokenType>,
    matchedType: TokenType,
    text?: string,
    keyword?: string,
    indent?: number,
    items?: any[]
  ) {
    token.matchedType = matchedType
    token.matchedText = text
    token.matchedKeyword = keyword
    token.matchedIndent =
      typeof indent === 'number'
        ? indent
        : token.line == null
        ? 0
        : token.line.indent
    token.matchedItems = items || []

    token.location.column = token.matchedIndent + 1
    token.matchedGherkinDialect = this.dialectName
  }

  private unescapeDocString(text: string) {
    if (this.activeDocStringSeparator === "\"\"\"") {
      return text.replace('\\"\\"\\"', '"""')
    }
    if (this.activeDocStringSeparator === "```") {
      return text.replace('\\`\\`\\`', '```')
    }
    return text
  }
}
