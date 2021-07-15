import { CucumberExpression, ParameterTypeRegistry } from '@cucumber/cucumber-expressions'
import assert from 'assert'
import StepDocumentBuilder from '../src/StepDocumentBuilder'
import { StepDocument } from '../src'

describe('StepDocumentBuilder', () => {
  it('builds step documents', () => {
    const registry = new ParameterTypeRegistry()
    const expression = new CucumberExpression('I have {int} cukes in/on my {word}', registry)
    const builder = new StepDocumentBuilder(expression)
    builder.update('I have 42 cukes in my belly')
    builder.update('I have 54 cukes on my table')
    builder.update('I have 54 cukes in my basket')

    const expectedDocuments: StepDocument[] = [
      {
        suggestion: 'I have {int} cukes in my {word}',
        segments: ['I have ', ['42', '54'], ' cukes in my ', ['basket', 'belly', 'table']],
      },
      {
        suggestion: 'I have {int} cukes on my {word}',
        segments: ['I have ', ['42', '54'], ' cukes on my ', ['basket', 'belly', 'table']],
      },
    ]

    assert.deepStrictEqual(builder.getStepDocuments(), expectedDocuments)
  })

  it('builds step documents with a max number of choices', () => {
    const registry = new ParameterTypeRegistry()

    const expression = new CucumberExpression('I have {int} cukes in/on my {word}', registry)
    const builder = new StepDocumentBuilder(expression)
    builder.update('I have 42 cukes in my belly')
    builder.update('I have 54 cukes on my table')
    builder.update('I have 67 cukes in my belly')
    builder.update('I have 54 cukes in my basket')

    const expectedDocuments: StepDocument[] = [
      {
        suggestion: 'I have {int} cukes in my {word}',
        segments: ['I have ', ['42', '54'], ' cukes in my ', ['basket', 'belly']],
      },
      {
        suggestion: 'I have {int} cukes on my {word}',
        segments: ['I have ', ['42', '54'], ' cukes on my ', ['basket', 'belly']],
      },
    ]
    assert.deepStrictEqual(builder.getStepDocuments(2), expectedDocuments)
  })
})
