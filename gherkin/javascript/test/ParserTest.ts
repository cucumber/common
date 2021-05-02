import assert from 'assert'
import * as messages from '@cucumber/messages'
import AstBuilder from '../src/AstBuilder'
import Parser from '../src/Parser'
import TokenMatcher from '../src/TokenMatcher'
import generateMessages from '../src/generateMessages'
import AstNode from '../src/AstNode'

describe('Parser', function () {
  it('parses a simple feature', function () {
    const parser = new Parser<AstNode>(
      new AstBuilder(messages.IdGenerator.incrementing()),
      new TokenMatcher()
    )
    const ast = parser.parse('Feature: hello')
    const gherkinDocument: messages.GherkinDocument = {
      feature: {
        description: '',
        tags: [],
        location: { line: 1, column: 1 },
        language: 'en',
        keyword: 'Feature',
        name: 'hello',
        children: [],
      },
      comments: [],
    }
    assert.deepStrictEqual(ast, gherkinDocument)
  })

  it('parses multiple features', function () {
    const parser = new Parser(
      new AstBuilder(messages.IdGenerator.incrementing()),
      new TokenMatcher()
    )
    const ast1 = parser.parse('Feature: hello')
    const ast2 = parser.parse('Feature: hello again')

    const gherkinDocument1: messages.GherkinDocument = {
      feature: {
        tags: [],
        description: '',
        location: { line: 1, column: 1 },
        language: 'en',
        keyword: 'Feature',
        name: 'hello',
        children: [],
      },
      comments: [],
    }
    assert.deepStrictEqual(ast1, gherkinDocument1)
    const gherkinDocument2: messages.GherkinDocument = {
      feature: {
        tags: [],
        description: '',
        location: { line: 1, column: 1 },
        language: 'en',
        keyword: 'Feature',
        name: 'hello again',
        children: [],
      },
      comments: [],
    }
    assert.deepStrictEqual(ast2, gherkinDocument2)
  })

  it('parses feature after parse error', function () {
    const parser = new Parser(
      new AstBuilder(messages.IdGenerator.incrementing()),
      new TokenMatcher()
    )
    let ast: messages.GherkinDocument
    try {
      parser.parse(
        '# a comment\n' +
          'Feature: Foo\n' +
          '  Scenario: Bar\n' +
          '    Given x\n' +
          '      ```\n' +
          '      unclosed docstring\n'
      )
    } catch (expected) {
      ast = parser.parse(
        'Feature: Foo\n' +
          '  Scenario: Bar\n' +
          '    Given x\n' +
          '      """\n' +
          '      closed docstring\n' +
          '      """'
      )
    }

    const gherkinDocument: messages.GherkinDocument = {
      feature: {
        tags: [],
        description: '',
        location: { line: 1, column: 1 },
        language: 'en',
        keyword: 'Feature',
        name: 'Foo',
        children: [
          {
            scenario: {
              id: '1',
              description: '',
              examples: [],
              keyword: 'Scenario',
              location: { line: 2, column: 3 },
              name: 'Bar',
              steps: [
                {
                  id: '0',
                  dataTable: undefined,
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
    }
    assert.deepStrictEqual(ast, gherkinDocument)
  })

  it('it interpolates data tables', function () {
    const envelopes = generateMessages(
      'Feature: Foo\n' +
        '  Scenario Outline: Parenthesis\n' +
        '    Given the thing <is (not) triggered> and has <value>\n' +
        '  Examples:\n' +
        '    | is (not) triggered | value |\n' +
        '    | is triggered       | foo   |\n ',
      '',
      { includePickles: true, newId: messages.IdGenerator.incrementing() }
    )

    const pickle = envelopes.find((envelope) => envelope.pickle).pickle

    assert.strictEqual(pickle.steps[0].text, 'the thing is triggered and has foo')
  })

  it('can change the default language', function () {
    const matcher = new TokenMatcher('no')
    const parser = new Parser(new AstBuilder(messages.IdGenerator.incrementing()), matcher)
    const ast = parser.parse('Egenskap: i18n support')
    const gherkinDocument: messages.GherkinDocument = {
      feature: {
        tags: [],
        description: '',
        location: { line: 1, column: 1 },
        language: 'no',
        keyword: 'Egenskap',
        name: 'i18n support',
        children: [],
      },
      comments: [],
    }
    assert.deepStrictEqual(ast, gherkinDocument)
  })
})
