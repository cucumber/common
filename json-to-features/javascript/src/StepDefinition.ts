import IStepDefinition from '@cucumber/fake-cucumber/dist/src/IStepDefinition'
import { messages } from '@cucumber/messages'
import SupportCodeExecutor from '@cucumber/fake-cucumber/dist/src/SupportCodeExecutor'
import { AnyBody } from '@cucumber/fake-cucumber/dist/src/types'

export default class StepDefinition implements IStepDefinition {
  constructor(
    private readonly stepId: string,
    private readonly body: AnyBody
  ) {}

  match(pickleStep: messages.Pickle.IPickleStep): SupportCodeExecutor | null {
    if (pickleStep.astNodeIds.includes(this.stepId)) {
      return new SupportCodeExecutor('plop', this.body, [], null, null)
    }
    return null
  }

  getArguments(text: string): Array<Argument<any>> {
    return []
  }

  toMessage(): messages.IEnvelope {

  }
}