/* eslint-env mocha */
const assert = require('assert')
const ParameterType = require('../src/parameter_type')
const CombinatorialGeneratedExpressionFactory = require('../src/combinatorial_generated_expression_factory')

describe('CucumberExpressionGenerator', () => {
  it('generates multiple expressions', () => {
    const parameterTypeCombinations = [
      [
        new ParameterType('color', null, /red|blue|yellow/, false, null),
        new ParameterType('csscolor', null, /red|blue|yellow/, false, null),
      ],
      [
        new ParameterType('date', null, /\d{4}-\d{2}-\d{2}/, false, null),
        new ParameterType('datetime', null, /\d{4}-\d{2}-\d{2}/, false, null),
        new ParameterType('timestamp', null, /\d{4}-\d{2}-\d{2}/, false, null),
      ],
    ]

    const factory = new CombinatorialGeneratedExpressionFactory(
      'I bought a {%s} ball on {%s}',
      parameterTypeCombinations
    )
    const expressions = factory.generateExpressions().map(ge => ge.source)
    assert.deepEqual(expressions, [
      'I bought a {color} ball on {date}',
      'I bought a {color} ball on {datetime}',
      'I bought a {color} ball on {timestamp}',
      'I bought a {csscolor} ball on {date}',
      'I bought a {csscolor} ball on {datetime}',
      'I bought a {csscolor} ball on {timestamp}',
    ])
  })
})
