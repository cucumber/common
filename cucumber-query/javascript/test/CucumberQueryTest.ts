import gherkin from 'gherkin'
import { messages } from 'cucumber-messages'
import { FakeTestResultsStream } from 'fake-cucumber'
import { Readable, Writable } from 'stream'
import * as assert from 'assert'
import CucumberQuery from '../src/CucumberQuery'

describe('CucumberQuery', () => {
  it("looks up result for step's uri and line", (cb: (
    error?: Error | null
  ) => void) => {
    const query = new CucumberQuery()

    check(
      `Feature: hello
  Scenario: hi
    Given a passed step
    Given a failed step
`,
      query,
      () => {
        const line3: messages.ITestResult[] = query.getStepResults(
          'test.feature',
          3
        )
        assert.strictEqual(line3[0].status, messages.TestResult.Status.PASSED)

        const line4: messages.ITestResult[] = query.getStepResults(
          'test.feature',
          4
        )
        assert.strictEqual(line4[0].status, messages.TestResult.Status.FAILED)
        cb()
      },
      cb
    )
  })

  it("looks up result for scenario's uri and line", (cb: (
    error?: Error | null
  ) => void) => {
    const query = new CucumberQuery()

    check(
      `Feature: hello
  Scenario: hi
    Given a passed step
    Given a failed step
`,
      query,
      () => {
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
    const query = new CucumberQuery()

    check(
      `Feature: hello
  Rule: a rule
    Scenario: hi
      Given a passed step
      Given a failed step
`,
      query,
      () => {
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

  it('looks up result for a whole file', (cb: (
    error?: Error | null
  ) => void) => {
    const query = new CucumberQuery()

    check(
      `Feature: hello

    Scenario: passed
      Given a passed step

    Scenario: failed
      Given a failed step

    Scenario: passed too
      Given a passed step
`,
      query,
      () => {
        const results: messages.ITestResult[] = query.getDocumentResults(
          'test.feature'
        )
        assert.strictEqual(results[0].status, messages.TestResult.Status.FAILED)
        cb()
      },
      cb
    )
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

  return gherkin
    .fromSources([source], { newId: gherkin.uuid() })
    .pipe(new FakeTestResultsStream('protobuf-objects', 'pattern'))
}

function check(
  gherkinSource: string,
  query: CucumberQuery,
  listener: () => void,
  cb: (error?: Error | null) => void
) {
  const sink = generateMessages(gherkinSource, 'test.feature').pipe(
    new Writable({
      objectMode: true,
      write(
        message: messages.IEnvelope,
        encoding: string,
        callback: (error?: Error | null) => void
      ): void {
        query.update(message)
        callback()
      },
    })
  )

  sink.on('error', cb)
  sink.on('finish', listener)
}
