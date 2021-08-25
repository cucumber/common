import assert from 'assert'
import { Errors } from '../src/index.js'

describe('Errors', () => {
  it('AstBuilderException is an instance of AstBuilderException', () => {
    const error = Errors.AstBuilderException.create('hello', { line: 1, column: 2 })
    assert(error instanceof Errors.AstBuilderException)
  })
})
