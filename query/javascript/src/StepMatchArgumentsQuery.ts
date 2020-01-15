import { StrictMap } from '@cucumber/gherkin'
import { messages } from '@cucumber/messages'

export default class StepMatchArgumentsQuery {
  private readonly stepMatchArgumentsListsByPickleStepId = new StrictMap<
    string,
    messages.TestCase.TestStep.IStepMatchArgumentsList[]
  >()

  public getStepMatchArgumentsLists(
    pickleStepId: string
  ): messages.TestCase.TestStep.IStepMatchArgumentsList[] {
    return this.stepMatchArgumentsListsByPickleStepId.get(pickleStepId)
  }

  public update(envelope: messages.IEnvelope) {
    if (envelope.testCase) {
      for (const testStep of envelope.testCase.testSteps) {
        this.stepMatchArgumentsListsByPickleStepId.set(
          testStep.pickleStepId,
          testStep.stepMatchArgumentsLists
        )
      }
    }
  }
}
