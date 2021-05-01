import assert from 'assert'
import TokenMatcher from '../src/TokenMatcher'
import { NoSuchLanguageException } from '../src/Errors'
import * as messages from '@cucumber/messages'
import GherkinLine from '../src/GherkinLine'
import { Token, TokenType } from '../src/Parser'

describe('TokenMatcher', function () {
  it('throws for invalid languages', function () {
    assert.throws(() => new TokenMatcher('en-US'), NoSuchLanguageException.create('en-US'))
  })

  it('tokenizes FeatureLine', () => {
    const tm = new TokenMatcher()
    const location: messages.Location = { line: 1, column: 1 }
    const line = new GherkinLine('Feature: hello', location.line)
    const token = new Token(line, location)
    assert(tm.match_FeatureLine(token))
    assert.strictEqual(token.matchedType, TokenType.FeatureLine)
  })
})
