import assert from 'assert'
import TokenMatcher from '../src/TokenMatcher'
import { NoSuchLanguageException } from '../src/Errors'

describe('TokenMatcher', function () {
  it('throws for invalid languages', function () {
    assert.throws(() => new TokenMatcher('en-US'), NoSuchLanguageException.create('en-US'))
  })
})
