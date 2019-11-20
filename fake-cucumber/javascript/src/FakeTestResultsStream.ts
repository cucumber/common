import { Transform } from 'stream'
import { messages } from 'cucumber-messages'
import StepDefinitionRegistry from './StepDefinitionRegistry'
import defaultStepDefinitionRegistry from './DefaultStepDefinitions'
import TestCase from './TestCase'

class FakeTestResultsStream extends Transform {
  private stepDefinitionStreamed = false

  constructor(
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
    this.push(envelope)

    if (!this.stepDefinitionStreamed) {
      this.stepDefinitionRegistry.toMessages().forEach(message => {
        this.push(message)
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
      this.push(
        new messages.Envelope({
          testCase: testCase.toMessage(),
        })
      )
      testCase.execute(message => this.push(message), 0)
    }

    callback()
  }
}

export default FakeTestResultsStream
