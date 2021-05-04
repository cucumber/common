import ITokenMatcher from './ITokenMatcher'
import Dialect from './Dialect'
import { Token, TokenType } from './Parser'
import DIALECTS from './gherkin-languages.json'
import assert from 'assert'
import { Item } from './IToken'
import * as messages from '@cucumber/messages'
import { NoSuchLanguageException } from './Errors'

const DIALECT_DICT: { [key: string]: Dialect } = DIALECTS
const DEFAULT_DOC_STRING_SEPARATOR = /^(```[`]*)(.*)/

export default class MarkdownTokenMatcher implements ITokenMatcher<TokenType> {
  private dialect: Dialect
  private dialectName: string
  private readonly nonStarStepKeywords: string[]
  private readonly stepRegexp: RegExp
  private readonly headerRegexp: RegExp
  private activeDocStringSeparator: RegExp
  private indentToRemove: number

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

  match_Language(token: Token): boolean {
    assert(token)
    return false
  }

  match_Other(token: Token): boolean {
    const text = token.line.getLineText(this.indentToRemove) // take the entire line, except removing DocString indents
    token.matchedType = TokenType.Other
    token.matchedText = text
    token.matchedIndent = 0
    return true
  }

  match_Comment(token: Token): boolean {
    if (token.line.startsWith('|')) {
      const tableCells = token.line.getTableCells()
      if (this.match_GfmTableSeparator(tableCells)) return true
    }
    return false
  }

  match_DocStringSeparator(token: Token) {
    const match = token.line.trimmedLineText.match(this.activeDocStringSeparator)
    const [, newSeparator, mediaType] = match || []
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

      return true
    }
    return false
  }

  match_EOF(token: Token): boolean {
    if (token.isEof) {
      token.matchedType = TokenType.EOF
      return true
    }
    return false
  }

  match_Empty(token: Token): boolean {
    const startsWithStepBullet = token.line.match(this.stepRegexp)
    const startsWithHeader = token.line.match(this.headerRegexp)
    if (token.line.isEmpty || !(startsWithStepBullet || startsWithHeader)) {
      token.matchedType = TokenType.Empty
      return true
    }
    return false
  }

  match_FeatureLine(token: Token): boolean {
    return matchTitleLine(
      KeywordPrefix.HEADER,
      this.dialect.feature,
      ':',
      token,
      TokenType.FeatureLine
    )
  }

  match_BackgroundLine(token: Token): boolean {
    return matchTitleLine(
      KeywordPrefix.HEADER,
      this.dialect.background,
      ':',
      token,
      TokenType.BackgroundLine
    )
  }

  match_RuleLine(token: Token): boolean {
    return matchTitleLine(KeywordPrefix.HEADER, this.dialect.rule, ':', token, TokenType.RuleLine)
  }

  match_ScenarioLine(token: Token): boolean {
    return (
      matchTitleLine(
        KeywordPrefix.HEADER,
        this.dialect.scenario,
        ':',
        token,
        TokenType.ScenarioLine
      ) ||
      matchTitleLine(
        KeywordPrefix.HEADER,
        this.dialect.scenarioOutline,
        ':',
        token,
        TokenType.ScenarioLine
      )
    )
  }

  match_ExamplesLine(token: Token): boolean {
    return matchTitleLine(
      KeywordPrefix.HEADER,
      this.dialect.examples,
      ':',
      token,
      TokenType.ExamplesLine
    )
  }

  match_StepLine(token: Token): boolean {
    return matchTitleLine(
      KeywordPrefix.BULLET,
      this.nonStarStepKeywords,
      '',
      token,
      TokenType.StepLine
    )
  }

  match_TableRow(token: Token): boolean {
    if (token.line.startsWith('|')) {
      const tableCells = token.line.getTableCells()
      if (this.match_GfmTableSeparator(tableCells)) return false

      token.matchedKeyword = '|'
      token.matchedType = TokenType.TableRow
      token.matchedItems = tableCells
      return true
    }
    return false
  }

  private match_GfmTableSeparator(tableCells: readonly Item[]): boolean {
    const separatorValues = tableCells
      .map((item) => item.text)
      .filter((value) => value.match(/^:?-+:?$/))
    return separatorValues.length > 0
  }

  match_TagLine(token: Token): boolean {
    assert(token)
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
  BULLET = '^(\\s*\\*\\s*)',
  HEADER = '^(##?#?#?) ',
}

function matchTitleLine(
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
  if (!match) return false
  token.matchedType = matchedType
  token.matchedKeyword = match[2]
  token.matchedText = match[3].trim()
  token.matchedIndent = token.line.indent + match[1].length
  token.location.column = token.matchedIndent + 1
  return true
}

// https://stackoverflow.com/questions/3115150/how-to-escape-regular-expression-special-characters-using-javascript
function escapeRegExp(text: string) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}
