import assert from 'assert'
import { SupportCode } from '@cucumber/fake-cucumber'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { Query as CucumberQuery } from '@cucumber/query'
import { messages } from '@cucumber/messages'
import filterByStatus from '../../src/filter/filterByStatus'
import { pretty } from '@cucumber/gherkin-utils'
import runFeature, { FailingHook } from '../runFeature'

function scenarioNames(gherkinDocument: messages.IGherkinDocument): string[] {
  if (gherkinDocument === null) {
    return []
  }

  return gherkinDocument.feature.children
    .filter((child) => child.scenario)
    .map((child) => child.scenario.name)
}

describe('filterByStatus', () => {
  let gherkinQuery: GherkinQuery
  let cucumberQuery: CucumberQuery
  let supportCode: SupportCode

  const feature = `
Feature: statuses

  Scenario: passed
    Given a passed step

  Scenario: failed
    Given a failed step

  Scenario: undefined
    Given we have no clue how to handle this step
    `

  beforeEach(() => {
    gherkinQuery = new GherkinQuery()
    cucumberQuery = new CucumberQuery()
    supportCode = new SupportCode()
    supportCode.defineStepDefinition(null, 'a passed step', () => null)
    supportCode.defineStepDefinition(null, 'a failed step', () => {
      throw new Error('Something bad happened here ...')
    })
  })

  it('only accepts scenarios having one of the expected results', async () => {
    const emitted = await runFeature(feature, gherkinQuery, supportCode)
    const gherkinDocument = emitted.find((envelope) => envelope.gherkinDocument)
      .gherkinDocument
    emitted.map((message) => cucumberQuery.update(message))

    const passedScenarios = filterByStatus(
      gherkinDocument,
      gherkinQuery,
      cucumberQuery,
      [messages.TestStepFinished.TestStepResult.Status.PASSED]
    )

    assert.deepStrictEqual(scenarioNames(passedScenarios), ['passed'])

    const failedScenarios = filterByStatus(
      gherkinDocument,
      gherkinQuery,
      cucumberQuery,
      [messages.TestStepFinished.TestStepResult.Status.FAILED]
    )
    assert.deepStrictEqual(scenarioNames(failedScenarios), ['failed'])

    const undefinedScenarios = filterByStatus(
      gherkinDocument,
      gherkinQuery,
      cucumberQuery,
      [messages.TestStepFinished.TestStepResult.Status.UNDEFINED]
    )
    assert.deepStrictEqual(scenarioNames(undefinedScenarios), ['undefined'])
  })

  it('can filter with multiple statuses', async () => {
    const emitted = await runFeature(feature, gherkinQuery, supportCode)
    const gherkinDocument = emitted.find((envelope) => envelope.gherkinDocument)
      .gherkinDocument
    emitted.map((message) => cucumberQuery.update(message))

    const passedAndFailedScenarios = filterByStatus(
      gherkinDocument,
      gherkinQuery,
      cucumberQuery,
      [
        messages.TestStepFinished.TestStepResult.Status.PASSED,
        messages.TestStepFinished.TestStepResult.Status.FAILED,
      ]
    )
    assert.deepStrictEqual(scenarioNames(passedAndFailedScenarios), [
      'passed',
      'failed',
    ])
  })

  context('when using examples', () => {
    const featureWithExamples = `Feature: with examples

  Scenario: using examples
    Given a <status> step

    Examples: some statuses
      | status |
      | passed |
      | failed |
`
    it('does not keep scenarios when no result matches', async () => {
      const emitted = await runFeature(
        featureWithExamples,
        gherkinQuery,
        supportCode
      )
      const gherkinDocument = emitted.find(
        (envelope) => envelope.gherkinDocument
      ).gherkinDocument
      emitted.map((message) => cucumberQuery.update(message))

      const pendingScenarios = filterByStatus(
        gherkinDocument,
        gherkinQuery,
        cucumberQuery,
        [messages.TestStepFinished.TestStepResult.Status.PENDING]
      )

      assert.deepStrictEqual(scenarioNames(pendingScenarios), [])
    })

    it('does not drop the lines of Example tables with the incorrect status', async () => {
      const emitted = await runFeature(
        featureWithExamples,
        gherkinQuery,
        supportCode
      )

      const gherkinDocument = emitted.find(
        (envelope) => envelope.gherkinDocument
      ).gherkinDocument
      emitted.map((message) => cucumberQuery.update(message))

      const onlyPassedScenarios = filterByStatus(
        gherkinDocument,
        gherkinQuery,
        cucumberQuery,
        [messages.TestStepFinished.TestStepResult.Status.PASSED]
      )

      assert.strictEqual(pretty(onlyPassedScenarios), featureWithExamples)
    })
  })

  context('when before hook steps fail', () => {
    it('takes those step statuses into account', async () => {
      supportCode.registerBeforeHook(new FailingHook('1234-5678'))

      const emitted = await runFeature(feature, gherkinQuery, supportCode)
      const gherkinDocument = emitted.find(
        (envelope) => envelope.gherkinDocument
      ).gherkinDocument
      emitted.map((message) => cucumberQuery.update(message))

      const onlyFailedScenarios = filterByStatus(
        gherkinDocument,
        gherkinQuery,
        cucumberQuery,
        [messages.TestStepFinished.TestStepResult.Status.FAILED]
      )

      assert.deepStrictEqual(scenarioNames(onlyFailedScenarios), [
        'passed',
        'failed',
        'undefined',
      ])
    })
  })

  context('when after hook steps fail', () => {
    it('takes those step statuses into account', async () => {
      supportCode.registerAfterHook(new FailingHook('1234-5678'))

      const emitted = await runFeature(feature, gherkinQuery, supportCode)
      const gherkinDocument = emitted.find(
        (envelope) => envelope.gherkinDocument
      ).gherkinDocument
      emitted.map((message) => cucumberQuery.update(message))

      const onlyFailedScenarios = filterByStatus(
        gherkinDocument,
        gherkinQuery,
        cucumberQuery,
        [messages.TestStepFinished.TestStepResult.Status.FAILED]
      )

      assert.deepStrictEqual(scenarioNames(onlyFailedScenarios), [
        'passed',
        'failed',
        'undefined',
      ])
    })
  })
})
