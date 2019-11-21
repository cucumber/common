import { messages } from 'cucumber-messages'
import ExpressionStepDefinition from './ExpressionStepDefinition'
import { MessageNotifier } from './types'
import TestPlan from './TestPlan'
import IStepDefinition from './IStepDefinition'

export default class Cucumber {
  constructor(
    // * Source (sent through)
    // * GherkinDocument (sent through)
    // * Pickle (used)
    private readonly gherkinMessages: messages.IEnvelope[],
    private readonly stepDefinitions: IStepDefinition[]
  ) {}

  public execute(notifier: MessageNotifier) {
    for (const gherkinMessage of this.gherkinMessages) {
      notifier(gherkinMessage)
    }
    for (const stepDefinition of this.stepDefinitions) {
      notifier(stepDefinition.toMessage())
    }
    const pickles = this.gherkinMessages
      .filter(m => m.pickle)
      .map(m => m.pickle)
    const testPlan = new TestPlan(pickles, this.stepDefinitions)
    testPlan.execute(notifier)
  }
}
