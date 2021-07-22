import { ExpressionFactory, ParameterTypeRegistry } from '@cucumber/cucumber-expressions'
import assert from 'assert'
import buildStepDocuments from '../src/buildStepDocuments'
import { StepDocument } from '../src'

describe('buildStepDocuments', () => {
  it('builds step documents with global choices', () => {
    assertStepDocuments(
      ['The nice song', 'The big boat'],
      ['The {word} song', 'The {word} boat'],
      [
        {
          suggestion: 'The {word} boat',
          segments: ['The ', ['big', 'nice'], ' boat'],
        },
        {
          suggestion: 'The {word} song',
          segments: ['The ', ['big', 'nice'], ' song'],
        },
      ]
    )
  })

  it('builds step documents from CucumberExpression', () => {
    assertStepDocuments(
      [
        'I have 42 cukes in my belly',
        'I have 54 cukes on my table',
        'I have 54 cukes in my basket',
      ],
      ['I have {int} cukes in/on my {word}'],
      [
        {
          suggestion: 'I have {int} cukes in my {word}',
          segments: ['I have ', ['42', '54'], ' cukes in my ', ['basket', 'belly', 'table']],
        },
        {
          suggestion: 'I have {int} cukes on my {word}',
          segments: ['I have ', ['42', '54'], ' cukes on my ', ['basket', 'belly', 'table']],
        },
      ]
    )
  })

  it('builds step documents from RegularExpression', () => {
    assertStepDocuments(
      ['I have 42 cukes in my "belly"', 'I have 54 cukes in my "suitcase"'],
      [/I have (\d\d) cukes in my "(belly|suitcase)"/],
      [
        {
          suggestion: 'I have {} cukes in my "{}"',
          segments: ['I have ', ['42', '54'], ' cukes in my "', ['belly', 'suitcase'], '"'],
        },
      ]
    )
  })

  it('builds step documents with a max number of choices', () => {
    assertStepDocuments(
      [
        'I have 42 cukes in my belly',
        'I have 54 cukes on my table',
        'I have 67 cukes in my belly',
        'I have 54 cukes in my basket',
      ],
      ['I have {int} cukes in/on my {word}'],
      [
        {
          suggestion: 'I have {int} cukes in my {word}',
          segments: ['I have ', ['42', '54'], ' cukes in my ', ['basket', 'belly']],
        },
        {
          suggestion: 'I have {int} cukes on my {word}',
          segments: ['I have ', ['42', '54'], ' cukes on my ', ['basket', 'belly']],
        },
      ],
      2
    )
  })
})

function assertStepDocuments(
  stepTexts: readonly string[],
  expressions: readonly (string | RegExp)[],
  expectedStepDocuments: StepDocument[],
  maxChoices = 10
) {
  const ef = new ExpressionFactory(new ParameterTypeRegistry())
  const stepDocuments = buildStepDocuments(
    stepTexts,
    expressions.map((expression) => ef.createExpression(expression)),
    maxChoices
  )
  assert.deepStrictEqual(stepDocuments, expectedStepDocuments)
}
