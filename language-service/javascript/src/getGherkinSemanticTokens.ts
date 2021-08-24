import * as messages from '@cucumber/messages'
import { walkGherkinDocument } from '@cucumber/gherkin-utils'
import {
  SemanticTokenModifiers,
  SemanticTokens,
  SemanticTokenTypes,
} from 'vscode-languageserver-types'
import { parseGherkinDocument } from './parseGherkinDocument'
import { Expression } from '@cucumber/cucumber-expressions'

export const semanticTokenTypes: SemanticTokenTypes[] = [
  SemanticTokenTypes.keyword, // Feature, Scenario, Given etc
  SemanticTokenTypes.parameter, // step parameters
  SemanticTokenTypes.string, // DocString content and ``` delimiter
  SemanticTokenTypes.type, // DocString ```type
  SemanticTokenTypes.class, // @tags
  SemanticTokenTypes.variable, // step <placeholder>
  SemanticTokenTypes.property, // examples table header row
]

export const semanticTokenModifiers: SemanticTokenModifiers[] = []

const indexByType = Object.fromEntries(semanticTokenTypes.map((type, index) => [type, index]))

// https://microsoft.github.io/language-server-protocol/specifications/specification-3-17/#textDocument_semanticTokens
export function getGherkinSemanticTokens(
  gherkinSource: string,
  expressions: readonly Expression[]
): SemanticTokens {
  const { gherkinDocument } = parseGherkinDocument(gherkinSource)
  if (!gherkinDocument) {
    return {
      data: [],
    }
  }
  const lines = gherkinSource.split(/\r?\n/)
  let lastLineNumber = 0
  let lastCharacter = 0

  function makeLocationToken(
    location: messages.Location,
    token: string,
    type: SemanticTokenTypes,
    data: readonly number[]
  ) {
    const lineNumber = location.line - 1
    const character = location.column - 1
    return makeToken(lineNumber, character, token, type, data)
  }

  function makeToken(
    lineNumber: number,
    character: number,
    token: string,
    type: SemanticTokenTypes,
    data: readonly number[]
  ) {
    const charDelta = lineNumber === lastLineNumber ? character - lastCharacter : character
    lastCharacter = character
    const lineOffset = lineNumber - lastLineNumber
    lastLineNumber = lineNumber
    const length = token.length
    const typeIndex = indexByType[type]
    return data.concat([lineOffset, charDelta, length, typeIndex, 0])
  }

  let inScenarioOutline = false
  let inExamples = false

  const data = walkGherkinDocument<number[]>(gherkinDocument, [], {
    tag(tag, arr) {
      return makeLocationToken(tag.location, tag.name, SemanticTokenTypes.class, arr)
    },
    feature(feature, arr) {
      return makeLocationToken(feature.location, feature.keyword, SemanticTokenTypes.keyword, arr)
    },
    rule(rule, arr) {
      return makeLocationToken(rule.location, rule.keyword, SemanticTokenTypes.keyword, arr)
    },
    scenario(scenario, arr) {
      inScenarioOutline = (scenario.examples || []).length > 0
      return makeLocationToken(scenario.location, scenario.keyword, SemanticTokenTypes.keyword, arr)
    },
    examples(examples, arr) {
      inExamples = true
      return makeLocationToken(examples.location, examples.keyword, SemanticTokenTypes.keyword, arr)
    },
    step(step, arr) {
      inExamples = false
      arr = makeLocationToken(step.location, step.keyword, SemanticTokenTypes.keyword, arr)
      if (inScenarioOutline) {
        const regexp = /(<[^>]+>)/g
        let match: RegExpMatchArray = null
        while ((match = regexp.exec(step.text)) !== null) {
          const character = step.location.column - 1 + step.keyword.length + match.index
          arr = makeToken(
            step.location.line - 1,
            character,
            match[0],
            SemanticTokenTypes.variable,
            arr
          )
        }
      } else {
        for (const expression of expressions) {
          const args = expression.match(step.text)
          if (args) {
            for (const arg of args) {
              const character = step.location.column - 1 + step.keyword.length + arg.group.start
              arr = makeToken(
                step.location.line - 1,
                character,
                arg.group.value,
                SemanticTokenTypes.parameter,
                arr
              )
            }
            break
          }
        }
      }
      return arr
    },
    docString(docString, arr) {
      arr = makeLocationToken(
        docString.location,
        docString.delimiter,
        SemanticTokenTypes.string,
        arr
      )
      if (docString.mediaType) {
        const character = docString.location.column - 1 + docString.delimiter.length
        arr = makeToken(
          docString.location.line - 1,
          character,
          docString.mediaType,
          SemanticTokenTypes.type,
          arr
        )
      }
      const maxLineNumber = docString.location.line + docString.content.split(/\r?\n/).length
      for (let lineNumber = docString.location.line; lineNumber <= maxLineNumber; lineNumber++) {
        const spaceContent = /^(\s*)(.*)$/.exec(lines[lineNumber])
        const startChar = spaceContent[1].length
        const token = spaceContent[2]
        arr = makeToken(lineNumber, startChar, token, SemanticTokenTypes.string, arr)
      }
      return arr
    },
    tableRow(tableRow, arr) {
      const type = inExamples ? SemanticTokenTypes.property : SemanticTokenTypes.parameter
      for (const cell of tableRow.cells) {
        arr = makeLocationToken(cell.location, cell.value, type, arr)
      }
      inExamples = false
      return arr
    },
  })

  return {
    data,
  }
}
