import * as assert from 'assert'
import Gherkin from '../../src/legacy'
import { messages } from 'cucumber-messages'

describe('Parser (legacy)', function() {
  it('parses a simple feature', function() {
    const parser = new Gherkin.Parser(new Gherkin.AstBuilder())
    const scanner = new Gherkin.TokenScanner('Feature: hello')
    const matcher = new Gherkin.TokenMatcher()
    const ast = parser.parse(scanner, matcher)
    assert.deepStrictEqual(
      ast,
      messages.GherkinDocument.fromObject({
        feature: {
          tags: [],
          location: { line: 1, column: 1 },
          language: 'en',
          keyword: 'Feature',
          name: 'hello',
          description: undefined,
          children: [],
        },
        comments: [],
      })
    )
  })

  it('parses multiple features', function() {
    const parser = new Gherkin.Parser(new Gherkin.AstBuilder())
    const matcher = new Gherkin.TokenMatcher()
    const ast1 = parser.parse(
      new Gherkin.TokenScanner('Feature: hello'),
      matcher
    )
    const ast2 = parser.parse(
      new Gherkin.TokenScanner('Feature: hello again'),
      matcher
    )

    assert.deepStrictEqual(
      ast1,
      messages.GherkinDocument.fromObject({
        feature: {
          tags: [],
          location: { line: 1, column: 1 },
          language: 'en',
          keyword: 'Feature',
          name: 'hello',
          description: undefined,
          children: [],
        },
        comments: [],
      })
    )
    assert.deepStrictEqual(
      ast2,
      messages.GherkinDocument.fromObject({
        feature: {
          tags: [],
          location: { line: 1, column: 1 },
          language: 'en',
          keyword: 'Feature',
          name: 'hello again',
          description: undefined,
          children: [],
        },
        comments: [],
      })
    )
  })

  it('parses feature after parse error', function() {
    const parser = new Gherkin.Parser(new Gherkin.AstBuilder())
    const matcher = new Gherkin.TokenMatcher()
    try {
      parser.parse(
        new Gherkin.TokenScanner(
          '# a comment\n' +
            'Feature: Foo\n' +
            '  Scenario: Bar\n' +
            '    Given x\n' +
            '      ```\n' +
            '      unclosed docstring\n'
        ),
        matcher
      )
    } catch(expected) {
      console.log(expected)
    }
    const ast = parser.parse(
      new Gherkin.TokenScanner(
        'Feature: Foo\n' +
          '  Scenario: Bar\n' +
          '    Given x\n' +
          '      """\n' +
          '      closed docstring\n' +
          '      """'
      ),
      matcher
    )

    assert.deepStrictEqual(
      ast,
      messages.GherkinDocument.fromObject({
        feature: {
          tags: [],
          location: { line: 1, column: 1 },
          language: 'en',
          keyword: 'Feature',
          name: 'Foo',
          description: undefined,
          children: [
            {
              scenario: {
                description: undefined,
                examples: [],
                keyword: 'Scenario',
                location: { line: 2, column: 3 },
                name: 'Bar',
                steps: [
                  {
                    docString: {
                      content: 'closed docstring',
                      delimiter: '"""',
                      location: { line: 4, column: 7 },
                    },
                    keyword: 'Given ',
                    location: { line: 3, column: 5 },
                    text: 'x',
                  },
                ],
                tags: [],
              },
            },
          ],
        },
        comments: [],
      })
    )
  })

  it('can change the default language', function() {
    const parser = new Gherkin.Parser(new Gherkin.AstBuilder())
    const matcher = new Gherkin.TokenMatcher('no')
    const scanner = new Gherkin.TokenScanner('Egenskap: i18n support')
    const ast = parser.parse(scanner, matcher)
    assert.deepStrictEqual(
      ast,
      messages.GherkinDocument.fromObject({
        feature: {
          tags: [],
          location: { line: 1, column: 1 },
          language: 'no',
          keyword: 'Egenskap',
          name: 'i18n support',
          description: undefined,
          children: [],
        },
        comments: [],
      })
    )
  })
})
