import assert from 'assert'
import parse from './parse'
import pretty, { escapeCell } from '../src/pretty'
import { GherkinClassicTokenMatcher, GherkinInMarkdownTokenMatcher } from '@cucumber/gherkin'
import glob from 'glob'
import * as fs from 'fs'
import * as messages from '@cucumber/messages'

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

  it('renders data tables', () => {
    checkGherkinToAstToMarkdowToAstToGherkin(`Feature: hello

  Scenario: one
    Given a data table:
      | text | numbers |
      | a    |       1 |
      | ab   |      10 |
      | abc  |     100 |
`)
  })

  it('renders docstrings', () => {
    checkGherkinToAstToMarkdowToAstToGherkin(`Feature: hello

  Scenario: one
    Given a doc string:
      \`\`\`json
      {
        "foo": "bar"
      }
      \`\`\`
`)
  })

  it('escapes docstring separators', () => {
    checkGherkinToAstToGherkin(`Feature: hello

  Scenario: one
    Given a doc string:
      """
      a
      \\"\\"\\"
      b
      """
`)
  })

  xit('renders comments', () => {
    checkGherkinToAstToGherkin(`# one
Feature: hello

  Scenario: one
    # two
    Given a doc string:
      """
      a
      \\"\\"\\"
      b
      """
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

  const featureFiles = glob.sync(`${__dirname}/../../../gherkin/testdata/good/*.feature`)
  for (const featureFile of featureFiles) {
    it(`renders ${featureFile}`, () => {
      const gherkinSource = fs.readFileSync(featureFile, 'utf-8')
      const gherkinDocument = parse(gherkinSource, new GherkinClassicTokenMatcher())
      const formattedGherkinSource = pretty(gherkinDocument, 'gherkin')
      const language = gherkinDocument.feature?.language || 'en'
      const newGherkinDocument = checkGherkinToAstToGherkin(formattedGherkinSource, language)
      assert(newGherkinDocument)
      // TODO: comments, tags, docstrings
      // assert.deepStrictEqual(neutralize(newGherkinDocument), neutralize(gherkinDocument))
    })
  }

  describe('escapeCell', () => {
    it('escapes nothing', () => {
      assert.strictEqual(escapeCell('hello'), 'hello')
    })

    it('escapes newline', () => {
      assert.strictEqual(escapeCell('\n'), '\\n')
    })

    it('escapes pipe', () => {
      assert.strictEqual(escapeCell('|'), '\\|')
    })

    it('escapes backslash', () => {
      assert.strictEqual(escapeCell('\\'), '\\\\')
    })
  })
})

function checkGherkinToAstToMarkdowToAstToGherkin(gherkinSource: string) {
  const gherkinDocument = parse(gherkinSource, new GherkinClassicTokenMatcher())
  const markdownSource = pretty(gherkinDocument, 'markdown')
  //     console.log(`---<MDG>---
  // ${markdownSource}
  // ---</MDG>--`)
  const markdownGherkinDocument = parse(markdownSource, new GherkinInMarkdownTokenMatcher())

  const newGherkinSource = pretty(markdownGherkinDocument, 'gherkin')
  assert.strictEqual(newGherkinSource, gherkinSource)
}

function checkGherkinToAstToGherkin(
  gherkinSource: string,
  language = 'en'
): messages.GherkinDocument {
  const gherkinDocument = parse(gherkinSource, new GherkinClassicTokenMatcher(language))
  const newGherkinSource = pretty(gherkinDocument, 'gherkin')
  // console.log(`---<Gherkin>---
  // ${newGherkinSource}
  // ---</Gherkin>--`)
  assert.strictEqual(newGherkinSource, gherkinSource)
  return gherkinDocument
}

function neutralize(gherkinDocument: messages.GherkinDocument): messages.GherkinDocument {
  const json = JSON.stringify(
    gherkinDocument,
    (key, value) => {
      if ('id' === key) {
        return 'id'
      } else if (['column', 'line'].includes(key)) {
        return '0'
      } else {
        return value
      }
    },
    2
  )
  return JSON.parse(json)
}
