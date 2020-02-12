import 'source-map-support/register'
import gherkin, { GherkinQuery } from '@cucumber/gherkin'
import { IdGenerator, messages } from '@cucumber/messages'
import { pipeline, Readable, Writable } from 'stream'
import assert from 'assert'
import SupportCode from '@cucumber/fake-cucumber/dist/src/SupportCode'
import CucumberStream from '@cucumber/fake-cucumber/dist/src/CucumberStream'
import { withFullStackTrace } from '@cucumber/fake-cucumber/dist/src/ErrorMessageGenerator'

import { promisify } from 'util'
import IncrementClock from '@cucumber/fake-cucumber/dist/src/IncrementClock'
import Query from '../src/Query'

const pipelinePromise = promisify(pipeline)

describe('TestStepResultQuery', () => {
  let gherkinQuery: GherkinQuery
  let testStepResultQuery: Query
  beforeEach(() => {
    gherkinQuery = new GherkinQuery()
    testStepResultQuery = new Query()
  })

  describe('#getWorstTestStepResult(testStepResults)', () => {
    it('returns a FAILED result for PASSED,FAILED,PASSED', () => {
      const result = testStepResultQuery.getWorstTestStepResult([
        new messages.TestStepResult({
          status: messages.TestStepResult.Status.PASSED,
        }),
        new messages.TestStepResult({
          status: messages.TestStepResult.Status.FAILED,
        }),
        new messages.TestStepResult({
          status: messages.TestStepResult.Status.PASSED,
        }),
      ])
      assert.strictEqual(result.status, messages.TestStepResult.Status.FAILED)
    })
  })

  describe('#getPickleStepTestStepResults(pickleStepIds)', () => {
    it('returns a single UNDEFINED when the list is empty', () => {
      const results = testStepResultQuery.getPickleTestStepResults([])
      assert.deepStrictEqual(
        results.map(r => r.status),
        [messages.TestStepResult.Status.UNDEFINED]
      )
    })

    it('looks up results for scenario steps', async () => {
      await parse(
        `Feature: hello
  Scenario: ok
    Given a passed step
`
      )

      const pickleStepIds = gherkinQuery.getPickleStepIds('test.feature', 3)
      assert.strictEqual(pickleStepIds.length, 1)

      const testStepResults: messages.ITestStepResult[] = testStepResultQuery.getPickleStepTestStepResults(
        pickleStepIds
      )
      assert.strictEqual(testStepResults.length, 1)

      assert.strictEqual(
        testStepResults[0].status,
        messages.TestStepResult.Status.PASSED
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

      const testStepResults: messages.ITestStepResult[] = testStepResultQuery.getPickleStepTestStepResults(
        pickleStepIds
      )

      assert.deepStrictEqual(
        testStepResults.map(r => r.status),
        [
          messages.TestStepResult.Status.PASSED,
          messages.TestStepResult.Status.PASSED,
        ]
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

      const testStepResults: messages.ITestStepResult[] = testStepResultQuery.getPickleStepTestStepResults(
        pickleStepIds
      )
      assert.strictEqual(testStepResults.length, 1)

      assert.strictEqual(
        testStepResults[0].status,
        messages.TestStepResult.Status.SKIPPED
      )
    })
  })

  describe('#getPickleTestStepResults(pickleIds)', () => {
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

      const testStepResults: messages.ITestStepResult[] = testStepResultQuery.getPickleTestStepResults(
        pickleIds
      )

      assert.deepStrictEqual(
        testStepResults.map(r => r.status),
        [
          messages.TestStepResult.Status.PASSED,
          messages.TestStepResult.Status.FAILED,
        ]
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
        testStepResultQuery
          .getPickleTestStepResults(pickleIds)
          .map(r => r.status),
        [
          messages.TestStepResult.Status.PASSED,
          messages.TestStepResult.Status.PASSED,
          messages.TestStepResult.Status.PASSED,
          messages.TestStepResult.Status.FAILED,
        ]
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
        testStepResultQuery
          .getPickleTestStepResults(
            gherkinQuery.getPickleIds('test.feature', 8)
          )
          .map(r => r.status),
        [
          messages.TestStepResult.Status.PASSED,
          messages.TestStepResult.Status.PASSED,
        ]
      )

      assert.deepStrictEqual(
        testStepResultQuery
          .getPickleTestStepResults(
            gherkinQuery.getPickleIds('test.feature', 9)
          )
          .map(r => r.status),
        [
          messages.TestStepResult.Status.PASSED,
          messages.TestStepResult.Status.FAILED,
        ]
      )
    })
  })

  describe('#getPickleStepAttachments(pickleIds)', () => {
    it('looks up attachments', async () => {
      await parse(
        `Feature: hello
  Scenario: ok
    Given a passed step with attachment
`
      )

      const pickleStepIds = gherkinQuery.getPickleStepIds('test.feature', 3)
      assert.strictEqual(pickleStepIds.length, 1)

      const attachments: messages.IAttachment[] = testStepResultQuery.getPickleStepAttachments(
        pickleStepIds
      )
      assert.strictEqual(attachments.length, 1)

      assert.strictEqual(attachments[0].text, 'Hello')
    })
  })

  describe('#getStepMatchArguments(uri, lineNumber)', () => {
    it("looks up result for step's uri and line", async () => {
      await parse(
        `Feature: hello
  Scenario: hi
    Given a passed step
    And I have 567 cukes in my belly
`
      )

      assert.deepStrictEqual(
        testStepResultQuery
          .getStepMatchArgumentsLists(
            gherkinQuery.getPickleStepIds('test.feature', 3)[0]
          )
          .map(sal => sal.stepMatchArguments.map(arg => arg.parameterTypeName)),
        [[]]
      )

      assert.deepStrictEqual(
        testStepResultQuery
          .getStepMatchArgumentsLists(
            gherkinQuery.getPickleStepIds('test.feature', 4)[0]
          )
          .map(sal => sal.stepMatchArguments.map(arg => arg.parameterTypeName)),
        [['int', 'word']]
      )
    })
  })

  function parse(gherkinSource: string): Promise<void> {
    const newId = IdGenerator.incrementing()
    const clock = new IncrementClock()
    const makeErrorMessage = withFullStackTrace()
    const supportCode = new SupportCode(newId, clock, makeErrorMessage)
    supportCode.Given('a passed step', () => {
      // no-op
    })
    supportCode.Given('a passed step with attachment', function() {
      this.attach('Hello', 'text/plain')
    })
    supportCode.Given('a failed step', () => {
      throw new Error(`This step failed.`)
    })
    supportCode.Given('I have {int} cukes in my {word}', (cukes: number) => {
      assert.ok(cukes)
    })

    const cucumberStream = new CucumberStream(
      supportCode.parameterTypes,
      supportCode.stepDefinitions,
      supportCode.undefinedParameterTypes,
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
          testStepResultQuery.update(envelope)
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
