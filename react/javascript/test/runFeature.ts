import {
  runCucumber,
  SupportCode,
  IHook,
  ISupportCodeExecutor,
} from '@cucumber/fake-cucumber'
import { Query as GherkinQuery, parseAndCompile } from '@cucumber/gherkin'
import { Writable, PassThrough } from 'stream'
import { messages } from '@cucumber/messages'

export class FailingCodeSupport implements ISupportCodeExecutor {
  constructor(readonly stepDefinitionId: string) {}

  public execute() {
    throw new Error('Woops ...')
  }
  public argsToMessages(): messages.TestCase.TestStep.StepMatchArgumentsList.IStepMatchArgument[] {
    return []
  }
}

export class FailingHook implements IHook {
  constructor(public readonly id: string) {}

  match(): ISupportCodeExecutor {
    return new FailingCodeSupport('')
  }

  toMessage(): messages.IEnvelope {
    return messages.Envelope.create({
      hook: messages.Hook.create({
        id: this.id,
      }),
    })
  }
}

export default async function runFeature(
  feature: string,
  gherkinQuery: GherkinQuery,
  supportCode: SupportCode = new SupportCode()
): Promise<messages.IEnvelope[]> {
  const emitted: messages.IEnvelope[] = []
  const out = new Writable({
    objectMode: true,
    write(
      envelope: messages.IEnvelope,
      encoding: string,
      callback: (error?: Error | null) => void
    ): void {
      emitted.push(envelope)
      try {
        callback()
      } catch (err) {
        callback(err)
      }
    },
  })

  const gherkinEnvelopeStream = new PassThrough({ objectMode: true })
  parseAndCompile(feature, (envelope) => {
    gherkinEnvelopeStream.write(envelope)
    gherkinQuery.update(envelope)
  })
  gherkinEnvelopeStream.end()

  await runCucumber(supportCode, gherkinEnvelopeStream, gherkinQuery, out)
  return emitted
}
