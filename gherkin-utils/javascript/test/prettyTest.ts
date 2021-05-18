import assert from 'assert'
import parse from './parse'
import pretty from '../src/pretty'
import {GherkinClassicTokenMatcher, GherkinInMarkdownTokenMatcher} from "@cucumber/gherkin";

describe('PrettyFormatter', () => {
  it('renders a feature with no scenarios', () => {
    assertPrettyIdentical('Feature: hello\n', true)
  })

  it('renders a feature with two scenarios', () => {
    assertPrettyIdentical(`Feature: hello

  Scenario: one
    Given hello

  Scenario: two
    Given world
`, true)
  })

  it('renders a feature with two scenarios in a rule', () => {
    assertPrettyIdentical(`Feature: hello

  Rule: ok

    Scenario: one
      Given hello

    Scenario: two
      Given world
`, true)
  })

  it('renders a feature with background and scenario', () => {
    assertPrettyIdentical(`Feature: hello

  Background: bbb
    Given hello

  Scenario: two
    Given world
`, true)
  })

  it('renders a rule with background and scenario', () => {
    assertPrettyIdentical(`Feature: hello

  Rule: machin

    Background: bbb
      Given hello

    Scenario: two
      Given world
`, true)
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
`, true)
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
`, false)
  })
})

function assertPrettyIdentical(gherkinSource: string, viaMarkdown: boolean) {
  const gherkinClassicTokenMatcher = new GherkinClassicTokenMatcher()
  const gherkinDocument = parse(gherkinSource, gherkinClassicTokenMatcher)

  if(viaMarkdown) {
    const markdownSource = pretty(gherkinDocument, 'markdown')
//     console.log(`-------
// ${markdownSource}
// -------`)
    const gherkinInMarkdownTokenMatcher = new GherkinInMarkdownTokenMatcher()
    const markdownGherkinDocument = parse(markdownSource, gherkinInMarkdownTokenMatcher)

    const newGherkinSource = pretty(markdownGherkinDocument, "gherkin")
    assert.strictEqual(newGherkinSource, gherkinSource)
  } else {
    const newGherkinSource = pretty(gherkinDocument, "gherkin")
    assert.strictEqual(newGherkinSource, gherkinSource)
  }
}
