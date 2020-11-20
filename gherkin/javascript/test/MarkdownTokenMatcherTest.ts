import assert from 'assert'
import GherkinLine from '../src/GherkinLine'
import { messages } from '@cucumber/messages'
import Token from '../src/Token'
import { TokenType } from '../src/Parser'
import MarkdownTokenMatcher from '../src/MarkdownTokenMatcher'
import ITokenMatcher from '../src/ITokenMatcher'

describe('TokenMatcher', function () {
  let tm: ITokenMatcher
  let location: messages.ILocation

  beforeEach(() => {
    tm = new MarkdownTokenMatcher('en')
    location = messages.Location.create({ line: 1, column: 1 })
  })

  it('matches FeatureLine', () => {
    const line = new GherkinLine('## Feature: hello', location.line)
    const token = new Token(line, location)
    assert(tm.match_FeatureLine(token))
    assert.strictEqual(token.matchedType, TokenType.FeatureLine)
    assert.strictEqual(token.matchedKeyword, 'Feature')
    assert.strictEqual(token.matchedText, 'hello')
  })

  it('matches FeatureLine in French', () => {
    tm = new MarkdownTokenMatcher('fr')
    const line = new GherkinLine('## Fonctionnalité: hello', location.line)
    const token = new Token(line, location)
    assert(tm.match_FeatureLine(token))
    assert.strictEqual(token.matchedType, TokenType.FeatureLine)
    assert.strictEqual(token.matchedKeyword, 'Fonctionnalité')
    assert.strictEqual(token.matchedText, 'hello')
  })

  it('matches Step', () => {
    const line = new GherkinLine('* Given I have 3 cukes', location.line)
    const token = new Token(line, location)
    assert(tm.match_StepLine(token))
    assert.strictEqual(token.matchedType, TokenType.StepLine)
    assert.strictEqual(token.matchedKeyword, 'Given ')
    assert.strictEqual(token.matchedText, 'I have 3 cukes')
  })

  it('matches a non-keyword line as empty', () => {
    const line = new GherkinLine('whatever Given', location.line)
    const token = new Token(line, location)
    assert(tm.match_Empty(token))
    assert.strictEqual(token.matchedType, TokenType.Empty)
  })

  it('matches a non-keyword bullet line as empty', () => {
    const line = new GherkinLine('* whatever Given', location.line)
    const token = new Token(line, location)
    assert(tm.match_Empty(token))
    assert.strictEqual(token.matchedType, TokenType.Empty)
  })

  it('matches a non-keyword header line as empty', () => {
    const line = new GherkinLine('## The world is wet', location.line)
    const token = new Token(line, location)
    assert(tm.match_Empty(token))
    assert.strictEqual(token.matchedType, TokenType.Empty)
  })
})
