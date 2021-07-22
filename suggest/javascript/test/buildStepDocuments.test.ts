import {
  CucumberExpression,
  ParameterTypeRegistry,
  RegularExpression,
} from '@cucumber/cucumber-expressions'
import assert from 'assert'
import buildStepDocuments from '../src/buildStepDocuments'
import { StepDocument } from '../src'

describe('StepDocumentBuilder', () => {
  xit('builds step documents with global choices', () => {
    const registry = new ParameterTypeRegistry()
    const expression1 = new CucumberExpression('The {word} song', registry)
    const expression2 = new CucumberExpression('The {word} boat', registry)

    const stepDocuments = buildStepDocuments(
      ['The nice song', 'The big boat'],
      [expression1, expression2]
    )

    const expected1: StepDocument[] = [
      {
        suggestion: 'The {word} song',
        segments: ['The ', ['big', 'nice'], ' song'],
      },
    ]

    const expected2: StepDocument[] = [
      {
        suggestion: 'The {word} boat',
        segments: ['The ', ['big', 'nice'], ' song'],
      },
    ]

    assert.deepStrictEqual(stepDocuments, [expected2, expected1])
  })

  it('builds step documents from CucumberExpression', () => {
    const registry = new ParameterTypeRegistry()
    const expression = new CucumberExpression('I have {int} cukes in/on my {word}', registry)

    const stepDocuments = buildStepDocuments(
      [
        'I have 42 cukes in my belly',
        'I have 54 cukes on my table',
        'I have 54 cukes in my basket',
      ],
      [expression]
    )

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

    assert.deepStrictEqual(stepDocuments, expectedDocuments)
  })

  it('builds step documents from RegularExpression', () => {
    const registry = new ParameterTypeRegistry()
    const expression = new RegularExpression(
      /I have (\d\d) cukes in my "(belly|suitcase)"/,
      registry
    )

    const stepDocuments = buildStepDocuments(
      ['I have 42 cukes in my "belly"', 'I have 54 cukes in my "suitcase"'],
      [expression]
    )

    const expectedDocuments: StepDocument[] = [
      {
        suggestion: 'I have {} cukes in my "{}"',
        segments: ['I have ', ['42', '54'], ' cukes in my "', ['belly', 'suitcase'], '"'],
      },
    ]

    assert.deepStrictEqual(stepDocuments, expectedDocuments)
  })

  it('builds step documents with a max number of choices', () => {
    const registry = new ParameterTypeRegistry()

    const expression = new CucumberExpression('I have {int} cukes in/on my {word}', registry)
    const stepDocuments = buildStepDocuments(
      [
        'I have 42 cukes in my belly',
        'I have 54 cukes on my table',
        'I have 67 cukes in my belly',
        'I have 54 cukes in my basket',
      ],
      [expression],
      2
    )

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
    assert.deepStrictEqual(stepDocuments, expectedDocuments)
  })
})
