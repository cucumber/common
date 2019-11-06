import AstNode from './AstNode'
import { messages } from 'cucumber-messages'
import { RuleType, TokenType } from './Parser'
import Token from './Token'
import { AstBuilderException } from './Errors'
import { NewId } from './types'

export default class AstBuilder {
  private stack: AstNode[]
  private comments: messages.GherkinDocument.IComment[]
  private readonly newId: NewId

  constructor(newId: NewId) {
    this.newId = newId
    if (!newId) {
      throw new Error('No newId')
    }
    this.reset()
  }

  public reset() {
    this.stack = [new AstNode(RuleType.None)]
    this.comments = []
  }

  public startRule(ruleType: RuleType) {
    this.stack.push(new AstNode(ruleType))
  }

  public endRule(ruleType: RuleType) {
    const node = this.stack.pop()
    const transformedNode = this.transformNode(node)
    this.currentNode().add(node.ruleType, transformedNode)
  }

  public build(token: Token) {
    if (token.matchedType === TokenType.Comment) {
      this.comments.push(
        messages.GherkinDocument.Comment.fromObject({
          location: this.getLocation(token),
          text: token.matchedText,
        })
      )
    } else {
      this.currentNode().add(token.matchedType, token)
    }
  }

  public getResult() {
    return this.currentNode().getSingle(RuleType.GherkinDocument)
  }

  public currentNode() {
    return this.stack[this.stack.length - 1]
  }

  public getLocation(token: Token, column?: number): messages.ILocation {
    return !column
      ? token.location
      : messages.Location.fromObject({ line: token.location.line, column })
  }

  public getTags(node: AstNode) {
    const tags: messages.GherkinDocument.Feature.ITag[] = []
    const tagsNode = node.getSingle(RuleType.Tags)
    if (!tagsNode) {
      return tags
    }
    const tokens = tagsNode.getTokens(TokenType.TagLine)
    for (const token of tokens) {
      for (const tagItem of token.matchedItems) {
        tags.push(
          messages.GherkinDocument.Feature.Tag.fromObject({
            location: this.getLocation(token, tagItem.column),
            name: tagItem.text,
          })
        )
      }
    }
    return tags
  }

  public getCells(tableRowToken: Token) {
    return tableRowToken.matchedItems.map(cellItem =>
      messages.GherkinDocument.Feature.TableRow.TableCell.fromObject({
        location: this.getLocation(tableRowToken, cellItem.column),
        value: cellItem.text,
      })
    )
  }

  public getDescription(node: AstNode) {
    return node.getSingle(RuleType.Description)
  }

  public getSteps(node: AstNode) {
    return node.getItems(RuleType.Step)
  }

  public getTableRows(node: AstNode) {
    const rows = node.getTokens(TokenType.TableRow).map(token =>
      messages.GherkinDocument.Feature.TableRow.fromObject({
        id: this.newId(),
        location: this.getLocation(token),
        cells: this.getCells(token),
      })
    )
    this.ensureCellCount(rows)
    return rows
  }

  public ensureCellCount(rows: any[]) {
    if (rows.length === 0) {
      return
    }
    const cellCount = rows[0].cells.length

    rows.forEach(row => {
      if (row.cells.length !== cellCount) {
        throw AstBuilderException.create(
          'inconsistent cell count within the table',
          row.location
        )
      }
    })
  }

