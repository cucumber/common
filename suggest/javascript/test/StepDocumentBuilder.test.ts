import { CucumberExpression, ParameterTypeRegistry, RegularExpression } from '@cucumber/cucumber-expressions'
import assert from 'assert'
import StepDocumentBuilder from '../src/StepDocumentBuilder'
import { StepDocument } from '../src'

describe('StepDocumentBuilder', () => {
  xit('builds step documents with global choices', () => {
    const registry = new ParameterTypeRegistry()
    const expression1 = new CucumberExpression('The {word} song', registry)
    const expression2 = new CucumberExpression('The {word} boat', registry)

    const choicesByParameterTypeRegexpStrings = new Map<string,Set<string>>()
    const builder1 = new StepDocumentBuilder(expression1, choicesByParameterTypeRegexpStrings)
    const builder2 = new StepDocumentBuilder(expression2, choicesByParameterTypeRegexpStrings)
    builder1.update('The nice song')
    builder2.update('The big boat')

    const expected1: StepDocument[] = [
      {
        suggestion: 'The {word} song',
        segments: ['The ', ['big', 'nice'], ' song'],
      }
    ]

    const expected2: StepDocument[] = [
      {
        suggestion: 'The {word} boat',
        segments: ['The ', ['big', 'nice'], ' song'],
      },
    ]

    assert.deepStrictEqual(builder1.getStepDocuments(), expected1)
    assert.deepStrictEqual(builder2.getStepDocuments(), expected1)
  })

  it('builds step documents from CucumberExpression', () => {
    const registry = new ParameterTypeRegistry()
    const expression = new CucumberExpression('I have {int} cukes in/on my {word}', registry)
    const choicesByParameterTypeRegexpStrings = new Map<string,Set<string>>()
    const builder = new StepDocumentBuilder(expression, choicesByParameterTypeRegexpStrings)
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

  it('builds step documents from RegularExpression', () => {
    const registry = new ParameterTypeRegistry()
    const expression = new RegularExpression(/I have (\d\d) cukes in my "(belly|suitcase)"/, registry)
    const choicesByParameterTypeRegexpStrings = new Map<string,Set<string>>()
    const builder = new StepDocumentBuilder(expression, choicesByParameterTypeRegexpStrings)
    builder.update('I have 42 cukes in my "belly"')
    builder.update('I have 54 cukes in my "suitcase"')

    const expectedDocuments: StepDocument[] = [
      {
        suggestion: 'I have {} cukes in my "{}"',
        segments: ['I have ', ['42', '54'], ' cukes in my "', ['belly', 'suitcase'], '"'],
      },
    ]

    assert.deepStrictEqual(builder.getStepDocuments(), expectedDocuments)
  })

  it('builds step documents with a max number of choices', () => {
    const registry = new ParameterTypeRegistry()

    const expression = new CucumberExpression('I have {int} cukes in/on my {word}', registry)
    const choicesByParameterTypeRegexpStrings = new Map<string,Set<string>>()
    const builder = new StepDocumentBuilder(expression, choicesByParameterTypeRegexpStrings)
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
