import { Transform } from 'stream'
import { messages } from 'cucumber-messages'

class FakeCucumberStream extends Transform {
  private readonly buffer: messages.Envelope[] = []

  constructor(private readonly format: 'json' | 'ndjson' | 'protobuf') {
    super({ objectMode: true })
  }

  public _transform(
    message: any,
    encoding: string,
    callback: (error?: Error | null, data?: any) => void
  ): void {
    const envelope = message.constructor.toObject(message, { defaults: true })
    this.p(envelope)

    if (envelope.pickle) {
      this.p(
        new messages.Envelope({
          testCaseStarted: new messages.TestCaseStarted({
            pickleId: envelope.pickle.id,
          }),
        })
      )
      let index = 0
      for (const step of envelope.pickle.steps) {
        this.p(
          new messages.Envelope({
            testStepStarted: new messages.TestStepStarted({
              index,
              pickleId: envelope.pickle.id,
            }),
          })
        )

        let status: messages.TestResult.Status
        let errorMessage: string = null
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
          })
        )
        index++
      }

      this.p(
        new messages.Envelope({
          testCaseFinished: new messages.TestCaseFinished({
            pickleId: envelope.pickle.id,
          }),
        })
      )
    }

    callback()
  }

  public _flush(callback: (error?: Error | null, data?: any) => void): void {
    this.push(JSON.stringify(this.buffer) + '\n')
  }

  private p(envelope: messages.Envelope) {
    switch (this.format) {
      case 'ndjson':
        this.push(JSON.stringify(envelope) + '\n')
        break
      case 'protobuf':
        this.push(messages.Envelope.encodeDelimited(envelope).finish())
        break
      case 'json':
        this.buffer.push(envelope)
    }
  }
}

export default FakeCucumberStream
