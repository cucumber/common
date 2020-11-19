import ITokenMatcher from './ITokenMatcher'
import Dialect from './Dialect'
import Token from './Token'
import { TokenType } from './Parser'
import DIALECTS from './gherkin-languages.json'

const DIALECT_DICT: { [key: string]: Dialect } = DIALECTS

export default class MarkdownTokenMatcher implements ITokenMatcher {
  private readonly dialect: Dialect

  constructor(defaultDialectName = 'en') {
    this.dialect = DIALECT_DICT[defaultDialectName]
  }

  match_BackgroundLine(token: Token): boolean {
    return matchTitleLine(
      this.dialect.background,
      ':',
      token,
      TokenType.BackgroundLine
    )
  }

  match_Comment(token: Token): boolean {
    return false
  }

  match_DocStringSeparator(token: Token): boolean {
    return false
  }

  match_EOF(token: Token): boolean {
    return false
  }

  match_Empty(token: Token): boolean {
    return false
  }

  match_ExamplesLine(token: Token): boolean {
    return matchTitleLine(
      this.dialect.examples,
      ':',
      token,
      TokenType.ExamplesLine
    )
  }

  match_FeatureLine(token: Token): boolean {
    return matchTitleLine(
      this.dialect.feature,
      ':',
      token,
      TokenType.FeatureLine
    )
  }

  match_Language(token: Token): boolean {
    return false
  }

  match_Other(token: Token): boolean {
    return false
  }

  match_RuleLine(token: Token): boolean {
    return matchTitleLine(this.dialect.rule, ':', token, TokenType.RuleLine)
  }

  match_ScenarioLine(token: Token): boolean {
    return (
      matchTitleLine(
        this.dialect.scenario,
        ':',
        token,
        TokenType.ScenarioLine
      ) ||
      matchTitleLine(
        this.dialect.scenarioOutline,
        ':',
        token,
        TokenType.ScenarioLine
      )
    )
  }

  match_StepLine(token: Token): boolean {
    const keywords = []
      .concat(this.dialect.given)
      .concat(this.dialect.when)
      .concat(this.dialect.then)
      .concat(this.dialect.and)
      .concat(this.dialect.but)
    return matchTitleLine(keywords, '', token, TokenType.StepLine)
  }

  match_TableRow(token: Token): boolean {
    return false
  }

  match_TagLine(token: Token): boolean {
    return false
  }

  reset(): void {
    return undefined
  }
}

function matchTitleLine(
  keywords: readonly string[],
  keywordSuffix: string,
  token: Token,
  matchedType: TokenType
) {
  const regexp = new RegExp(
    `(##?#?#?) (${keywords.map(escapeRegExp).join('|')})${keywordSuffix}(.*)`
  )
  const match = token.line.match(regexp)
  if (!match) return false
  token.matchedType = matchedType
  token.matchedKeyword = match[2]
  token.matchedText = match[3].trim()
  return true
}

// https://stackoverflow.com/questions/3115150/how-to-escape-regular-expression-special-characters-using-javascript
function escapeRegExp(text: string) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}
