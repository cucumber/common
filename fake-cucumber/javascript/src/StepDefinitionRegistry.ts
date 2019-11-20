import { messages } from 'cucumber-messages'
import StepDefinition from './StepDefinition'
import TestStep from './TestStep'

export default class StepDefinitionRegistry {
  constructor(private readonly stepDefinitions: StepDefinition[]) {}

  public createTestStep(text: string, pickleStepId: string): TestStep {
    const supportCodeExecutors = this.stepDefinitions
      .map(stepDefinition => stepDefinition.match(text))
      .filter(supportCodeExecutor => supportCodeExecutor !== null)

    return new TestStep(pickleStepId, supportCodeExecutors)
  }

  public toMessages(): messages.IEnvelope[] {
    return this.stepDefinitions.map(stepdef => stepdef.toMessage())
  }
}
