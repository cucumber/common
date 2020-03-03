import Parser from 'gherkin/dist/src/Parser'
import AstBuilder from 'gherkin/dist/src/AstBuilder'
import { IdGenerator, messages } from '@cucumber/messages'
import * as assert from 'assert'

function pretty(gherkinDocument: messages.IGherkinDocument): string {
  const feature = gherkinDocument.feature
  let s = feature.keyword + ': ' + feature.name + '\n'

  for (const child of feature.children) {
    if (child.background) {
      s += `\n  ${child.background.keyword}: ${child.background.name}\n`

      for (const step of child.background.steps) {
        s += `    ${step.keyword}${step.text}\n`
      }
    } else if (child.scenario) {
      s += `\n  ${child.scenario.keyword}: ${child.scenario.name}\n`

      for (const step of child.scenario.steps) {
        s += `    ${step.keyword}${step.text}\n`
      }
    } else if (child.rule) {
      s += `\n  ${child.rule.keyword}: ${child.rule.name}\n`

      for (const ruleChild of child.rule.children) {
        if (ruleChild.scenario) {
          s += `\n    ${ruleChild.scenario.keyword}: ${ruleChild.scenario.name}\n`

          for (const step of ruleChild.scenario.steps) {
            s += `      ${step.keyword}${step.text}\n`
          }
        }
      }
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
    Given hello

  Scenario: two
    Given world
`)
  })

  it('renders a feature with two scenarios in a rule', () => {
    assertPrettyIdentical(`Feature: hello

  Rule: ok

    Scenario: one
      Given hello

    Scenario: two
      Given world
`)
  })

  it('renders a feature with background and scenario', () => {
    assertPrettyIdentical(`Feature: hello

  Background: bbb
    Given hello

  Scenario: two
    Given world
`)
  })
})

function assertPrettyIdentical(source: string) {
  const newId = IdGenerator.uuid()
  const parser = new Parser(new AstBuilder(newId))
  const gherkinDocument = parser.parse(source)
  assert.strictEqual(pretty(gherkinDocument), source)
}
