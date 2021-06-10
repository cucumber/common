import ITokenMatcher from './ITokenMatcher'
import Dialect from './Dialect'
import { Token, TokenType } from './Parser'
import DIALECTS from './gherkin-languages.json'
import { Item } from './IToken'
import * as messages from '@cucumber/messages'
import { NoSuchLanguageException } from './Errors'

const DIALECT_DICT: { [key: string]: Dialect } = DIALECTS
const DEFAULT_DOC_STRING_SEPARATOR = /^(```[`]*)(.*)/

export default class GherkinInMarkdownTokenMatcher implements ITokenMatcher<TokenType> {
  private dialect: Dialect
  private dialectName: string
  private readonly nonStarStepKeywords: string[]
  private readonly stepRegexp: RegExp
  private readonly headerRegexp: RegExp
  private activeDocStringSeparator: RegExp
  private indentToRemove: number
  private matchedFeatureLine: boolean

  constructor(private readonly defaultDialectName: string = 'en') {
    this.dialect = DIALECT_DICT[defaultDialectName]
    this.nonStarStepKeywords = []
      .concat(this.dialect.given)
      .concat(this.dialect.when)
      .concat(this.dialect.then)
      .concat(this.dialect.and)
      .concat(this.dialect.but)
      .filter((value, index, self) => value !== '* ' && self.indexOf(value) === index)

    this.stepRegexp = new RegExp(
      `${KeywordPrefix.BULLET}(${this.nonStarStepKeywords.map(escapeRegExp).join('|')})`
    )

    const headerKeywords = []
      .concat(this.dialect.feature)
      .concat(this.dialect.background)
      .concat(this.dialect.rule)
      .concat(this.dialect.scenarioOutline)
      .concat(this.dialect.scenario)
      .concat(this.dialect.examples)
      .filter((value, index, self) => self.indexOf(value) === index)

    this.headerRegexp = new RegExp(
      `${KeywordPrefix.HEADER}(${headerKeywords.map(escapeRegExp).join('|')})`
    )

    this.reset()
  }

  changeDialect(newDialectName: string, location?: messages.Location) {
    const newDialect = DIALECT_DICT[newDialectName]
    if (!newDialect) {
      throw NoSuchLanguageException.create(newDialectName, location)
    }

    this.dialectName = newDialectName
    this.dialect = newDialect
  }

  // We've made a deliberate choice not to support `# language: [ISO 639-1]` headers or similar
  // in Markdown. Users should specify a language globally. This can be done in
  // cucumber-js using the --language [ISO 639-1] option.
  match_Language(token: Token): boolean {
    if (!token) throw new Error('no token')
    return false
  }

  match_Empty(token: Token): boolean {
    let result = false
    if (token.line.isEmpty) {
      result = true
    }
    if (
      !this.match_TagLine(token) &&
      !this.match_FeatureLine(token) &&
      !this.match_ScenarioLine(token) &&
      !this.match_BackgroundLine(token) &&
      !this.match_ExamplesLine(token) &&
      !this.match_RuleLine(token) &&
      !this.match_TableRow(token) &&
      !this.match_Comment(token) &&
      !this.match_Language(token) &&
      !this.match_DocStringSeparator(token) &&
      !this.match_EOF(token) &&
      !this.match_StepLine(token)
    ) {
      // neutered
      result = true
    }

    if (result) {
      token.matchedType = TokenType.Empty
    }
    return this.setTokenMatched(token, null, result)
  }

  match_Other(token: Token): boolean {
    const text = token.line.getLineText(this.indentToRemove) // take the entire line, except removing DocString indents
    token.matchedType = TokenType.Other
    token.matchedText = text
    token.matchedIndent = 0
    return this.setTokenMatched(token, null, true)
  }

  match_Comment(token: Token): boolean {
    let result = false
    if (token.line.startsWith('|')) {
      const tableCells = token.line.getTableCells()
      if (this.isGfmTableSeparator(tableCells)) result = true
    }
    return this.setTokenMatched(token, null, result)
  }

  match_DocStringSeparator(token: Token) {
    const match = token.line.trimmedLineText.match(this.activeDocStringSeparator)
    const [, newSeparator, mediaType] = match || []
    let result = false
    if (newSeparator) {
      if (this.activeDocStringSeparator === DEFAULT_DOC_STRING_SEPARATOR) {
        this.activeDocStringSeparator = new RegExp(`^(${newSeparator})$`)
        this.indentToRemove = 0
      } else {
        this.activeDocStringSeparator = DEFAULT_DOC_STRING_SEPARATOR
      }

      token.matchedKeyword = newSeparator
      token.matchedType = TokenType.DocStringSeparator
      token.matchedText = mediaType || ''

      result = true
    }
    return this.setTokenMatched(token, null, result)
  }

  match_EOF(token: Token): boolean {
    let result = false
    if (token.isEof) {
      token.matchedType = TokenType.EOF
      result = true
    }
    return this.setTokenMatched(token, null, result)
  }

