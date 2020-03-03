import ParameterType from '../src/ParameterType'
import * as assert from 'assert'

describe('ParameterType', () => {
  it('does not allow ignore flag on regexp', () => {
    assert.throws(
      () =>
        new ParameterType(
          'case-insensitive',
          /[a-z]+/i,
          String,
          s => s,
          true,
          true
        ),
      { message: "ParameterType Regexps can't use flag 'i'" }
    )
  })
})
