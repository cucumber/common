import { GherkinStreams } from '@cucumber/gherkin-streams'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import * as messages from '@cucumber/messages'
import { pipeline, Readable, Writable } from 'stream'
import assert from 'assert'
import {
  SupportCode,
  withFullStackTrace,
  makeTestPlan,
  makeTestCase,
  IncrementClock,
  IncrementStopwatch,
  RunOptions,
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

  describe('#getPickleStepTestStepResults(pickleStepIds)', () => {
    it('returns a single UNKNOWN when the list is empty', () => {
      const results = cucumberQuery.getPickleTestStepResults([])
      assert.deepStrictEqual(
        results.map((r) => r.status),
        ['UNKNOWN']
      )
    })

    it('looks up results for scenario steps', async () => {
      const envelopes: messages.Envelope[] = []

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

      assert.strictEqual(testStepResults[0].status, 'PASSED')
    })

    it('looks up results for background steps', async () => {
      const envelopes: messages.Envelope[] = []

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
        ['PASSED', 'PASSED']
      )
    })

    it('looks up results for background steps when scenarios are empty', async () => {
      const envelopes: messages.Envelope[] = []

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

      assert.strictEqual(testStepResults[0].status, 'UNKNOWN')
    })
  })

  describe('#getPickleTestStepResults(pickleIds)', () => {
    it('looks up results for scenarios', async () => {
      const envelopes: messages.Envelope[] = []
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
        ['PASSED', 'FAILED']
      )
    })

    it('looks up results for scenario outlines', async () => {
      const envelopes: messages.Envelope[] = []
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
        ['PASSED', 'PASSED', 'PASSED', 'FAILED']
      )
    })

    it('looks up results for examples rows outlines', async () => {
      const envelopes: messages.Envelope[] = []

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
        ['PASSED', 'PASSED']
      )

      assert.deepStrictEqual(
        cucumberQuery
          .getPickleTestStepResults(gherkinQuery.getPickleIds('test.feature', exampleIds[1]))
          .map((r) => r.status),
        ['PASSED', 'FAILED']
      )
    })
  })

  describe('#getPickleStepAttachments(pickleIds)', () => {
    it('looks up attachments', async () => {
      const envelopes: messages.Envelope[] = []
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
      const envelopes: messages.Envelope[] = []
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
        const envelopes: messages.Envelope[] = []
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
        const envelopes: messages.Envelope[] = []
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
        const envelopes: messages.Envelope[] = []
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
        const envelopes: messages.Envelope[] = []
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
        const envelopes: messages.Envelope[] = []
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
        const envelopes: messages.Envelope[] = []
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
        const emittedMessages: Array<messages.Envelope> = []
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
        assert.deepStrictEqual(results[0].status, 'PASSED')
      })

      it('returns a result for hook step', async () => {
        const emittedMessages: Array<messages.Envelope> = []
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
        assert.deepStrictEqual(results[0].status, 'PASSED')
      })

      it('returns the result from the last attempt only where retry has been used', async () => {
        const emittedMessages: Array<messages.Envelope> = []
        await execute(
          `Feature: hello
Scenario: hi
  Given a step that passes the second time
`,
          (message) => emittedMessages.push(message),
          { allowedRetries: 1 }
        )
        const testCase = emittedMessages.find((child) => child.testCase).testCase
        const testStep = testCase.testSteps[0]
        const results = cucumberQuery.getTestStepResults(testStep.id)

        assert.deepStrictEqual(results.length, 1)
        assert.deepStrictEqual(results[0].status, 'PASSED')
      })
    })

    describe('#getHook(HookId)', () => {
      it('returns undefined if the id does not match any hook', () => {
        assert.strictEqual(cucumberQuery.getHook('tralala'), undefined)
      })

      it('returns the matching hook', () => {
        const hook: messages.Hook = {
          id: 'tralala',
          sourceReference: {},
        }
        const envelope: messages.Envelope = {
          hook,
        }

        cucumberQuery.update(envelope)

        assert.deepStrictEqual(cucumberQuery.getHook('tralala'), hook)
      })
    })

    describe('#getAttachmentByTestStepId', () => {
      it('looks up attachments', async () => {
        const testCases: messages.TestCase[] = []
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

      it('returns attachments from the last attempt only where retry has been used', async () => {
        const testCases: messages.TestCase[] = []
        await execute(
          `Feature: hello
    Scenario: ok
      Given a passed step with attachment
      And a step that passes the second time
  `,
          (envelope) => {
            if (envelope.testCase) {
              testCases.push(envelope.testCase)
            }
          },
          { allowedRetries: 1 }
        )

        const attachments = cucumberQuery.getTestStepsAttachments([testCases[0].testSteps[0].id])
        assert.strictEqual(attachments.length, 1)

        assert.strictEqual(attachments[0].body, 'Hello')
      })
    })

    describe('#getStatusCounts', () => {
      it('returns the number of pickles for each status', async () => {
        await execute(
          `Feature: hello
    Scenario: ok
      Given a passed step
  `,
          () => undefined
        )

        await execute(
          `Feature: hello
    Scenario: ok
      Given a passed step
  `,
          () => undefined
        )

        await execute(
          `Feature: hello
    Scenario: ok
      Given a failed step
  `,
          () => undefined
        )

        await execute(
          `Feature: hello
    Scenario: ok
      Given an undefined step
  `,
          () => undefined
        )

        const statuses = cucumberQuery.getStatusCounts(
          gherkinQuery.getPickles().map((pickle) => pickle.id)
        )

        const expectedStatuses: Partial<Record<messages.TestStepResultStatus, number>> = {
          PASSED: 2,
          FAILED: 1,
          UNDEFINED: 1,
        }
        assert.deepStrictEqual(statuses, expectedStatuses)
      })
    })
  })

  async function execute(
    gherkinSource: string,
    messagesHandler: (envelope: messages.Envelope) => void = () => null,
    runOptions: RunOptions = { allowedRetries: 0 }
  ): Promise<void> {
    const newId = messages.IdGenerator.uuid()
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
    let passesSecondTime = 0
    supportCode.defineStepDefinition(null, 'a step that passes the second time', () => {
      passesSecondTime++
      if (passesSecondTime < 2) {
        throw new Error(`This step failed.`)
      }
    })

    const queryUpdateStream = new Writable({
      objectMode: true,
      write(
        envelope: messages.Envelope,
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

    const testPlan = makeTestPlan(gherkinQuery, supportCode, runOptions, makeTestCase)
    await testPlan.execute((envelope: messages.Envelope) => {
      messagesHandler(envelope)
      cucumberQuery.update(envelope)
    })
  }

  function gherkinMessages(
    gherkinSource: string,
    uri: string,
    newId: messages.IdGenerator.NewId
  ): Readable {
    const source: messages.Envelope = {
      source: {
        uri,
        data: gherkinSource,
        mediaType: messages.SourceMediaType.TEXT_X_CUCUMBER_GHERKIN_PLAIN,
      },
    }
    return GherkinStreams.fromSources([source], { newId })
  }

  function findScenario(envelopes: messages.Envelope[]): messages.Scenario {
    const gherkinDocument = envelopes.find((envelope) => envelope.gherkinDocument).gherkinDocument
    return gherkinDocument.feature.children.find((child) => child.scenario).scenario
  }

  function findBackground(envelopes: messages.Envelope[]): messages.Background {
    const gherkinDocument = envelopes.find((envelope) => envelope.gherkinDocument).gherkinDocument
    return gherkinDocument.feature.children.find((child) => child.background).background
  }
})
