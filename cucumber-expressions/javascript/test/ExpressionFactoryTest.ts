import * as assert from 'assert'
import ExpressionFactory from '../src/ExpressionFactory'
import ParameterTypeRegistry from '../src/ParameterTypeRegistry'
import RegularExpression from '../src/RegularExpression'
import CucumberExpression from '../src/CucumberExpression'
import UndefinedParameterTypeExpression from '../src/UndefinedParameterTypeExpression'

describe('ExpressionFactory', () => {
  let expressionFactory: ExpressionFactory
  beforeEach(() => {
    expressionFactory = new ExpressionFactory(new ParameterTypeRegistry())
  })

  it('creates a RegularExpression', () => {
    assert.equal(
      expressionFactory.createExpression(/x/).constructor,
      RegularExpression
    )
  })

  it('creates a CucumberExpression', () => {
    assert.equal(
      expressionFactory.createExpression('x').constructor,
      CucumberExpression
    )
  })

  it('creates an UndefinedParameterTypeExpression', () => {
    const expression = expressionFactory.createExpression('{x}')
    assert.equal(expression.constructor, UndefinedParameterTypeExpression)
    assert.deepStrictEqual(
      expression.undefinedParameterTypeNames,
      new Set(['x'])
    )
  })
})
