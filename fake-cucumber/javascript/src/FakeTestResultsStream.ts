import { Transform } from 'stream'
import { messages } from 'cucumber-messages'

class FakeTestResultsStream extends Transform {
  private readonly buffer: messages.IEnvelope[] = []

  constructor(
    private readonly format:
      | 'json'
      | 'ndjson'
      | 'protobuf'
      | 'protobuf-objects',
    private readonly results: 'none' | 'random' | 'pattern',
  ) {
    super({ objectMode: true })
  }

  public _transform(
    envelope: messages.IEnvelope,
    encoding: string,
    callback: (error?: Error | null, data?: any) => void,
  ): void {
    this.p(envelope)

    if (envelope.pickle && this.results !== 'none') {
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
      let testStepStatus: messages.TestResult.Status =
        messages.TestResult.Status.PASSED
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

        switch (this.results) {
          case 'pattern':
            testStepStatus = patternStatus(step.text)
            break
          case 'random':
            testStepStatus =
              testStepStatus === messages.TestResult.Status.PASSED
                ? randomStatus()
                : messages.TestResult.Status.SKIPPED
            break
          default:
            throw new Error(`Unexpected results value: ${this.results}`)
        }
        if (testStepStatus === messages.TestResult.Status.FAILED) {
          errorMessage = `Error in step '${step.text}'`
        }
        if (testStepStatus > testCaseStatus) {
          testCaseStatus = testStepStatus
        }

        this.p(
          new messages.Envelope({
            testStepFinished: new messages.TestStepFinished({
              index,
              pickleId: envelope.pickle.id,
              testResult: {
                status: testStepStatus,
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

function patternStatus(text: string): messages.TestResult.Status {
  if (text.match(/ambiguous/)) {
    return messages.TestResult.Status.AMBIGUOUS
  } else if (text.match(/failed/)) {
    return messages.TestResult.Status.FAILED
  } else if (text.match(/passed/)) {
    return messages.TestResult.Status.PASSED
  } else if (text.match(/pending/)) {
    return messages.TestResult.Status.PENDING
  } else if (text.match(/skipped/)) {
    return messages.TestResult.Status.SKIPPED
  } else if (text.match(/undefined/)) {
    return messages.TestResult.Status.UNDEFINED
  } else {
    return messages.TestResult.Status.PASSED
  }
}

function randomStatus(): messages.TestResult.Status {
  return random([
    messages.TestResult.Status.PASSED,
    messages.TestResult.Status.PENDING,
    messages.TestResult.Status.UNDEFINED,
    messages.TestResult.Status.AMBIGUOUS,
    messages.TestResult.Status.FAILED,
  ])
}

function random<T>(array: T[]): T {
  const randomIndex = Math.round(Math.random() * array.length)
  return array[randomIndex]
}

export default FakeTestResultsStream
