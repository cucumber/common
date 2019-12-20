import 'source-map-support/register'
import gherkin, { GherkinQuery } from 'gherkin'
import { IdGenerator, messages } from 'cucumber-messages'
import { pipeline, Readable, Writable } from 'stream'
import assert from 'assert'
import CucumberQuery from '../src/CucumberQuery'
import SupportCode from 'fake-cucumber/dist/src/SupportCode'
import CucumberStream from 'fake-cucumber/dist/src/CucumberStream'
import makeDummyStepDefinitions from 'fake-cucumber/dist/test/makeDummyStepDefinitions'

import { promisify } from 'util'

const pipelinePromise = promisify(pipeline)

describe('CucumberQuery', () => {
  let gherkinQuery: GherkinQuery
  let cucumberQuery: CucumberQuery
  beforeEach(() => {
    gherkinQuery = new GherkinQuery()
    cucumberQuery = new CucumberQuery(gherkinQuery)
  })

  describe('#getStepResults(uri, lineNumber)', () => {
    xit('returns empty array when there are no hits', () => {
      assert.deepStrictEqual(
        new CucumberQuery(new GherkinQuery()).getStepResults('test.feature', 1),
        []
      )
    })

    it('looks up results for steps', async () => {
      await parse(
        `Feature: hello
  Background:
    Given a passed step

  Scenario: hi
    Given a passed step
    Given a failed step
`
      )
      const line3: messages.ITestResult[] = cucumberQuery.getStepResults(
        'test.feature',
        3
      )
      assert.strictEqual(line3[0].status, messages.TestResult.Status.PASSED)

      const line6: messages.ITestResult[] = cucumberQuery.getStepResults(
        'test.feature',
        6
      )
      assert.strictEqual(line6[0].status, messages.TestResult.Status.PASSED)

      const line7: messages.ITestResult[] = cucumberQuery.getStepResults(
        'test.feature',
        7
      )
      assert.strictEqual(line7[0].status, messages.TestResult.Status.FAILED)
    })
  })

  describe('#getScenarioResults(uri, lineNumber)', () => {
    xit('returns empty array when there are no hits', () => {
      assert.deepStrictEqual(
        new CucumberQuery(new GherkinQuery()).getScenarioResults(
          'test.feature',
          1
        ),
        []
      )
    })

    it('looks up result for scenario', async () => {
      await parse(
        `Feature: hello
  Scenario: hi
    Given a passed step
    Given a failed step
`
      )
      const line2: messages.ITestResult[] = cucumberQuery.getScenarioResults(
        'test.feature',
        2
      )
      assert.strictEqual(line2[0].status, messages.TestResult.Status.FAILED)
    })

    it("looks up result for rule->scenario's uri and line", async () => {
      await parse(
        `Feature: hello
  Rule: a rule
    Scenario: hi
      Given a passed step
      Given a failed step
`
      )
      const line3: messages.ITestResult[] = cucumberQuery.getScenarioResults(
        'test.feature',
        3
      )
      assert.strictEqual(line3[0].status, messages.TestResult.Status.FAILED)
    })

    it('looks up results for examples rows', async () => {
      await parse(
        `Feature: hello
  Scenario: hi <status1> and <status2>
    Given a <status1> step
    And a <status2> step

    Examples:
      | status1    | status2 |
      | passed     | passed  |
      | passed     | failed  |
      | passed     | pending |
      | passed     | undefined |
`
      )

      assert.strictEqual(
        cucumberQuery.getScenarioResults('test.feature', 2)[0].status,
        messages.TestResult.Status.FAILED
      )
      assert.strictEqual(
        cucumberQuery.getStepResults('test.feature', 3)[0].status,
        messages.TestResult.Status.PASSED
      )
      assert.strictEqual(
        cucumberQuery.getStepResults('test.feature', 4)[0].status,
        messages.TestResult.Status.FAILED
      )
      assert.strictEqual(
        cucumberQuery.getScenarioResults('test.feature', 8)[0].status,
        messages.TestResult.Status.PASSED
      )
      assert.strictEqual(
        cucumberQuery.getScenarioResults('test.feature', 9)[0].status,
        messages.TestResult.Status.FAILED
      )
      assert.strictEqual(
        cucumberQuery.getScenarioResults('test.feature', 10)[0].status,
        messages.TestResult.Status.PENDING
      )
      assert.strictEqual(
        cucumberQuery.getScenarioResults('test.feature', 11)[0].status,
        messages.TestResult.Status.UNDEFINED
      )
    })
  })

  describe('#getDocumentResults(uri)', () => {
    xit('returns empty array when there are no hits', () => {
      assert.deepStrictEqual(
        new CucumberQuery(new GherkinQuery()).getDocumentResults(
          'test.feature'
        ),
        []
      )
    })

    xit('looks up result for a whole file', async () => {
      await parse(
        `Feature: hello

    Scenario: passed
      Given a passed step

    Scenario: failed
      Given a failed step

    Scenario: passed too
      Given a passed step
`
      )
      const results: messages.ITestResult[] = cucumberQuery.getDocumentResults(
        'test.feature'
      )
      assert.strictEqual(results[0].status, messages.TestResult.Status.FAILED)
    })
  })

  describe('#getStepMatchArguments(uri, lineNumber)', () => {
    xit('returns empty array when there are no hits', () => {
      assert.deepStrictEqual(
        new CucumberQuery(new GherkinQuery()).getStepMatchArgumentsLists(
          'test.feature',
          1
        ),
        []
      )
    })

    it("looks up result for step's uri and line", async () => {
      await parse(
        `Feature: hello
  Scenario: hi
    Given a passed step
    And I have 567 cukes in my belly
`
      )
      const line3 = cucumberQuery.getStepMatchArgumentsLists('test.feature', 3)

      assert.deepStrictEqual(
        line3[0].stepMatchArguments.map(arg => arg.parameterTypeName),
        ['word']
      )

      const line4 = cucumberQuery.getStepMatchArgumentsLists('test.feature', 4)
      assert.deepStrictEqual(
        line4[0].stepMatchArguments.map(arg => arg.parameterTypeName),
        ['int', 'word']
      )
    })
  })

  function parse(gherkinSource: string): Promise<void> {
    const newId = IdGenerator.incrementing()
    const supportCode = new SupportCode(newId)
    makeDummyStepDefinitions(supportCode)

    const cucumberStream = new CucumberStream(
      supportCode.parameterTypes,
      supportCode.stepDefinitions,
      supportCode.beforeHooks,
      supportCode.afterHooks,
      newId
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
