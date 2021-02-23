import { GherkinStreams } from '@cucumber/gherkin-streams'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { IdGenerator, messages } from '@cucumber/messages'
import { pipeline, Readable, Writable } from 'stream'
import assert from 'assert'
import {
  SupportCode,
  withFullStackTrace,
  makeTestPlan,
  makeTestCase,
  IncrementClock,
  IncrementStopwatch,
} from '@cucumber/fake-cucumber'

import { promisify } from 'util'
import Query from '../src/Query'

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
      assert.strictEqual(result.status, messages.TestStepFinished.TestStepResult.Status.FAILED)
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
      const envelopes: messages.IEnvelope[] = []

      await execute(
        `Feature: hello
  Scenario: ok
    Given a passed step
`,
        (envelope) => envelopes.push(envelope)
      )

      const scenario = findScenario(envelopes)

      const pickleStepIds = gherkinQuery.getPickleStepIds(scenario.steps[0].id)
      assert.strictEqual(pickleStepIds.length, 1)

      const testStepResults = cucumberQuery.getPickleStepTestStepResults(pickleStepIds)
      assert.strictEqual(testStepResults.length, 1)

      assert.strictEqual(
        testStepResults[0].status,
        messages.TestStepFinished.TestStepResult.Status.PASSED
      )
    })

    it('looks up results for background steps', async () => {
      const envelopes: messages.IEnvelope[] = []

      await execute(
        `Feature: hello
  Background:
    Given a passed step

  Scenario: ok
    Given a passed step

  Scenario: ko
    Given a failed step
`,
        (envelope) => envelopes.push(envelope)
      )

      const background = findBackground(envelopes)
      const pickleStepIds = gherkinQuery.getPickleStepIds(background.steps[0].id)
      assert.strictEqual(pickleStepIds.length, 2)

      const testStepResults = cucumberQuery.getPickleStepTestStepResults(pickleStepIds)

      assert.deepStrictEqual(
        testStepResults.map((r) => r.status),
        [
          messages.TestStepFinished.TestStepResult.Status.PASSED,
          messages.TestStepFinished.TestStepResult.Status.PASSED,
        ]
      )
    })

    it('looks up results for background steps when scenarios are empty', async () => {
      const envelopes: messages.IEnvelope[] = []

      await execute(
        `Feature: hello
  Background:
  Given a passed step

  Scenario: ok

  Scenario: ok too
`,
        (envelope) => envelopes.push(envelope)
      )

      const background = findBackground(envelopes)
      const pickleStepIds = gherkinQuery.getPickleStepIds(background.steps[0].id)
      assert.strictEqual(pickleStepIds.length, 0)

      const testStepResults = cucumberQuery.getPickleStepTestStepResults(pickleStepIds)
      assert.strictEqual(testStepResults.length, 1)

      assert.strictEqual(
        testStepResults[0].status,
        messages.TestStepFinished.TestStepResult.Status.UNKNOWN
      )
    })
  })

  describe('#getPickleTestStepResults(pickleIds)', () => {
    it('looks up results for scenarios', async () => {
      const envelopes: messages.IEnvelope[] = []
      await execute(
        `Feature: hello
  Scenario: ko
    Given a passed step
    Given a failed step
`,
        (envelope) => envelopes.push(envelope)
      )

      const scenario = findScenario(envelopes)
      const pickleIds = gherkinQuery.getPickleIds('test.feature', scenario.id)
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
      const envelopes: messages.IEnvelope[] = []
      await execute(
        `Feature: hello
  Scenario: hi <status1> and <status2>
    Given a <status1> step
    And a <status2> step

    Examples:
      | status1    | status2 |
      | passed     | passed  |
      | passed     | failed  |
`,
        (envelope) => envelopes.push(envelope)
      )

      const scenario = findScenario(envelopes)
      const pickleIds = gherkinQuery.getPickleIds('test.feature', scenario.id)
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
      const envelopes: messages.IEnvelope[] = []

      await execute(
        `Feature: hello
  Scenario: hi <status1> and <status2>
    Given a <status1> step
    And a <status2> step

    Examples:
      | status1    | status2 |
      | passed     | passed  |
      | passed     | failed  |
`,
        (envelope) => envelopes.push(envelope)
      )

      const scenario = findScenario(envelopes)
      const exampleIds = scenario.examples[0].tableBody.map((row) => row.id)

      assert.deepStrictEqual(
        cucumberQuery
          .getPickleTestStepResults(gherkinQuery.getPickleIds('test.feature', exampleIds[0]))
          .map((r) => r.status),
        [
          messages.TestStepFinished.TestStepResult.Status.PASSED,
          messages.TestStepFinished.TestStepResult.Status.PASSED,
        ]
      )

      assert.deepStrictEqual(
        cucumberQuery
          .getPickleTestStepResults(gherkinQuery.getPickleIds('test.feature', exampleIds[1]))
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
      const envelopes: messages.IEnvelope[] = []
      await execute(
        `Feature: hello
  Scenario: ok
    Given a passed step with attachment
    `,
        (envelope) => envelopes.push(envelope)
      )

      const scenario = findScenario(envelopes)
      const pickleStepIds = gherkinQuery.getPickleStepIds(scenario.steps[0].id)
      assert.strictEqual(pickleStepIds.length, 1)

      const attachments = cucumberQuery.getPickleStepAttachments(pickleStepIds)
      assert.strictEqual(attachments.length, 1)

      assert.strictEqual(attachments[0].body, 'Hello')
    })
  })

  describe('#getStepMatchArguments(uri, lineNumber)', () => {
    it("looks up result for step's uri and line", async () => {
      const envelopes: messages.IEnvelope[] = []
      await execute(
        `Feature: hello
  Scenario: ok
    Given a passed step
    And I have 567 cukes in my belly
    `,
        (envelope) => envelopes.push(envelope)
      )

      const scenario = findScenario(envelopes)

      assert.deepStrictEqual(
        cucumberQuery
          .getStepMatchArgumentsLists(gherkinQuery.getPickleStepIds(scenario.steps[0].id)[0])
          .map((sal) => sal.stepMatchArguments.map((arg) => arg.parameterTypeName)),
        [[]]
      )

      assert.deepStrictEqual(
        cucumberQuery
          .getStepMatchArgumentsLists(gherkinQuery.getPickleStepIds(scenario.steps[1].id)[0])
          .map((sal) => sal.stepMatchArguments.map((arg) => arg.parameterTypeName)),
        [['int', 'word']]
      )
    })

    describe('#getBeforeHookSteps(pickleId: string)', () => {
      it('returns an empty list when there is no hooks', async () => {
        const envelopes: messages.IEnvelope[] = []
        await execute(
          `Feature: hello
    Scenario: hi
      Given a passed step
  `,
          (envelope) => envelopes.push(envelope)
        )
        const scenarioId = findScenario(envelopes).id
        const pickleId = gherkinQuery.getPickleIds('test.feature', scenarioId)[0]

        assert.deepStrictEqual(cucumberQuery.getBeforeHookSteps(pickleId), [])
      })

      it('returns one before hook step', async () => {
        const envelopes: messages.IEnvelope[] = []
        await execute(
          `Feature: hello
    @beforeHook
    Scenario: hi
      Given a passed step
  `,
          (envelope) => envelopes.push(envelope)
        )
        const scenarioId = findScenario(envelopes).id
        const pickleId = gherkinQuery.getPickleIds('test.feature', scenarioId)[0]

        assert.strictEqual(cucumberQuery.getBeforeHookSteps(pickleId).length, 1)
      })

      it('does not return after hook steps', async () => {
        const envelopes: messages.IEnvelope[] = []
        await execute(
          `Feature: hello
    @afterHook
    Scenario: hi
      Given a passed step
  `,
          (envelope) => envelopes.push(envelope)
        )
        const scenarioId = findScenario(envelopes).id
        const pickleId = gherkinQuery.getPickleIds('test.feature', scenarioId)[0]

        assert.deepStrictEqual(cucumberQuery.getBeforeHookSteps(pickleId), [])
      })
    })

    describe('#getAfterHookSteps(pickleId: string)', () => {
      it('returns an empty list when there is no hooks', async () => {
        const envelopes: messages.IEnvelope[] = []
        await execute(
          `Feature: hello
    Scenario: hi
      Given a passed step
  `,
          (envelope) => envelopes.push(envelope)
        )
        const scenarioId = findScenario(envelopes).id
        const pickleId = gherkinQuery.getPickleIds('test.feature', scenarioId)[0]

        assert.deepStrictEqual(cucumberQuery.getAfterHookSteps(pickleId), [])
      })

      it('returns one after hook step', async () => {
        const envelopes: messages.IEnvelope[] = []
        await execute(
          `Feature: hello
    @afterHook
    Scenario: hi
      Given a passed step
  `,
          (envelope) => envelopes.push(envelope)
        )
        const scenarioId = findScenario(envelopes).id
        const pickleId = gherkinQuery.getPickleIds('test.feature', scenarioId)[0]

        assert.strictEqual(cucumberQuery.getAfterHookSteps(pickleId).length, 1)
      })

      it('does not return before hook steps', async () => {
        const envelopes: messages.IEnvelope[] = []
        await execute(
          `Feature: hello
    @beforeHook
    Scenario: hi
      Given a passed step
  `,
          (envelope) => envelopes.push(envelope)
        )
        const scenarioId = findScenario(envelopes).id
        const pickleId = gherkinQuery.getPickleIds('test.feature', scenarioId)[0]

        assert.deepStrictEqual(cucumberQuery.getAfterHookSteps(pickleId), [])
      })
    })

    describe('#getTestStepResult', () => {
      it('returns one test step result', async () => {
        const emittedMessages: Array<messages.IEnvelope> = []
        await execute(
          `Feature: hello
    Scenario: hi
      Given a passed step
  `,
          (message) => emittedMessages.push(message)
        )
        const testCase = emittedMessages.find((child) => child.testCase).testCase
        const testStep = testCase.testSteps[0]
        const results = cucumberQuery.getTestStepResults(testStep.id)

        assert.deepStrictEqual(results.length, 1)
        assert.deepStrictEqual(
          results[0].status,
          messages.TestStepFinished.TestStepResult.Status.PASSED
        )
      })

      it('returns a result for hook step', async () => {
        const emittedMessages: Array<messages.IEnvelope> = []
        await execute(
          `Feature: hello
    @beforeHook
    Scenario: hi
      Given a passed step
  `,
          (message) => emittedMessages.push(message)
        )
        const testCase = emittedMessages.find((child) => child.testCase).testCase
        const testStep = testCase.testSteps[0]
        const results = cucumberQuery.getTestStepResults(testStep.id)

        assert.deepStrictEqual(results.length, 1)
        assert.deepStrictEqual(
          results[0].status,
          messages.TestStepFinished.TestStepResult.Status.PASSED
        )
      })
    })

    describe('#getHook(HookId)', () => {
      it('returns undefined if the id does not match any hook', () => {
        assert.strictEqual(cucumberQuery.getHook('tralala'), undefined)
      })

      it('returns the matching hook', () => {
        const hook = messages.Hook.create({
          id: 'tralala',
        })
        const envelope = messages.Envelope.create({
          hook,
        })

        cucumberQuery.update(envelope)

        assert.deepStrictEqual(cucumberQuery.getHook('tralala'), hook)
      })
    })

    describe('#getAttachmentByTestStepId', () => {
      it('looks up attachments', async () => {
        const testCases: messages.ITestCase[] = []
        await execute(
          `Feature: hello
    Scenario: ok
      Given a passed step with attachment
  `,
          (envelope) => {
            if (envelope.testCase) {
              testCases.push(envelope.testCase)
            }
          }
        )

        const attachments = cucumberQuery.getTestStepsAttachments([testCases[0].testSteps[0].id])
        assert.strictEqual(attachments.length, 1)

        assert.strictEqual(attachments[0].body, 'Hello')
      })
    })
  })

  async function execute(
    gherkinSource: string,
    messagesHandler: (envelope: messages.IEnvelope) => void = () => null
  ): Promise<void> {
    const newId = IdGenerator.incrementing()
    const clock = new IncrementClock()
    const stopwatch = new IncrementStopwatch()
    const makeErrorMessage = withFullStackTrace()
    const supportCode = new SupportCode(newId, clock, stopwatch, makeErrorMessage)
    supportCode.defineBeforeHook(null, '@beforeHook', () => {
      // no-op
    })
    supportCode.defineAfterHook(null, '@afterHook', () => {
      // no-op
    })
    supportCode.defineStepDefinition(null, 'a passed step', () => {
      // no-op
    })
    supportCode.defineStepDefinition(null, 'a passed step with attachment', function () {
      this.attach('Hello', 'text/plain')
    })
    supportCode.defineStepDefinition(null, 'a failed step', () => {
      throw new Error(`This step failed.`)
    })
    supportCode.defineStepDefinition(null, 'I have {int} cukes in my {word}', (cukes: number) => {
      assert.ok(cukes)
    })

    const queryUpdateStream = new Writable({
      objectMode: true,
      write(
        envelope: messages.IEnvelope,
        encoding: string,
        callback: (error?: Error | null) => void
      ): void {
        try {
          messagesHandler(envelope)
          gherkinQuery.update(envelope)
          cucumberQuery.update(envelope)
          callback()
        } catch (err) {
          callback(err)
        }
      },
    })
    await pipelinePromise(gherkinMessages(gherkinSource, 'test.feature', newId), queryUpdateStream)

    const testPlan = makeTestPlan(gherkinQuery, supportCode, makeTestCase)
    await testPlan.execute((envelope: messages.IEnvelope) => {
      messagesHandler(envelope)
      cucumberQuery.update(envelope)
    })
  }

  function gherkinMessages(gherkinSource: string, uri: string, newId: IdGenerator.NewId): Readable {
    const source = messages.Envelope.fromObject({
      source: {
        uri,
        data: gherkinSource,
        mediaType: 'text/x.cucumber.gherkin+plain',
      },
    })
    return GherkinStreams.fromSources([source], { newId })
  }

  function findScenario(
    envelopes: messages.IEnvelope[]
  ): messages.GherkinDocument.Feature.IScenario {
    const gherkinDocument = envelopes.find((envelope) => envelope.gherkinDocument).gherkinDocument
    return gherkinDocument.feature.children.find((child) => child.scenario).scenario
  }

  function findBackground(
    envelopes: messages.IEnvelope[]
  ): messages.GherkinDocument.Feature.IBackground {
    const gherkinDocument = envelopes.find((envelope) => envelope.gherkinDocument).gherkinDocument
    return gherkinDocument.feature.children.find((child) => child.background).background
  }
})
