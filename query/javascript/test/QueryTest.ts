import 'source-map-support/register'
import { GherkinStreams, Query as GherkinQuery } from '@cucumber/gherkin'
import { IdGenerator, messages } from '@cucumber/messages'
import { pipeline, Readable, Writable } from 'stream'
import assert from 'assert'
import { SupportCode, withFullStackTrace } from '@cucumber/fake-cucumber'

import { promisify } from 'util'
import IncrementClock from '@cucumber/fake-cucumber/dist/src/IncrementClock'
import Query from '../src/Query'
import { makeTestPlan, makeTestCase } from '@cucumber/fake-cucumber'

const pipelinePromise = promisify(pipeline)

describe('Query', () => {
  let gherkinQuery: GherkinQuery
  let cucumberQuery: Query
  beforeEach(() => {
    gherkinQuery = new GherkinQuery()
    cucumberQuery = new Query()
  })

  describe('#getWorstTestStepResult(testStepResults)', () => {
    it('returns a FAILED result for PASSED,FAILED,PASSED', () => {
      const result = cucumberQuery.getWorstTestStepResult([
        new messages.TestStepFinished.TestStepResult({
          status: messages.TestStepFinished.TestStepResult.Status.PASSED,
        }),
        new messages.TestStepFinished.TestStepResult({
          status: messages.TestStepFinished.TestStepResult.Status.FAILED,
        }),
        new messages.TestStepFinished.TestStepResult({
          status: messages.TestStepFinished.TestStepResult.Status.PASSED,
        }),
      ])
      assert.strictEqual(
        result.status,
        messages.TestStepFinished.TestStepResult.Status.FAILED
      )
    })
  })

  describe('#getPickleStepTestStepResults(pickleStepIds)', () => {
    it('returns a single UNKNOWN when the list is empty', () => {
      const results = cucumberQuery.getPickleTestStepResults([])
      assert.deepStrictEqual(
        results.map((r) => r.status),
        [messages.TestStepFinished.TestStepResult.Status.UNKNOWN]
      )
    })

    it('looks up results for scenario steps', async () => {
      await execute(
        `Feature: hello
  Scenario: ok
    Given a passed step
`
      )

      const pickleStepIds = gherkinQuery.getPickleStepIds('test.feature', 3)
      assert.strictEqual(pickleStepIds.length, 1)

      const testStepResults = cucumberQuery.getPickleStepTestStepResults(
        pickleStepIds
      )
      assert.strictEqual(testStepResults.length, 1)

      assert.strictEqual(
        testStepResults[0].status,
        messages.TestStepFinished.TestStepResult.Status.PASSED
      )
    })

    it('looks up results for background steps', async () => {
      await execute(
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

      const testStepResults = cucumberQuery.getPickleStepTestStepResults(
        pickleStepIds
      )

      assert.deepStrictEqual(
        testStepResults.map((r) => r.status),
        [
          messages.TestStepFinished.TestStepResult.Status.PASSED,
          messages.TestStepFinished.TestStepResult.Status.PASSED,
        ]
      )
    })

    it('looks up results for background steps when scenarios are empty', async () => {
      await execute(
        `Feature: hello
  Background:
    Given a passed step

  Scenario: ok

  Scenario: ok too
`
      )

      const pickleStepIds = gherkinQuery.getPickleStepIds('test.feature', 3)
      assert.strictEqual(pickleStepIds.length, 0)

      const testStepResults = cucumberQuery.getPickleStepTestStepResults(
        pickleStepIds
      )
      assert.strictEqual(testStepResults.length, 1)

      assert.strictEqual(
        testStepResults[0].status,
        messages.TestStepFinished.TestStepResult.Status.UNKNOWN
      )
    })
  })

  describe('#getPickleTestStepResults(pickleIds)', () => {
    it('looks up results for scenarios', async () => {
      await execute(
        `Feature: hello
  Scenario: ko
    Given a passed step
    Given a failed step
`
      )

      const pickleIds = gherkinQuery.getPickleIds('test.feature', 2)
      assert.strictEqual(pickleIds.length, 1)

      const testStepResults = cucumberQuery.getPickleTestStepResults(pickleIds)

      assert.deepStrictEqual(
        testStepResults.map((r) => r.status),
        [
          messages.TestStepFinished.TestStepResult.Status.PASSED,
          messages.TestStepFinished.TestStepResult.Status.FAILED,
        ]
      )
    })

    it('looks up results for scenario outlines', async () => {
      await execute(
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
        cucumberQuery.getPickleTestStepResults(pickleIds).map((r) => r.status),
        [
          messages.TestStepFinished.TestStepResult.Status.PASSED,
          messages.TestStepFinished.TestStepResult.Status.PASSED,
          messages.TestStepFinished.TestStepResult.Status.PASSED,
          messages.TestStepFinished.TestStepResult.Status.FAILED,
        ]
      )
    })

    it('looks up results for examples rows outlines', async () => {
      await execute(
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
        cucumberQuery
          .getPickleTestStepResults(
            gherkinQuery.getPickleIds('test.feature', 8)
          )
          .map((r) => r.status),
        [
          messages.TestStepFinished.TestStepResult.Status.PASSED,
          messages.TestStepFinished.TestStepResult.Status.PASSED,
        ]
      )

      assert.deepStrictEqual(
        cucumberQuery
          .getPickleTestStepResults(
            gherkinQuery.getPickleIds('test.feature', 9)
          )
          .map((r) => r.status),
        [
          messages.TestStepFinished.TestStepResult.Status.PASSED,
          messages.TestStepFinished.TestStepResult.Status.FAILED,
        ]
      )
    })
  })

  describe('#getPickleStepAttachments(pickleIds)', () => {
    it('looks up attachments', async () => {
      await execute(
        `Feature: hello
  Scenario: ok
    Given a passed step with attachment
`
      )

      const pickleStepIds = gherkinQuery.getPickleStepIds('test.feature', 3)
      assert.strictEqual(pickleStepIds.length, 1)

      const attachments = cucumberQuery.getPickleStepAttachments(pickleStepIds)
      assert.strictEqual(attachments.length, 1)

      assert.strictEqual(attachments[0].body, 'Hello')
    })
  })

  describe('#getStepMatchArguments(uri, lineNumber)', () => {
    it("looks up result for step's uri and line", async () => {
      await execute(
        `Feature: hello
  Scenario: hi
    Given a passed step
    And I have 567 cukes in my belly
`
      )

      assert.deepStrictEqual(
        cucumberQuery
          .getStepMatchArgumentsLists(
            gherkinQuery.getPickleStepIds('test.feature', 3)[0]
          )
          .map((sal) =>
            sal.stepMatchArguments.map((arg) => arg.parameterTypeName)
          ),
        [[]]
      )

      assert.deepStrictEqual(
        cucumberQuery
          .getStepMatchArgumentsLists(
            gherkinQuery.getPickleStepIds('test.feature', 4)[0]
          )
          .map((sal) =>
            sal.stepMatchArguments.map((arg) => arg.parameterTypeName)
          ),
        [['int', 'word']]
      )
    })
  })

  async function execute(gherkinSource: string): Promise<void> {
    const newId = IdGenerator.incrementing()
    const clock = new IncrementClock()
    const makeErrorMessage = withFullStackTrace()
    const supportCode = new SupportCode(newId, clock, makeErrorMessage)
    supportCode.defineStepDefinition(null, 'a passed step', () => {
      // no-op
    })
    supportCode.defineStepDefinition(
      null,
      'a passed step with attachment',
      function () {
        this.attach('Hello', 'text/plain')
      }
    )
    supportCode.defineStepDefinition(null, 'a failed step', () => {
      throw new Error(`This step failed.`)
    })
    supportCode.defineStepDefinition(
      null,
      'I have {int} cukes in my {word}',
      (cukes: number) => {
        assert.ok(cukes)
      }
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
          cucumberQuery.update(envelope)
          callback()
        } catch (err) {
          callback(err)
        }
      },
    })
    await pipelinePromise(
      gherkinMessages(gherkinSource, 'test.feature', newId),
      queryUpdateStream
    )

    const testPlan = makeTestPlan(gherkinQuery, supportCode, makeTestCase)
    await testPlan.execute((envelope) => cucumberQuery.update(envelope))
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
    return GherkinStreams.fromSources([source], { newId })
  }
})
