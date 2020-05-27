import { IdGenerator } from '@cucumber/messages'
import assert from 'assert'
import { AstBuilder } from '../../src'
import Parser from '../../src/Parser'
import pretty from '../../src/pretty/pretty'

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

  it('renders a rule with background and scenario', () => {
    assertPrettyIdentical(`Feature: hello

  Rule: machin

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
