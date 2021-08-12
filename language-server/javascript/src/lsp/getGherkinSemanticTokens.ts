import * as messages from '@cucumber/messages'
import { walkGherkinDocument } from '@cucumber/gherkin-utils'
import { SemanticTokens } from 'vscode-languageserver-types'
import parseGherkinDocument from './parseGherkinDocument'

// https://microsoft.github.io/language-server-protocol/specifications/specification-3-17/#textDocument_semanticTokens
export function getGherkinSemanticTokens(gherkinSource: string): SemanticTokens {
  const gherkinDocument = parseGherkinDocument(gherkinSource)
  let line = 1

  function makeToken(location: messages.Location, token: string, data: readonly number[]) {
    const lineOffset = location.line - line
    line = location.line
    const character = location.column - 1
    const length = token.length
    return data.concat([lineOffset, character, length, 0, 0])
  }

  const data = walkGherkinDocument<number[]>(gherkinDocument, [], {
    feature(feature, data) {
      return makeToken(feature.location, feature.keyword, data)
    },
    rule(rule, data) {
      return makeToken(rule.location, rule.keyword, data)
    },
    scenario(scenario, data) {
      return makeToken(scenario.location, scenario.keyword, data)
    },
    examples(examples, data) {
      return makeToken(examples.location, examples.keyword, data)
    },
    step(step, data) {
      return makeToken(step.location, step.keyword, data)
    },
  })

  return {
    data
  }
}