  match_FeatureLine(token: Token): boolean {
    if (this.matchedFeatureLine) {
      return this.setTokenMatched(token, null, false)
    }
    // We first try to match "# Feature: blah"
    let result = this.matchTitleLine(
      KeywordPrefix.HEADER,
      this.dialect.feature,
      ':',
      token,
      TokenType.FeatureLine
    )
    // If we didn't match "# Feature: blah", we still match this line
    // as a FeatureLine.
    // The reason for this is that users may not want to be constrained by having this as their fist line.
    if (!result) {
      token.matchedType = TokenType.FeatureLine
      token.matchedText = token.line.trimmedLineText
      result = this.setTokenMatched(token, null, true)
    }
    this.matchedFeatureLine = result
    return result
  }

  match_BackgroundLine(token: Token): boolean {
    return this.matchTitleLine(
      KeywordPrefix.HEADER,
      this.dialect.background,
      ':',
      token,
      TokenType.BackgroundLine
    )
  }

  match_RuleLine(token: Token): boolean {
    return this.matchTitleLine(
      KeywordPrefix.HEADER,
      this.dialect.rule,
      ':',
      token,
      TokenType.RuleLine
    )
  }

  match_ScenarioLine(token: Token): boolean {
    return (
      this.matchTitleLine(
        KeywordPrefix.HEADER,
        this.dialect.scenario,
        ':',
        token,
        TokenType.ScenarioLine
      ) ||
      this.matchTitleLine(
        KeywordPrefix.HEADER,
        this.dialect.scenarioOutline,
        ':',
        token,
        TokenType.ScenarioLine
      )
    )
  }

  match_ExamplesLine(token: Token): boolean {
    return this.matchTitleLine(
      KeywordPrefix.HEADER,
      this.dialect.examples,
      ':',
      token,
      TokenType.ExamplesLine
    )
  }

  match_StepLine(token: Token): boolean {
    return this.matchTitleLine(
      KeywordPrefix.BULLET,
      this.nonStarStepKeywords,
      '',
      token,
      TokenType.StepLine
    )
  }

  matchTitleLine(
    prefix: KeywordPrefix,
    keywords: readonly string[],
    keywordSuffix: ':' | '',
    token: Token,
    matchedType: TokenType
  ) {
    const regexp = new RegExp(
      `${prefix}(${keywords.map(escapeRegExp).join('|')})${keywordSuffix}(.*)`
    )
    const match = token.line.match(regexp)
    let indent = token.line.indent
    let result = false
    if (match) {
      token.matchedType = matchedType
      token.matchedKeyword = match[2]
      token.matchedText = match[3].trim()
      indent += match[1].length
      result = true
    }
    return this.setTokenMatched(token, indent, result)
  }

  setTokenMatched(token: Token, indent: number | null, matched: boolean) {
    token.matchedGherkinDialect = this.dialectName
    token.matchedIndent = indent !== null ? indent : token.line == null ? 0 : token.line.indent
    token.location.column = token.matchedIndent + 1
    return matched
  }

  match_TableRow(token: Token): boolean {
    // Gherkin tables must be indented 2-5 spaces in order to be distinguidedn from non-Gherkin tables
    if (token.line.lineText.match(/^\s\s\s?\s?\s?\|/)) {
      const tableCells = token.line.getTableCells()
      if (this.isGfmTableSeparator(tableCells)) return false

      token.matchedKeyword = '|'
      token.matchedType = TokenType.TableRow
      token.matchedItems = tableCells
      return true
    }
    return false
  }

  private isGfmTableSeparator(tableCells: readonly Item[]): boolean {
    const separatorValues = tableCells
      .map((item) => item.text)
      .filter((value) => value.match(/^:?-+:?$/))
    return separatorValues.length > 0
  }

  match_TagLine(token: Token): boolean {
    const tags: Item[] = []
    let m: RegExpMatchArray
    const re = /`(@[^`]+)`/g
    do {
      m = re.exec(token.line.trimmedLineText)
      if (m) {
        tags.push({
          column: token.line.indent + m.index + 2,
          text: m[1],
        })
      }
    } while (m)

    if (tags.length === 0) return false
    token.matchedType = TokenType.TagLine
    token.matchedItems = tags
    return true
  }

  reset(): void {
    if (this.dialectName !== this.defaultDialectName) {
      this.changeDialect(this.defaultDialectName)
    }
    this.activeDocStringSeparator = DEFAULT_DOC_STRING_SEPARATOR
  }
}

enum KeywordPrefix {
  // https://spec.commonmark.org/0.29/#bullet-list-marker
  BULLET = '^(\\s*[*+-]\\s*)',
  HEADER = '^(#{1,6}\\s)',
}

// https://stackoverflow.com/questions/3115150/how-to-escape-regular-expression-special-characters-using-javascript
function escapeRegExp(text: string) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}
