import { CucumberExpression, ParameterTypeRegistry } from '@cucumber/cucumber-expressions'
import assert from 'assert'
import PermutationExpressionBuilder from '../src/PermutationExpressionBuilder'

describe('PermutationExpressionBuilder', () => {
  it('builds permutation expressions', () => {
    const registry = new ParameterTypeRegistry()

    const expression = new CucumberExpression('I have {int} cukes in/on my {word}', registry)
    const builder = new PermutationExpressionBuilder(expression)
    builder.update('I have 42 cukes in my belly')
    builder.update('I have 54 cukes on my table')
    builder.update('I have 54 cukes in my basket')

    assert.deepStrictEqual(builder.toPermutationExpressions(), [
      ['I have ', ['42', '54'], ' cukes in my ', ['basket', 'belly', 'table']],
      ['I have ', ['42', '54'], ' cukes on my ', ['basket', 'belly', 'table']],
    ])
  })
})
