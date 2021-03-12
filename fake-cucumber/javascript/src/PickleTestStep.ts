import TestStep from './TestStep'
import * as messages from '@cucumber/messages'

export default class PickleTestStep extends TestStep {
  public toMessage(): messages.TestStep {
    return {
      id: this.id,
      pickle_step_id: this.sourceId,
      step_definition_ids: this.supportCodeExecutors.map(
        (supportCodeExecutor) => supportCodeExecutor.stepDefinitionId
      ),
      step_match_arguments_lists: this.supportCodeExecutors.map((e) => ({
        step_match_arguments: e.argsToMessages().slice(),
      })),
    }
  }
}
