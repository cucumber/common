import * as assert from 'assert'
import ExpressionFactory from '../src/ExpressionFactory'
import ParameterTypeRegistry from '../src/ParameterTypeRegistry'
import RegularExpression from '../src/RegularExpression'
import CucumberExpression from '../src/CucumberExpression'

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
    assert.throws(() => expressionFactory.createExpression('{x}'), {
      message: 'Undefined parameter type {x}',
    })
  })
})
