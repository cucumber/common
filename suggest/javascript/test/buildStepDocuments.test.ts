import { Expression, ExpressionFactory, ParameterTypeRegistry } from '@cucumber/cucumber-expressions'
import assert from 'assert'
import { StepDocument, buildStepDocuments } from '../src'

describe('buildStepDocuments', () => {
  it('builds step documents with global choices', () => {
    const ef = new ExpressionFactory(new ParameterTypeRegistry())
    const e1 = ef.createExpression('The {word} song')
    const e2 = ef.createExpression('The {word} boat')

    assertStepDocuments(
      ['The nice song', 'The big boat'],
      [e1, e2],
      [
        {
          suggestion: 'The {word} boat',
          segments: ['The ', ['big', 'nice'], ' boat'],
          expression: e2
        },
        {
          suggestion: 'The {word} song',
          segments: ['The ', ['big', 'nice'], ' song'],
          expression: e1
        },
      ]
    )
  })

  it('builds step documents from CucumberExpression', () => {
    const ef = new ExpressionFactory(new ParameterTypeRegistry())
    const expression = ef.createExpression('I have {int} cukes in/on my {word}')
    assertStepDocuments(
      [
        'I have 42 cukes in my belly',
        'I have 54 cukes on my table',
        'I have 54 cukes in my basket',
      ],
      [expression],
      [
        {
          suggestion: 'I have {int} cukes in my {word}',
          segments: ['I have ', ['42', '54'], ' cukes in my ', ['basket', 'belly', 'table']],
          expression
        },
        {
          suggestion: 'I have {int} cukes on my {word}',
          segments: ['I have ', ['42', '54'], ' cukes on my ', ['basket', 'belly', 'table']],
          expression,
        },
      ]
    )
  })

  it('builds step documents from RegularExpression', () => {
    const ef = new ExpressionFactory(new ParameterTypeRegistry())
    const expression = ef.createExpression(/I have (\d\d) cukes in my "(belly|suitcase)"/)
    assertStepDocuments(
      ['I have 42 cukes in my "belly"', 'I have 54 cukes in my "suitcase"'],
      [expression],
      [
        {
          suggestion: 'I have {} cukes in my "{}"',
          segments: ['I have ', ['42', '54'], ' cukes in my "', ['belly', 'suitcase'], '"'],
          expression
        },
      ]
    )
  })

  it('builds step documents with a max number of choices', () => {
    const ef = new ExpressionFactory(new ParameterTypeRegistry())
    const expression = ef.createExpression('I have {int} cukes in/on my {word}')
    assertStepDocuments(
      [
        'I have 42 cukes in my belly',
        'I have 54 cukes on my table',
        'I have 67 cukes in my belly',
        'I have 54 cukes in my basket',
      ],
      [expression],
      [
        {
          suggestion: 'I have {int} cukes in my {word}',
          segments: ['I have ', ['42', '54'], ' cukes in my ', ['basket', 'belly']],
          expression,
        },
        {
          suggestion: 'I have {int} cukes on my {word}',
          segments: ['I have ', ['42', '54'], ' cukes on my ', ['basket', 'belly']],
          expression,
        },
      ],
      2
    )
  })
})

function assertStepDocuments(
  stepTexts: readonly string[],
  expressions: readonly Expression[],
  expectedStepDocuments: StepDocument[],
  maxChoices = 10
) {
  const stepDocuments = buildStepDocuments(
    stepTexts,
    expressions,
    maxChoices
  )
  assert.deepStrictEqual(stepDocuments, expectedStepDocuments)
}
