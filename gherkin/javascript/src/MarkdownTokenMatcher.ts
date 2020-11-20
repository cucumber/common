import ITokenMatcher from './ITokenMatcher'
import Dialect from './Dialect'
import Token from './Token'
import { TokenType } from './Parser'
import DIALECTS from './gherkin-languages.json'

const DIALECT_DICT: { [key: string]: Dialect } = DIALECTS

export default class MarkdownTokenMatcher implements ITokenMatcher {
  private readonly dialect: Dialect
  private readonly nonStarStepKeywords: string[]
  private readonly stepRegexp: RegExp
  private readonly headerRegexp: RegExp

  constructor(defaultDialectName = 'en') {
    this.dialect = DIALECT_DICT[defaultDialectName]
    this.nonStarStepKeywords = []
      .concat(this.dialect.given)
      .concat(this.dialect.when)
      .concat(this.dialect.then)
      .concat(this.dialect.and)
      .concat(this.dialect.but)
      .filter(
        (value, index, self) => value !== '* ' && self.indexOf(value) === index
      )

    this.stepRegexp = new RegExp(
      `${KeywordPrefix.BULLET}(${this.nonStarStepKeywords
        .map(escapeRegExp)
        .join('|')})`
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
  }

  match_Language(token: Token): boolean {
    return false
  }

  match_Other(token: Token): boolean {
    return false
  }

  match_Comment(token: Token): boolean {
    return false
  }

  match_DocStringSeparator(token: Token): boolean {
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
    return matchTitleLine(
      KeywordPrefix.HEADER,
      this.dialect.rule,
      ':',
      token,
      TokenType.RuleLine
    )
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
    return false
  }

  match_TagLine(token: Token): boolean {
    return false
  }

  reset(): void {
    return undefined
  }
}

enum KeywordPrefix {
  BULLET = '^(\\s*\\*\\s*)',
  HEADER = '^(##?#?#?) ',
}

function matchTitleLine(
  prefix: KeywordPrefix,
  keywords: readonly string[],
  keywordSuffix: string,
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
  return true
}

// https://stackoverflow.com/questions/3115150/how-to-escape-regular-expression-special-characters-using-javascript
function escapeRegExp(text: string) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
}
