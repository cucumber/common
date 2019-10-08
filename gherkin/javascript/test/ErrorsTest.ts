import assert from 'assert'
import { AstBuilderException } from '../src/Errors'

describe('Errors', () => {
  it('AstBuilderException is an instance of AstBuilderException', () => {
    const error = AstBuilderException.create('hello', { line: 1, column: 2 })
    assert(error instanceof AstBuilderException)
  })
})
