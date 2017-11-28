/* eslint-env mocha */
const assertThrows = require('./assert_throws')
const ParameterType = require('../src/parameter_type')

describe('ParameterType', () => {
  it('exposes group source', () => {
    assertThrows(
      () =>
        new ParameterType(
          'case-insensitive',
          /[a-z]+/i,
          String,
          s => s,
          true,
          true
        ),
      "ParameterType Regexps can't use flag 'i'"
    )
  })
})
