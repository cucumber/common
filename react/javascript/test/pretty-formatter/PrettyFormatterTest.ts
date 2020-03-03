import Parser from 'gherkin/dist/src/Parser'
import AstBuilder from 'gherkin/dist/src/AstBuilder'
import { IdGenerator, messages } from '@cucumber/messages'
import * as assert from 'assert'

function pretty(gherkinDocument: messages.IGherkinDocument): string {
  const feature = gherkinDocument.feature
  let s = feature.keyword + ': ' + feature.name + '\n'

  for (const child of feature.children) {
    if (child.scenario) {
      s += `\n  ${child.scenario.keyword}: ${child.scenario.name}\n`
    }
  }
  return s
}

describe('PrettyFormatter', () => {
  it('renders a feature with no scenarios', () => {
    assertPrettyIdentical('Feature: hello\n')
  })

  it('renders a feature with two scenarios', () => {
    assertPrettyIdentical(`Feature: hello

  Scenario: one

  Scenario: two
`)
  })
})

function assertPrettyIdentical(source: string) {
  const newId = IdGenerator.uuid()
  const parser = new Parser(new AstBuilder(newId))
  const gherkinDocument = parser.parse(source)
  assert.strictEqual(pretty(gherkinDocument), source)
}
