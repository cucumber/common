import { Transform } from 'stream'
import { messages } from 'cucumber-messages'

class FakeTestResultsStream extends Transform {
  private readonly buffer: messages.IEnvelope[] = []

  constructor(
    private readonly format: 'json' | 'ndjson' | 'protobuf' | 'protobuf-objects',
  ) {
    super({ objectMode: true })
  }

  public _transform(
    envelope: messages.IEnvelope,
    encoding: string,
    callback: (error?: Error | null, data?: any) => void,
  ): void {
    this.p(envelope)

    if (envelope.pickle) {
      this.p(
        new messages.Envelope({
          testCaseStarted: new messages.TestCaseStarted({
            pickleId: envelope.pickle.id,
          }),
        }),
      )
      let index = 0
      let testCaseStatus: messages.TestResult.Status =
        messages.TestResult.Status.UNKNOWN
      let errorMessage: string = null

      for (const step of envelope.pickle.steps) {
        this.p(
          new messages.Envelope({
            testStepStarted: new messages.TestStepStarted({
              index,
              pickleId: envelope.pickle.id,
            }),
          }),
        )

        let status: messages.TestResult.Status
        if (step.text.match(/ambiguous/)) {
          status = messages.TestResult.Status.AMBIGUOUS
        } else if (step.text.match(/failed/)) {
          status = messages.TestResult.Status.FAILED
          errorMessage = `Error in step '${step.text}'`
        } else if (step.text.match(/passed/)) {
          status = messages.TestResult.Status.PASSED
        } else if (step.text.match(/pending/)) {
          status = messages.TestResult.Status.PENDING
        } else if (step.text.match(/skipped/)) {
          status = messages.TestResult.Status.SKIPPED
        } else if (step.text.match(/undefined/)) {
          status = messages.TestResult.Status.UNDEFINED
        } else {
          status = messages.TestResult.Status.PASSED
        }

        if (status > testCaseStatus) {
          testCaseStatus = status
        }

        this.p(
          new messages.Envelope({
            testStepFinished: new messages.TestStepFinished({
              index,
              pickleId: envelope.pickle.id,
              testResult: {
                status,
                message: errorMessage,
              },
            }),
          }),
        )
        index++
      }

      this.p(
        new messages.Envelope({
          testCaseFinished: new messages.TestCaseFinished({
            pickleId: envelope.pickle.id,
            testResult: {
              status: testCaseStatus,
              message: errorMessage,
            },
          }),
        }),
      )
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
