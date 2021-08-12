import * as messages from '@cucumber/messages'
import { walkGherkinDocument } from '@cucumber/gherkin-utils'
import { SemanticTokenModifiers, SemanticTokens, SemanticTokenTypes } from 'vscode-languageserver-types'
import parseGherkinDocument from './parseGherkinDocument'
import { Expression } from '@cucumber/cucumber-expressions'

export const semanticTokenTypes: SemanticTokenTypes[] = [
  SemanticTokenTypes.keyword,
  SemanticTokenTypes.parameter,
]

export const semanticTokenModifiers: SemanticTokenModifiers[] = []

const indexByType = Object.fromEntries(semanticTokenTypes.map((type, index) => [type, index]))

// https://microsoft.github.io/language-server-protocol/specifications/specification-3-17/#textDocument_semanticTokens
export function getGherkinSemanticTokens(gherkinSource: string, expressions: readonly Expression[]): SemanticTokens {
  const gherkinDocument = parseGherkinDocument(gherkinSource)
  let line = 1

  function makeToken(location: messages.Location, token: string, type: SemanticTokenTypes, data: readonly number[]) {
    const lineOffset = location.line - line
    line = location.line
    const character = location.column - 1
    const length = token.length
    const typeIndex = indexByType[type]
    return data.concat([lineOffset, character, length, typeIndex, 0])
  }

  const data = walkGherkinDocument<number[]>(gherkinDocument, [], {
    feature(feature, arr) {
      return makeToken(feature.location, feature.keyword, SemanticTokenTypes.keyword, arr)
    },
    rule(rule, arr) {
      return makeToken(rule.location, rule.keyword, SemanticTokenTypes.keyword, arr)
    },
    scenario(scenario, arr) {
      return makeToken(scenario.location, scenario.keyword, SemanticTokenTypes.keyword, arr)
    },
    examples(examples, arr) {
      return makeToken(examples.location, examples.keyword, SemanticTokenTypes.keyword, arr)
    },
    step(step, arr) {
      arr = makeToken(step.location, step.keyword, SemanticTokenTypes.keyword, arr)
      for (const expression of expressions) {
        const args = expression.match(step.text)
        if (args) {
          const typeIndex = indexByType[SemanticTokenTypes.parameter]

          let previousChar = -step.keyword.length
          for (const arg of args) {
            const deltaStartChar = arg.group.start - previousChar
            previousChar = arg.group.start
            const length = arg.group.end - arg.group.start
            arr = arr.concat([0, deltaStartChar, length, typeIndex, 0])
          }
          break
        }
      }
      return arr
    },
  })

  return {
    data
  }
}
