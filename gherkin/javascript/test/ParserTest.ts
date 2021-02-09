import assert from 'assert'
import { messages, IdGenerator } from '@cucumber/messages'
import AstBuilder from '../src/AstBuilder'
import Parser from '../src/Parser'
import TokenMatcher from '../src/TokenMatcher'
import AstNode from '../src/AstNode'
import generateMessages from '../src/generateMessages'
import { GherkinMediaType } from '../src'

describe('Parser', function () {
  it('parses a simple feature', function () {
    const parser = new Parser<AstNode>(
      new AstBuilder(IdGenerator.incrementing())
    )
    const ast = parser.parse('Feature: hello')
    assert.deepStrictEqual(
      ast,
      messages.GherkinDocument.fromObject({
        feature: {
          tags: [],
          location: { line: 1, column: 1 },
          language: 'en',
          keyword: 'Feature',
          name: 'hello',
          children: [],
        },
        comments: [],
      })
    )
  })

  it('parses multiple features', function () {
    const parser = new Parser(new AstBuilder(IdGenerator.incrementing()))
    const ast1 = parser.parse('Feature: hello')
    const ast2 = parser.parse('Feature: hello again')

    assert.deepStrictEqual(
      ast1,
      messages.GherkinDocument.fromObject({
        feature: {
          tags: [],
          location: { line: 1, column: 1 },
          language: 'en',
          keyword: 'Feature',
          name: 'hello',
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
          children: [],
        },
        comments: [],
      })
    )
  })

  it('parses feature after parse error', function () {
    const parser = new Parser(new AstBuilder(IdGenerator.incrementing()))
    let ast: messages.IGherkinDocument
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

    assert.deepStrictEqual(
      ast,
      messages.GherkinDocument.fromObject({
        feature: {
          tags: [],
          location: { line: 1, column: 1 },
          language: 'en',
          keyword: 'Feature',
          name: 'Foo',
          children: [
            {
              scenario: {
                id: '1',
                examples: [],
                keyword: 'Scenario',
                location: { line: 2, column: 3 },
                name: 'Bar',
                steps: [
                  {
                    id: '0',
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

  it('interpolates data tables', function () {
    const envelopes = generateMessages(
      'Feature: Foo\n' +
        '  Scenario Outline: Parenthesis\n' +
        '    Given the thing <is (not) triggered> and has <value>\n' +
        '  Examples:\n' +
        '    | is (not) triggered | value |\n' +
        '    | is triggered       | foo   |\n ',
      '',
      GherkinMediaType.PLAIN,
      { includePickles: true, newId: IdGenerator.incrementing() }
    )

    const pickle = envelopes.find((envelope) => envelope.pickle).pickle

    assert.strictEqual(
      pickle.steps[0].text,
      'the thing is triggered and has foo'
    )
  })

  it('can change the default language', function () {
    const parser = new Parser(new AstBuilder(IdGenerator.incrementing()))
    const matcher = new TokenMatcher('no')
    const ast = parser.parse('Egenskap: i18n support', matcher)
    assert.deepStrictEqual(
      ast,
      messages.GherkinDocument.fromObject({
        feature: {
          tags: [],
          location: { line: 1, column: 1 },
          language: 'no',
          keyword: 'Egenskap',
          name: 'i18n support',
          children: [],
        },
        comments: [],
      })
    )
  })

  it('parses markdown with docstring', function () {
    const markdown = `
## Feature: DocString variations
### Scenario: minimalistic
* And a DocString with an escaped alternative separator inside
\`\`\`\`
\`\`\`what
\`\`\`\`
`
    const envelopes = generateMessages(
      markdown,
      'test.md',
      GherkinMediaType.MARKDOWN,
      {
        includePickles: true,
        includeGherkinDocument: true,
        newId: IdGenerator.incrementing(),
      }
    )

    const pickle = envelopes.find((envelope) => envelope.pickle).pickle

    assert.strictEqual(
      pickle.steps[0].text,
      'a DocString with an escaped alternative separator inside'
    )
  })
})
