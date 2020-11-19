import assert from 'assert'
import TokenMatcher from '../src/TokenMatcher'
import GherkinLine from '../src/GherkinLine'
import { NoSuchLanguageException } from '../src/Errors'
import { messages } from '@cucumber/messages'
import Token from '../src/Token'
import { TokenType } from '../src/Parser'
import MarkdownTokenMatcher from '../src/MarkdownTokenMatcher'

describe('TokenMatcher', function () {
  it('throws for invalid languages', function () {
    assert.throws(
      () => new TokenMatcher('en-US'),
      NoSuchLanguageException.create('en-US')
    )
  })

  it('tokenizes FeatureLine', () => {
    const tm = new MarkdownTokenMatcher('en')
    const location = messages.Location.create({ line: 1, column: 1 })
    const line = new GherkinLine('## Feature: hello', location.line)
    const token = new Token(line, location)
    assert(tm.match_FeatureLine(token))
    assert.strictEqual(token.matchedType, TokenType.FeatureLine)
    assert.strictEqual(token.matchedKeyword, 'Feature')
    assert.strictEqual(token.matchedText, 'hello')
  })

  it('tokenizes FeatureLine in French', () => {
    const tm = new MarkdownTokenMatcher('fr')
    const location = messages.Location.create({ line: 1, column: 1 })
    const line = new GherkinLine('## Fonctionnalité: hello', location.line)
    const token = new Token(line, location)
    assert(tm.match_FeatureLine(token))
    assert.strictEqual(token.matchedType, TokenType.FeatureLine)
    assert.strictEqual(token.matchedKeyword, 'Fonctionnalité')
    assert.strictEqual(token.matchedText, 'hello')
  })
})
