import assert from 'assert'
import parse from './parse'
import pretty from '../src/pretty'

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

  it('renders tags when set', () => {
    assertPrettyIdentical(`@featureTag
Feature: hello

  Rule: machin

    Background: bbb
      Given hello

    @scenarioTag @secondTag
    Scenario: two
      Given world
`)
  })

  it('renders descriptions when set', () => {
    assertPrettyIdentical(`Feature: hello
  So this is a feature

  Rule: machin
    The first rule of the feature states things

    Background: bbb
      We can have some explications for the background

      Given hello

    Scenario: two
      This scenario will do things, maybe

      Given world
`)
  })
})

function assertPrettyIdentical(source: string) {
  const gherkinDocument = parse(source)
  assert.strictEqual(pretty(gherkinDocument), source)
}
