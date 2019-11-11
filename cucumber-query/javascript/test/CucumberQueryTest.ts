import gherkin from 'gherkin'
import { messages } from 'cucumber-messages'
import { FakeTestResultsStream } from 'fake-cucumber'
import { Readable, Writable } from 'stream'
import * as assert from 'assert'

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

class CucumberQuery {
  private readonly testResultsByUriAndLine = new Map<
    string,
    messages.ITestResult[]
  >()
  private readonly testStepById = new Map<string, messages.TestCase.ITestStep>()
  private readonly pickleStepById = new Map<
    string,
    messages.Pickle.IPickleStep
  >()
  private readonly gherkinStepById = new Map<
    string,
    messages.GherkinDocument.Feature.IStep
  >()
  private readonly uriByGherkinStep = new Map<
    messages.GherkinDocument.Feature.IStep,
    string
  >()

  public update(message: messages.IEnvelope): void {
    if (message.testStepFinished) {
      const testStep = this.testStepById.get(
        message.testStepFinished.testStepId
      )
      const pickleStep = this.pickleStepById.get(testStep.pickleStepId)
      const gherkinStep = this.gherkinStepById.get(pickleStep.stepId)

      const uri = this.uriByGherkinStep.get(gherkinStep)
      const lineNumber = gherkinStep.location.line

      let testResults = this.testResultsByUriAndLine.get(`${uri}:${lineNumber}`)
      if (testResults === undefined) {
        testResults = []
        this.testResultsByUriAndLine.set(`${uri}:${lineNumber}`, testResults)
      }
      testResults.push(message.testStepFinished.testResult)
    }

    if (message.testCase) {
      for (const testStep of message.testCase.testSteps) {
        this.testStepById.set(testStep.id, testStep)
      }
    }

    if (message.pickle) {
      for (const pickleStep of message.pickle.steps) {
        this.pickleStepById.set(pickleStep.id, pickleStep)
      }
    }

    if (message.gherkinDocument && message.gherkinDocument.feature) {
      for (const featureChild of message.gherkinDocument.feature.children) {
        for (const step of featureChild.scenario.steps) {
          this.uriByGherkinStep.set(step, message.gherkinDocument.uri)
          this.gherkinStepById.set(step.id, step)
        }
      }
    }
  }

  public getResult(uri: string, lineNumber: number): messages.ITestResult[] {
    return this.testResultsByUriAndLine.get(`${uri}:${lineNumber}`)
  }
}

describe('CucumberQuery', () => {
  it('looks up result for uri and line', (cb: (
    error?: Error | null
  ) => void) => {
    const query = new CucumberQuery()

    const mess = generateMessages(
      `Feature: hello
  Scenario: hi
    Given a passed step
    Given a failed step
`,
      'test.feature'
    )

    const sink = mess.pipe(
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
    sink.on('finish', () => {
      const line3: messages.ITestResult[] = query.getResult('test.feature', 3)
      assert.strictEqual(line3[0].status, messages.TestResult.Status.PASSED)

      const line4: messages.ITestResult[] = query.getResult('test.feature', 4)
      assert.strictEqual(line4[0].status, messages.TestResult.Status.FAILED)
      cb()
    })
  })
})
