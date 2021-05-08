import assert from 'assert'
import GherkinClassicTokenMatcher from '../src/GherkinClassicTokenMatcher'
import { NoSuchLanguageException } from '../src/Errors'
import * as messages from '@cucumber/messages'
import GherkinLine from '../src/GherkinLine'
import { Token, TokenType } from '../src/Parser'

describe('TokenMatcher', function () {
  it('throws for invalid languages', function () {
    assert.throws(
      () => new GherkinClassicTokenMatcher('en-US'),
      NoSuchLanguageException.create('en-US')
    )
  })

  it('tokenizes FeatureLine', () => {
    const tm = new GherkinClassicTokenMatcher()
    const location: messages.Location = { line: 1, column: 1 }
    const line = new GherkinLine('Feature: hello', location.line)
    const token = new Token(line, location)
    assert(tm.match_FeatureLine(token))
    assert.strictEqual(token.matchedType, TokenType.FeatureLine)
  })

  it('matches tags', () => {
    const tm = new GherkinClassicTokenMatcher()
    const gl = new GherkinLine('   @foo:bar  @zap🥒yo', 1)
    assert.deepStrictEqual(tm.getTags(gl), [
      { column: 4, text: '@foo:bar' },
      { column: 14, text: '@zap🥒yo' },
    ])
  })
})
