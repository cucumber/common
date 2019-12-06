import { messages } from 'cucumber-messages'
import { MessageNotifier } from './types'
import TestPlan from './TestPlan'
import IStepDefinition from './IStepDefinition'
import { IHook } from './IHook'
import { ICucumberSupportCode } from './support-code'

export default class Cucumber {
  constructor(
    // * Source (sent through)
    // * GherkinDocument (sent through)
    // * Pickle (used)
    private readonly gherkinMessages: messages.IEnvelope[],
    private readonly supportCode: ICucumberSupportCode,
    private readonly supportCodeRegister: (supportCode: ICucumberSupportCode) => messages.IEnvelope[]
  ) {}

  public execute(notifier: MessageNotifier) {
    for (const gherkinMessage of this.gherkinMessages) {
      notifier(gherkinMessage)
    }

    for (const supportCodeMessage of this.supportCodeRegister(this.supportCode)) {
      notifier(supportCodeMessage)
    }

    const pickles = this.gherkinMessages
      .filter(m => m.pickle)
      .map(m => m.pickle)
    const testPlan = new TestPlan(pickles, this.supportCode)
    testPlan.execute(notifier)
  }
}
