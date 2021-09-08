import * as assert from 'assert'
import ExpressionFactory from '../src/ExpressionFactory.js'
import ParameterTypeRegistry from '../src/ParameterTypeRegistry.js'
import RegularExpression from '../src/RegularExpression.js'
import CucumberExpression from '../src/CucumberExpression.js'

describe('ExpressionFactory', () => {
  let expressionFactory: ExpressionFactory
  beforeEach(() => {
    expressionFactory = new ExpressionFactory(new ParameterTypeRegistry())
  })

  it('creates a RegularExpression', () => {
    assert.strictEqual(expressionFactory.createExpression(/x/).constructor, RegularExpression)
  })

  it('creates a CucumberExpression', () => {
    assert.strictEqual(expressionFactory.createExpression('x').constructor, CucumberExpression)
  })
})
