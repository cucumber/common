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
      const testSteps = envelope.pickle.steps.map(pickleStep => {
        return this.stepDefinitionRegistry.createTestStep(
          pickleStep.text,
          pickleStep.id
        )
      })
      const testCase = new TestCase(testSteps, envelope.pickle.id)
      this.p(
        new messages.Envelope({
          testCase: testCase.toMessage(),
        })
      )
      testCase.execute(message => this.p(message))
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
