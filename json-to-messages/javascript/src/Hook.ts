import { ISupportCodeExecutor, IHook } from '@cucumber/fake-cucumber'
import { messages } from '@cucumber/messages'
import {
  PassedCodeExecutor,
  FailedCodeExecutor,
} from '../src/SupportCodeExecutor'

export default class Hook implements IHook {
  constructor(
    public readonly id: string,
    private readonly scenarioId: string,
    private readonly location: string,
    private readonly stack?: string
  ) {}

  match(pickle: messages.IPickle): ISupportCodeExecutor {
    if (!pickle.astNodeIds.includes(this.scenarioId)) {
      return null
    }

    if (this.stack !== undefined) {
      return new FailedCodeExecutor(null, this.stack)
    }

    return new PassedCodeExecutor(null)
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
