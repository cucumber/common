import { IHook, ISupportCodeExecutor } from '@cucumber/fake-cucumber'
import * as messages from '@cucumber/messages'
import { NilCodeExecutor } from './SupportCodeExecutor'

export default class PredictableHook implements IHook {
  constructor(
    public readonly id: string,
    private readonly scenarioId: string,
    private readonly location: string,
    public readonly status:
      | 'UNKNOWN'
      | 'PASSED'
      | 'SKIPPED'
      | 'PENDING'
      | 'UNDEFINED'
      | 'AMBIGUOUS'
      | 'FAILED',
    public readonly duration: number,
    public readonly errorMessage?: string
  ) {}

  match(pickle: messages.Pickle): ISupportCodeExecutor {
    if (!pickle.ast_node_ids.includes(this.scenarioId)) {
      return null
    }
    return new NilCodeExecutor(null)
  }

  toMessage(): messages.Envelope {
    const locationChunks = this.location.split(':')

    return {
      hook: {
        id: this.id,
        source_reference: {
          uri: locationChunks[0],
          location: {
            line: parseInt(locationChunks[1]),
          },
        },
      },
    }
  }
}