  public transformNode(node: AstNode) {
    switch (node.ruleType) {
      case RuleType.Step: {
        const stepLine = node.getToken(TokenType.StepLine)
        const dataTable = node.getSingle(RuleType.DataTable)
        const docString = node.getSingle(RuleType.DocString)

        return messages.GherkinDocument.Feature.Step.fromObject({
          location: this.getLocation(stepLine),
          keyword: stepLine.matchedKeyword,
          text: stepLine.matchedText,
          dataTable,
          docString,
        })
      }
      case RuleType.DocString: {
        const separatorToken = node.getTokens(TokenType.DocStringSeparator)[0]
        const contentType =
          separatorToken.matchedText.length > 0
            ? separatorToken.matchedText
            : undefined
        const lineTokens = node.getTokens(TokenType.Other)
        const content = lineTokens.map(t => t.matchedText).join('\n')

        const result = messages.GherkinDocument.Feature.Step.DocString.fromObject(
          {
            location: this.getLocation(separatorToken),
            content,
            delimiter: separatorToken.line.trimmedLineText.substring(0, 3),
          }
        )
        // conditionally add this like this (needed to make tests pass on node 0.10 as well as 4.0)
        if (contentType) {
          result.contentType = contentType
        }
        return result
      }
      case RuleType.DataTable: {
        const rows = this.getTableRows(node)
        return messages.GherkinDocument.Feature.Step.DataTable.fromObject({
          location: rows[0].location,
          rows,
        })
      }
      case RuleType.Background: {
        const backgroundLine = node.getToken(TokenType.BackgroundLine)
        const description = this.getDescription(node)
        const steps = this.getSteps(node)

        return messages.GherkinDocument.Feature.Background.fromObject({
          location: this.getLocation(backgroundLine),
          keyword: backgroundLine.matchedKeyword,
          name: backgroundLine.matchedText,
          description,
          steps,
        })
      }
      case RuleType.ScenarioDefinition: {
        const tags = this.getTags(node)
        const scenarioNode = node.getSingle(RuleType.Scenario)
        const scenarioLine = scenarioNode.getToken(TokenType.ScenarioLine)
        const description = this.getDescription(scenarioNode)
        const steps = this.getSteps(scenarioNode)
        const examples = scenarioNode.getItems(RuleType.ExamplesDefinition)
        return messages.GherkinDocument.Feature.Scenario.fromObject({
          id: this.newId(),
          tags,
          location: this.getLocation(scenarioLine),
          keyword: scenarioLine.matchedKeyword,
          name: scenarioLine.matchedText,
          description,
          steps,
          examples,
        })
      }
      case RuleType.ExamplesDefinition: {
        const tags = this.getTags(node)
        const examplesNode = node.getSingle(RuleType.Examples)
        const examplesLine = examplesNode.getToken(TokenType.ExamplesLine)
        const description = this.getDescription(examplesNode)
        const exampleTable: messages.GherkinDocument.Feature.TableRow[] = examplesNode.getSingle(
          RuleType.ExamplesTable
        )

        return messages.GherkinDocument.Feature.Scenario.Examples.fromObject({
          tags,
          location: this.getLocation(examplesLine),
          keyword: examplesLine.matchedKeyword,
          name: examplesLine.matchedText,
          description,
          tableHeader: exampleTable !== undefined ? exampleTable[0] : undefined,
          tableBody:
            exampleTable !== undefined ? exampleTable.slice(1) : undefined,
        })
      }
      case RuleType.ExamplesTable: {
        return this.getTableRows(node)
      }
      case RuleType.Description: {
        let lineTokens = node.getTokens(TokenType.Other)
        // Trim trailing empty lines
        let end = lineTokens.length
        while (end > 0 && lineTokens[end - 1].line.trimmedLineText === '') {
          end--
        }
        lineTokens = lineTokens.slice(0, end)

        return lineTokens.map(token => token.matchedText).join('\n')
      }

      case RuleType.Feature: {
        const header = node.getSingle(RuleType.FeatureHeader)
        if (!header) {
          return null
        }
        const tags = this.getTags(header)
        const featureLine = header.getToken(TokenType.FeatureLine)
        if (!featureLine) {
          return null
        }
        const children = []
        const background = node.getSingle(RuleType.Background)
        if (background) {
          children.push(
            messages.GherkinDocument.Feature.FeatureChild.fromObject({
              background,
            })
          )
        }
        for (const scenario of node.getItems(RuleType.ScenarioDefinition)) {
          children.push(
            messages.GherkinDocument.Feature.FeatureChild.fromObject({
              scenario,
            })
          )
        }
        for (const rule of node.getItems(RuleType.Rule)) {
          children.push(
            messages.GherkinDocument.Feature.FeatureChild.fromObject({
              rule,
            })
          )
        }

        const description = this.getDescription(header)
        const language = featureLine.matchedGherkinDialect

        return messages.GherkinDocument.Feature.fromObject({
          tags,
          location: this.getLocation(featureLine),
          language,
          keyword: featureLine.matchedKeyword,
          name: featureLine.matchedText,
          description,
          children,
        })
      }

      case RuleType.Rule: {
        const header = node.getSingle(RuleType.RuleHeader)
        if (!header) {
          return null
        }
        const tags = this.getTags(header)
        const ruleLine = header.getToken(TokenType.RuleLine)
        if (!ruleLine) {
          return null
        }
        const children = []
        const background = node.getSingle(RuleType.Background)
        if (background) {
          children.push(
            messages.GherkinDocument.Feature.FeatureChild.fromObject({
              background,
            })
          )
        }
        for (const scenario of node.getItems(RuleType.ScenarioDefinition)) {
          children.push(
            messages.GherkinDocument.Feature.FeatureChild.fromObject({
              scenario,
            })
          )
        }
        const description = this.getDescription(header)

        return messages.GherkinDocument.Feature.FeatureChild.Rule.fromObject({
          tags,
          location: this.getLocation(ruleLine),
          keyword: ruleLine.matchedKeyword,
          name: ruleLine.matchedText,
          description,
          children,
        })
      }
      case RuleType.GherkinDocument: {
        const feature = node.getSingle(RuleType.Feature)

        return messages.GherkinDocument.fromObject({
          feature,
          comments: this.comments,
        })
      }
      default:
        return node
    }
  }
}
