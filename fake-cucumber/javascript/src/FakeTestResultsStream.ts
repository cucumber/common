import { Transform } from 'stream'
import { messages } from 'cucumber-messages'
import StepDefinitionRegistry from './StepDefinitionRegistry'
import defaultStepDefinitionRegistry from './DefaultStepDefinitions'
import TestCase from './TestCase'

class FakeTestResultsStream extends Transform {
  private readonly buffer: messages.IEnvelope[] = []
  private stepDefinitionStreamed = false

  constructor(
    private readonly format:
      | 'json'
      | 'ndjson'
      | 'protobuf'
      | 'protobuf-objects',
    private readonly results: 'none' | 'random' | 'pattern',
    private readonly stepDefinitionRegistry: StepDefinitionRegistry = defaultStepDefinitionRegistry()
  ) {
    super({ objectMode: true })
  }

  public _transform(
    envelope: messages.IEnvelope,
    encoding: string,
    callback: (error?: Error | null, data?: any) => void
  ): void {
    this.p(envelope)

    if (!this.stepDefinitionStreamed) {
      this.stepDefinitionRegistry.toMessages().forEach(message => {
        this.p(message)
      })
      this.stepDefinitionStreamed = true
    }

    if (envelope.pickle && this.results !== 'none') {
      // const testCaseId = uuidv4()

      const testSteps = envelope.pickle.steps.map(pickleStep => {
        return this.stepDefinitionRegistry.createTestStep(
          pickleStep.text,
          pickleStep.id
        )
      })
      const testCase = new TestCase(testSteps)
      testCase.execute(message => this.p(message))

      // this.p(
      //   new messages.Envelope({
      //     testCase: new messages.TestCase({
      //       pickleId: envelope.pickle.id,
      //       id: testCaseId,
      //       testSteps: testSteps.map(step => step.toMessage()),
      //     }),
      //   })
      // )
      //
      // const attempt = 0
      // const testCaseStartedId = uuidv4()
      //
      // this.p(
      //   new messages.Envelope({
      //     testCaseStarted: new messages.TestCaseStarted({
      //       attempt,
      //       testCaseId,
      //       id: testCaseStartedId,
      //     }),
      //   })
      // )
      //
      // const testStepStatus: messages.TestResult.Status = null
      // const testStepStatuses: messages.TestResult.Status[] = []
      //
      // for (const testStep of testSteps) {
      //   this.p(
      //     new messages.Envelope({
      //       testStepStarted: new messages.TestStepStarted({
      //         testCaseStartedId,
      //         testStepId: testStep.id,
      //       }),
      //     })
      //   )
      //
      //   testStep.execute(message => this.p(message))
      //
      //   // testStepStatuses.push(testStepFinished.testResult.status)
      // }
      //
      // this.p(
      //   new messages.Envelope({
      //     testCaseFinished: new messages.TestCaseFinished({
      //       testCaseStartedId,
      //       testResult: {
      //         status:
      //           testStepStatuses.sort()[testStepStatuses.length - 1] ||
      //           messages.TestResult.Status.UNKNOWN,
      //         message:
      //           testStepStatus === messages.TestResult.Status.FAILED
      //             ? `Some error message\n\tfake_file:2\n\tfake_file:7\n`
      //             : null,
      //         duration: new messages.Duration({
      //           seconds: 987654,
      //           nanos: 321,
      //         }),
      //       },
      //     }),
      //   })
      // )
    }

    callback()
  }

  public _flush(callback: (error?: Error | null, data?: any) => void): void {
    if (this.format === 'json') {
      this.push(JSON.stringify(this.buffer) + '\n')
    }
    callback()
  }

  private p(envelope: messages.IEnvelope) {
    switch (this.format) {
      case 'json':
        this.buffer.push(envelope)
        break
      case 'ndjson':
        this.push(JSON.stringify(envelope) + '\n')
        break
      case 'protobuf':
        this.push(messages.Envelope.encodeDelimited(envelope).finish())
        break
      case 'protobuf-objects':
        this.push(envelope)
        break
      default:
        throw new Error(`Invalid format "${this.format}"`)
    }
  }
}

export default FakeTestResultsStream
