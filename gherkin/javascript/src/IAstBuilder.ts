import { IdGenerator, messages } from '@cucumber/messages'
import IToken from './IToken'

export interface IAstBuilder<AstNode, TokenType, RuleType> {
  stack: AstNode[]
  comments: messages.GherkinDocument.IComment[]
  newId: IdGenerator.NewId

  reset(): void

  startRule(ruleType: RuleType): void

  endRule(): void

  build(token: IToken<TokenType>): void

  getResult(): any

  currentNode(): any

  getLocation(token: IToken<TokenType>, column?: number): messages.ILocation

  getTags(node: AstNode): readonly messages.GherkinDocument.Feature.ITag[]

  getCells(
    tableRowToken: IToken<TokenType>
  ): readonly messages.GherkinDocument.Feature.TableRow.ITableCell[]

  getDescription(node: AstNode): any

  getSteps(node: AstNode): any[]

  getTableRows(
    node: AstNode
  ): readonly messages.GherkinDocument.Feature.ITableRow[]

  ensureCellCount(
    rows: readonly messages.GherkinDocument.Feature.ITableRow[]
  ): void

  transformNode(node: AstNode): any
}
