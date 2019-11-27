import TestStep from './TestStep'
import { messages } from 'cucumber-messages'

export default class PickleTestStep extends TestStep {
  public toMessage(): messages.TestCase.ITestStep {
    return new messages.TestCase.TestStep({
      id: this.id,
      pickleStepId: this.sourceId,
      stepDefinitionId: this.supportCodeExecutors.map(
        supportCodeExecutor => supportCodeExecutor.stepDefinitionId
      ),
      stepMatchArguments:
        this.supportCodeExecutors.length !== 1
          ? null
          : this.supportCodeExecutors[0].argsToMessages(),
    })
  }
}
