import * as assert from 'assert'
import { messages } from 'cucumber-messages'
import AstBuilder from '../src/AstBuilder'
import Parser from '../src/Parser'
import TokenScanner from '../src/TokenScanner'
import TokenMatcher from '../src/TokenMatcher'
import { incrementing } from '../src/IdGenerator'

describe('Parser', function() {
  it('parses a simple feature', function() {
    const parser = new Parser(new AstBuilder(incrementing()))
    const scanner = new TokenScanner('Feature: hello')
    const matcher = new TokenMatcher()
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
    const parser = new Parser(new AstBuilder(incrementing()))
    const matcher = new TokenMatcher()
    const ast1 = parser.parse(new TokenScanner('Feature: hello'), matcher)
    const ast2 = parser.parse(new TokenScanner('Feature: hello again'), matcher)

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
    const parser = new Parser(new AstBuilder(incrementing()))
    const matcher = new TokenMatcher()
    let ast: messages.IGherkinDocument
    try {
      parser.parse(
        new TokenScanner(
          '# a comment\n' +
            'Feature: Foo\n' +
            '  Scenario: Bar\n' +
            '    Given x\n' +
            '      ```\n' +
            '      unclosed docstring\n'
        ),
        matcher
      )
    } catch (expected) {
      ast = parser.parse(
        new TokenScanner(
          'Feature: Foo\n' +
            '  Scenario: Bar\n' +
            '    Given x\n' +
            '      """\n' +
            '      closed docstring\n' +
            '      """'
        ),
        matcher
      )
    }

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
                id: '0',
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
    const parser = new Parser(new AstBuilder(incrementing()))
    const matcher = new TokenMatcher('no')
    const scanner = new TokenScanner('Egenskap: i18n support')
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
