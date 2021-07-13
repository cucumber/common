import { CucumberExpression, ParameterTypeRegistry } from '@cucumber/cucumber-expressions'
import assert from 'assert'
import StepDocumentBuilder from '../src/StepDocumentBuilder'

describe('StepDocumentBuilder', () => {
  it('builds step documents', () => {
    const registry = new ParameterTypeRegistry()

    const expression = new CucumberExpression('I have {int} cukes in/on my {word}', registry)
    const builder = new StepDocumentBuilder(expression)
    builder.update('I have 42 cukes in my belly')
    builder.update('I have 54 cukes on my table')
    builder.update('I have 54 cukes in my basket')

    assert.deepStrictEqual(builder.getStepDocuments(), [
      ['I have ', ['42', '54'], ' cukes in my ', ['basket', 'belly', 'table']],
      ['I have ', ['42', '54'], ' cukes on my ', ['basket', 'belly', 'table']],
    ])
  })

  it('builds step documents with a max number of choices', () => {
    const registry = new ParameterTypeRegistry()

    const expression = new CucumberExpression('I have {int} cukes in/on my {word}', registry)
    const builder = new StepDocumentBuilder(expression)
    builder.update('I have 42 cukes in my belly')
    builder.update('I have 54 cukes on my table')
    builder.update('I have 67 cukes in my belly')
    builder.update('I have 54 cukes in my basket')

    assert.deepStrictEqual(builder.getStepDocuments(2), [
      ['I have ', ['42', '54'], ' cukes in my ', ['basket', 'belly']],
      ['I have ', ['42', '54'], ' cukes on my ', ['basket', 'belly']],
    ])
  })
})
