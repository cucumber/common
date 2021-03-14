import TestStep from './TestStep'
import * as messages from '@cucumber/messages'

export default class PickleTestStep extends TestStep {
  public toMessage(): messages.TestStep {
    return {
      id: this.id,
      pickleStepId: this.sourceId,
      stepDefinitionIds: this.supportCodeExecutors.map(
        (supportCodeExecutor) => supportCodeExecutor.stepDefinitionId
      ),
      stepMatchArgumentsLists: this.supportCodeExecutors.map((e) => ({
        stepMatchArguments: e.argsToMessages().slice(),
      })),
    }
  }
}
