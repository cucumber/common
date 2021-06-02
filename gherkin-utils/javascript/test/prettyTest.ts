import assert from 'assert'
import parse from './parse'
import pretty from '../src/pretty'
import { GherkinClassicTokenMatcher, GherkinInMarkdownTokenMatcher } from '@cucumber/gherkin'

describe('PrettyFormatter', () => {
  it('renders a feature with no scenarios', () => {
    checkGherkinToAstToMarkdowToAstToGherkin('Feature: hello\n')
  })

  it('renders a feature with two scenarios', () => {
    checkGherkinToAstToMarkdowToAstToGherkin(`Feature: hello

  Scenario: one
    Given hello

  Scenario: two
    Given world
`)
  })

  it('renders a feature with two scenarios in a rule', () => {
    checkGherkinToAstToMarkdowToAstToGherkin(`Feature: hello

  Rule: ok

    Scenario: one
      Given hello

    Scenario: two
      Given world
`)
  })

  it('renders a feature with background and scenario', () => {
    checkGherkinToAstToMarkdowToAstToGherkin(`Feature: hello

  Background: bbb
    Given hello

  Scenario: two
    Given world
`)
  })

  it('renders a rule with background and scenario', () => {
    checkGherkinToAstToMarkdowToAstToGherkin(`Feature: hello

  Rule: machin

    Background: bbb
      Given hello

    Scenario: two
      Given world
`)
  })

  it('renders tags when set', () => {
    checkGherkinToAstToMarkdowToAstToGherkin(`@featureTag
Feature: hello

  Rule: machin

    Background: bbb
      Given hello

    @scenarioTag @secondTag
    Scenario: two
      Given world
`)
  })

  it('renders tables', () => {
    checkGherkinToAstToMarkdowToAstToGherkin(`Feature: hello

  Scenario: one
    Given a data table:
      | text | numbers |
      | a    |       1 |
      | ab   |      10 |
      | abc  |     100 |
`)
  })

  it('renders descriptions when set', () => {
    checkGherkinToAstToGherkin(`Feature: hello
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

function checkGherkinToAstToMarkdowToAstToGherkin(gherkinSource: string) {
  const gherkinClassicTokenMatcher = new GherkinClassicTokenMatcher()
  const gherkinDocument = parse(gherkinSource, gherkinClassicTokenMatcher)

  const markdownSource = pretty(gherkinDocument, 'markdown')
  //     console.log(`-------
  // ${markdownSource}
  // -------`)
  const gherkinInMarkdownTokenMatcher = new GherkinInMarkdownTokenMatcher()
  const markdownGherkinDocument = parse(markdownSource, gherkinInMarkdownTokenMatcher)

  const newGherkinSource = pretty(markdownGherkinDocument, 'gherkin')
  assert.strictEqual(newGherkinSource, gherkinSource)
}

function checkGherkinToAstToGherkin(gherkinSource: string) {
  const gherkinClassicTokenMatcher = new GherkinClassicTokenMatcher()
  const gherkinDocument = parse(gherkinSource, gherkinClassicTokenMatcher)

  const newGherkinSource = pretty(gherkinDocument, 'gherkin')
  assert.strictEqual(newGherkinSource, gherkinSource)
}
