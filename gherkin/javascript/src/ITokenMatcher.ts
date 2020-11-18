import Token from './Token'

export default interface ITokenMatcher {
  reset(): void

  match_TagLine(token: Token): boolean

  match_FeatureLine(token: Token): boolean

  match_ScenarioLine(token: Token): boolean

  match_BackgroundLine(token: Token): boolean

  match_ExamplesLine(token: Token): boolean

  match_RuleLine(token: Token): boolean

  match_TableRow(token: Token): boolean

  match_Empty(token: Token): boolean

  match_Comment(token: Token): boolean

  match_Language(token: Token): boolean

  match_DocStringSeparator(token: Token): boolean

  match_EOF(token: Token): boolean

  match_StepLine(token: Token): boolean

  match_Other(token: Token): boolean
}
