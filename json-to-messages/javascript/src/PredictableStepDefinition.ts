import { IStepDefinition, ISupportCodeExecutor } from '@cucumber/fake-cucumber'
import { messages } from '@cucumber/messages'
import { NilCodeExecutor } from './SupportCodeExecutor'

export default class PredictableStepDefinition implements IStepDefinition {
  constructor(
    public readonly id: string,
    private readonly stepId: string,
    private readonly location: string,
    public readonly status: messages.TestStepFinished.TestStepResult.Status,
    public readonly duration: number,
    public readonly errorMessage?: string
  ) {}

  match(pickleStep: messages.Pickle.IPickleStep): ISupportCodeExecutor | null {
    if (pickleStep.astNodeIds.includes(this.stepId)) {
      return new NilCodeExecutor(this.id)
    }
    return null
  }

  toMessage(): messages.IEnvelope {
    const locationChunks = this.location.split(':')

    return messages.Envelope.create({
      stepDefinition: messages.StepDefinition.create({
        id: this.id,
        sourceReference: messages.SourceReference.create({
          uri: locationChunks[0],
          location: messages.Location.create({
            line: parseInt(locationChunks[1]),
          }),
        }),
      }),
    })
  }
}
