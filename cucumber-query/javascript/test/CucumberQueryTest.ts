import gherkin from 'gherkin'
import { messages } from 'cucumber-messages'
import {
  CucumberStream,
  SupportCode,
  makeDummyStepDefinitions,
} from 'fake-cucumber'
import { Readable, Writable } from 'stream'
import assert from 'assert'
import CucumberQuery from '../src/CucumberQuery'

describe('CucumberQuery', () => {
  describe('#getStepResults(uri, lineNumber)', () => {
    it('returns empty array when there are no hits', () => {
      assert.deepStrictEqual(
        new CucumberQuery().getStepResults('test.feature', 1),
        []
      )
    })

    it('looks up results for steps', cb => {
      check(
        `Feature: hello
  Background:
    Given a passed step

  Scenario: hi
    Given a passed step
    Given a failed step
`,
        query => {
          const line3: messages.ITestResult[] = query.getStepResults(
            'test.feature',
            3
          )
          assert.strictEqual(line3[0].status, messages.TestResult.Status.PASSED)

          const line6: messages.ITestResult[] = query.getStepResults(
            'test.feature',
            6
          )
          assert.strictEqual(line6[0].status, messages.TestResult.Status.PASSED)

          const line7: messages.ITestResult[] = query.getStepResults(
            'test.feature',
            7
          )
          assert.strictEqual(line7[0].status, messages.TestResult.Status.FAILED)
          cb()
        },
        cb
      )
    })

    it('looks up results for examples rows', cb => {
      check(
        `Feature: hello
  Scenario: hi
    Given a <status> step

    Examples:
      | status    |
      | passed    |
      | failed    |
      | pending   |
      | undefined |
`,
        query => {
          // const line3: messages.ITestResult[] = query.getStepResults(
          //   'test.feature',
          //   3
          // )
          // assert.strictEqual(line3[0].status, messages.TestResult.Status.FAILED)

          assert.strictEqual(
            query.getStepResults('test.feature', 7)[0].status,
            messages.TestResult.Status.PASSED
          )
          assert.strictEqual(
            query.getStepResults('test.feature', 8)[0].status,
            messages.TestResult.Status.FAILED
          )
          assert.strictEqual(
            query.getStepResults('test.feature', 9)[0].status,
            messages.TestResult.Status.PENDING
          )
          assert.strictEqual(
            query.getStepResults('test.feature', 10)[0].status,
            messages.TestResult.Status.UNDEFINED
          )

          cb()
        },
        cb
      )
    })
  })

  describe('#getScenarioResults(uri, lineNumber)', () => {
    it('returns empty array when there are no hits', () => {
      assert.deepStrictEqual(
        new CucumberQuery().getScenarioResults('test.feature', 1),
        []
      )
    })

    it('looks up result for scenario', cb => {
      check(
        `Feature: hello
  Scenario: hi
    Given a passed step
    Given a failed step
`,
        query => {
          const line2: messages.ITestResult[] = query.getScenarioResults(
            'test.feature',
            2
          )
          assert.strictEqual(line2[0].status, messages.TestResult.Status.FAILED)
          cb()
        },
        cb
      )
    })

    it("looks up result for rule->scenario's uri and line", (cb: (
      error?: Error | null
    ) => void) => {
      check(
        `Feature: hello
  Rule: a rule
    Scenario: hi
      Given a passed step
      Given a failed step
`,
        query => {
          const line3: messages.ITestResult[] = query.getScenarioResults(
            'test.feature',
            3
          )
          assert.strictEqual(line3[0].status, messages.TestResult.Status.FAILED)
          cb()
        },
        cb
      )
    })
  })

  describe('#getDocumentResults(uri)', () => {
    it('returns empty array when there are no hits', () => {
      assert.deepStrictEqual(
        new CucumberQuery().getDocumentResults('test.feature'),
        []
      )
    })

    it('looks up result for a whole file', cb => {
      check(
        `Feature: hello

    Scenario: passed
      Given a passed step

    Scenario: failed
      Given a failed step

    Scenario: passed too
      Given a passed step
`,
        query => {
          const results: messages.ITestResult[] = query.getDocumentResults(
            'test.feature'
          )
          assert.strictEqual(
            results[0].status,
            messages.TestResult.Status.FAILED
          )
          cb()
        },
        cb
      )
    })
  })

  describe('#getStepMatchArguments(uri, lineNumber)', () => {
    it('returns empty array when there are no hits', () => {
      assert.deepStrictEqual(
        new CucumberQuery().getStepMatchArguments('test.feature', 1),
        []
      )
    })

    it("looks up result for step's uri and line", cb => {
      check(
        `Feature: hello
  Scenario: hi
    Given a passed step
    And I have 567 cukes in my belly
`,
        query => {
          const line3: messages.IStepMatchArgument[] = query.getStepMatchArguments(
            'test.feature',
            3
          )
          assert.deepStrictEqual(
            line3.map(arg => arg.parameterTypeName),
            ['word']
          )

          const line4: messages.IStepMatchArgument[] = query.getStepMatchArguments(
            'test.feature',
            4
          )
          assert.deepStrictEqual(
            line4.map(arg => arg.parameterTypeName),
            ['int', 'word']
          )
          cb()
        },
        cb
      )
    })
  })

  describe('#getGherkinStep(pickleStepId)', () => {
    it('looks up a Gherkin step', cb => {
      check(
        `Feature: hello
  Scenario: hi
    Given a passed step
`,
        (query, envelopes) => {
          const pickleStep = envelopes.find(e => e.pickle).pickle.steps[0]
          const gherkinStep = query.getGherkinStep(pickleStep.astNodeIds[0])
          assert.deepStrictEqual(gherkinStep.text, 'a passed step')
          cb()
        },
        cb
      )
    })
  })
})

function generateMessages(gherkinSource: string, uri: string): Readable {
  const source = messages.Envelope.fromObject({
    source: {
      uri,
      data: gherkinSource,
      media: messages.Media.fromObject({
        encoding: 'UTF8',
        contentType: 'text/x.cucumber.gherkin+plain',
      }),
    },
  })

  const supportCode = new SupportCode()
  makeDummyStepDefinitions(supportCode)
  return gherkin
    .fromSources([source], { newId: gherkin.uuid() })
    .pipe(new CucumberStream(supportCode.stepDefinitions, supportCode.hooks))
}

function check(
  gherkinSource: string,
  listener: (
    cucumberQuery: CucumberQuery,
    envelopes: messages.IEnvelope[]
  ) => void,
  cb: (error?: Error | null) => void
) {
  const cucumberQuery = new CucumberQuery()
  const envelopes: messages.IEnvelope[] = []
  const sink = generateMessages(gherkinSource, 'test.feature').pipe(
    new Writable({
      objectMode: true,
      write(
        envelope: messages.IEnvelope,
        encoding: string,
        callback: (error?: Error | null) => void
      ): void {
        envelopes.push(envelope)
        cucumberQuery.update(envelope)
        callback()
      },
    })
  )

  sink.on('error', cb)
  sink.on('finish', () => listener(cucumberQuery, envelopes))
}
