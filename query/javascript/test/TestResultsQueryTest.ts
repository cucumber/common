import 'source-map-support/register'
import gherkin, { GherkinQuery } from '@cucumber/gherkin'
import { IdGenerator, messages } from '@cucumber/messages'
import { pipeline, Readable, Writable } from 'stream'
import assert from 'assert'
import SupportCode from '@cucumber/fake-cucumber/dist/src/SupportCode'
import CucumberStream from '@cucumber/fake-cucumber/dist/src/CucumberStream'
import { withFullStackTrace } from '@cucumber/fake-cucumber/dist/src/ErrorMessageGenerator'
import makeDummyStepDefinitions from '@cucumber/fake-cucumber/dist/test/makeDummyStepDefinitions'

import { promisify } from 'util'
import IncrementClock from '@cucumber/fake-cucumber/dist/src/IncrementClock'
import TestResultsQuery from '../src/TestResultsQuery'

const pipelinePromise = promisify(pipeline)

describe('TestResultQuery', () => {
  let gherkinQuery: GherkinQuery
  let testResultQuery: TestResultsQuery
  beforeEach(() => {
    gherkinQuery = new GherkinQuery()
    testResultQuery = new TestResultsQuery()
  })

  describe('#getAllPickleResults(pickleIds)', () => {
    it('returns a single UNDEFINED when the list is empty', () => {
      const results = testResultQuery.getAllPickleResults([])
      assert.deepStrictEqual(
        results.map(r => r.status),
        [messages.TestResult.Status.UNDEFINED]
      )
    })
  })

  describe('#getPickleStepResults(pickleStepId)', () => {
    it('looks up results for scenario steps', async () => {
      await parse(
        `Feature: hello
  Scenario: ok
    Given a passed step
`
      )

      const pickleStepIds = gherkinQuery.getPickleStepIds('test.feature', 3)
      assert.strictEqual(pickleStepIds.length, 1)

      const testResults: messages.ITestResult[] = testResultQuery.getPickleStepResults(
        pickleStepIds[0]
      )
      assert.strictEqual(testResults.length, 1)

      assert.strictEqual(
        testResults[0].status,
        messages.TestResult.Status.PASSED
      )
    })

    it('looks up results for background steps', async () => {
      await parse(
        `Feature: hello
  Background:
    Given a passed step

  Scenario: ok
    Given a passed step

  Scenario: ko
    Given a failed step
`
      )

      const pickleStepIds = gherkinQuery.getPickleStepIds('test.feature', 3)
      assert.strictEqual(pickleStepIds.length, 2)

      const testResults: messages.ITestResult[] = testResultQuery.getPickleStepResults(
        pickleStepIds[0]
      )
      assert.strictEqual(testResults.length, 1)

      assert.strictEqual(
        testResults[0].status,
        messages.TestResult.Status.PASSED
      )
    })

    it('looks up results for background steps when scenarios are empty', async () => {
      await parse(
        `Feature: hello
  Background:
    Given a passed step

  Scenario: ok

  Scenario: ok too
`
      )

      const pickleStepIds = gherkinQuery.getPickleStepIds('test.feature', 3)
      assert.strictEqual(pickleStepIds.length, 0)

      const testResults: messages.ITestResult[] = testResultQuery.getPickleStepResults(
        pickleStepIds[0]
      )
      assert.strictEqual(testResults.length, 1)

      assert.strictEqual(
        testResults[0].status,
        messages.TestResult.Status.SKIPPED
      )
    })
  })

  describe('#getPickleResults(pickleStepId)', () => {
    it('looks up results for scenarios', async () => {
      await parse(
        `Feature: hello
  Scenario: ko
    Given a passed step
    Given a failed step
`
      )

      const pickleIds = gherkinQuery.getPickleIds('test.feature', 2)
      assert.strictEqual(pickleIds.length, 1)

      const testResults: messages.ITestResult[] = testResultQuery.getPickleResults(
        pickleIds[0]
      )

      assert.deepStrictEqual(
        testResults.map(r => r.status),
        [messages.TestResult.Status.PASSED, messages.TestResult.Status.FAILED]
      )
    })

    it('looks up results for scenario outlines', async () => {
      await parse(
        `Feature: hello
  Scenario: hi <status1> and <status2>
    Given a <status1> step
    And a <status2> step

    Examples:
      | status1    | status2 |
      | passed     | passed  |
      | passed     | failed  |
`
      )
      const pickleIds = gherkinQuery.getPickleIds('test.feature', 2)
      assert.strictEqual(pickleIds.length, 2)

      assert.deepStrictEqual(
        testResultQuery.getPickleResults(pickleIds[0]).map(r => r.status),
        [messages.TestResult.Status.PASSED, messages.TestResult.Status.PASSED]
      )

      assert.deepStrictEqual(
        testResultQuery.getPickleResults(pickleIds[1]).map(r => r.status),
        [messages.TestResult.Status.PASSED, messages.TestResult.Status.FAILED]
      )
    })

    it('looks up results for examples rows outlines', async () => {
      await parse(
        `Feature: hello
  Scenario: hi <status1> and <status2>
    Given a <status1> step
    And a <status2> step

    Examples:
      | status1    | status2 |
      | passed     | passed  |
      | passed     | failed  |
`
      )

      assert.deepStrictEqual(
        testResultQuery
          .getPickleResults(gherkinQuery.getPickleIds('test.feature', 8)[0])
          .map(r => r.status),
        [messages.TestResult.Status.PASSED, messages.TestResult.Status.PASSED]
      )

      assert.deepStrictEqual(
        testResultQuery
          .getPickleResults(gherkinQuery.getPickleIds('test.feature', 9)[0])
          .map(r => r.status),
        [messages.TestResult.Status.PASSED, messages.TestResult.Status.FAILED]
      )
    })
  })

  describe('#getDocumentResults(pickleStepId)', () => {
    it('looks up results for scenarios', async () => {
      await parse(
        `Feature: hello
  Scenario: ko
    Given a passed step

  Scenario: ok
    Given a failed step
`
      )

      const pickleIds = gherkinQuery.getPickleIds('test.feature')
      assert.strictEqual(pickleIds.length, 2)

      const statuses = pickleIds.map(pickleId =>
        testResultQuery.getPickleResults(pickleId).map(r => r.status)
      )

      assert.deepStrictEqual(statuses, [
        [messages.TestResult.Status.PASSED],
        [messages.TestResult.Status.FAILED],
      ])
    })

    it('looks up results for scenario outlines', async () => {
      await parse(
        `Feature: hello
  Scenario: hi <status1> and <status2>
    Given a <status1> step
    And a <status2> step

    Examples:
      | status1    | status2 |
      | passed     | passed  |
      | passed     | failed  |
`
      )
      const pickleIds = gherkinQuery.getPickleIds('test.feature', 2)
      assert.strictEqual(pickleIds.length, 2)

      assert.deepStrictEqual(
        testResultQuery.getPickleResults(pickleIds[0]).map(r => r.status),
        [messages.TestResult.Status.PASSED, messages.TestResult.Status.PASSED]
      )

      assert.deepStrictEqual(
        testResultQuery.getPickleResults(pickleIds[1]).map(r => r.status),
        [messages.TestResult.Status.PASSED, messages.TestResult.Status.FAILED]
      )
    })

    it('looks up results for examples rows outlines', async () => {
      await parse(
        `Feature: hello
  Scenario: hi <status1> and <status2>
    Given a <status1> step
    And a <status2> step

    Examples:
      | status1    | status2 |
      | passed     | passed  |
      | passed     | failed  |
`
      )

      assert.deepStrictEqual(
        testResultQuery
          .getPickleResults(gherkinQuery.getPickleIds('test.feature', 8)[0])
          .map(r => r.status),
        [messages.TestResult.Status.PASSED, messages.TestResult.Status.PASSED]
      )

      assert.deepStrictEqual(
        testResultQuery
          .getPickleResults(gherkinQuery.getPickleIds('test.feature', 9)[0])
          .map(r => r.status),
        [messages.TestResult.Status.PASSED, messages.TestResult.Status.FAILED]
      )
    })
  })

  function parse(gherkinSource: string): Promise<void> {
    const newId = IdGenerator.incrementing()
    const clock = new IncrementClock()
    const makeErrorMessage = withFullStackTrace()
    const supportCode = new SupportCode(newId, clock, makeErrorMessage)
    makeDummyStepDefinitions(supportCode)

    const cucumberStream = new CucumberStream(
      supportCode.parameterTypes,
      supportCode.stepDefinitions,
      supportCode.beforeHooks,
      supportCode.afterHooks,
      supportCode.newId,
      supportCode.clock,
      supportCode.makeErrorMessage
    )

    const queryUpdateStream = new Writable({
      objectMode: true,
      write(
        envelope: messages.IEnvelope,
        encoding: string,
        callback: (error?: Error | null) => void
      ): void {
        try {
          gherkinQuery.update(envelope)
          testResultQuery.update(envelope)
          callback()
        } catch (err) {
          callback(err)
        }
      },
    })
    return pipelinePromise(
      gherkinMessages(gherkinSource, 'test.feature', newId),
      cucumberStream,
      queryUpdateStream
    )
  }

  function gherkinMessages(
    gherkinSource: string,
    uri: string,
    newId: IdGenerator.NewId
  ): Readable {
    const source = messages.Envelope.fromObject({
      source: {
        uri,
        data: gherkinSource,
        mediaType: 'text/x.cucumber.gherkin+plain',
      },
    })
    return gherkin.fromSources([source], { newId })
  }
})
