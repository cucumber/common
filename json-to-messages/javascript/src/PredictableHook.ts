import { IHook, ISupportCodeExecutor } from '@cucumber/fake-cucumber'
import { messages } from '@cucumber/messages'
import { NilCodeExecutor } from './SupportCodeExecutor'

export default class PredictableHook implements IHook {
  constructor(
    public readonly id: string,
    private readonly scenarioId: string,
    private readonly location: string,
    public readonly status: messages.TestStepFinished.TestStepResult.Status,
    public readonly duration: number,
    public readonly errorMessage?: string
  ) {}

  match(pickle: messages.IPickle): ISupportCodeExecutor {
    if (!pickle.astNodeIds.includes(this.scenarioId)) {
      return null
    }
    return new NilCodeExecutor(null)
  }

  toMessage(): messages.IEnvelope {
    const locationChunks = this.location.split(':')

    return messages.Envelope.create({
      hook: messages.Hook.create({
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
