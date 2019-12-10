import { stubConstructor } from 'ts-sinon'
import SupportCodeExecutor from '../src/SupportCodeExecutor'
import ExpressionStepDefinition from '../src/ExpressionStepDefinition'
import { Readable } from 'stream'
import { messages, IdGenerator } from 'cucumber-messages'
import gherkin from 'gherkin'

export function stubPassingSupportCodeExecutor(): SupportCodeExecutor {
  const supportCodeExecutorStub = stubConstructor(SupportCodeExecutor)
  supportCodeExecutorStub.execute.returns(undefined)

  return supportCodeExecutorStub
}

export function stubPendingSupportCodeExecutor(): SupportCodeExecutor {
  const supportCodeExecutorStub = stubConstructor(SupportCodeExecutor)
  supportCodeExecutorStub.execute.returns('pending')

  return supportCodeExecutorStub
}

export function stubFailingSupportCodeExecutor(
  message: string
): SupportCodeExecutor {
  const supportCodeExecutorStub = stubConstructor(SupportCodeExecutor)
  supportCodeExecutorStub.execute.throws(new Error(message))

  return supportCodeExecutorStub
}

export function stubMatchingStepDefinition(
  executor: SupportCodeExecutor = new SupportCodeExecutor(
    'some-id',
    () => null,
    [],
    null,
    null
  )
): ExpressionStepDefinition {
  const stepDefinitionStub = stubConstructor(ExpressionStepDefinition)
  stepDefinitionStub.match.returns(executor)

  return stepDefinitionStub
}

export function gherkinMessages(gherkinSource: string, uri: string): Readable {
  const source = messages.Envelope.fromObject({
    source: {
      uri,
      data: gherkinSource,
      media: messages.Media.fromObject({
        encoding: 'UTF8',
        contentType: 'text/x.cucumber.gherkin+plain',
      }),
    },
  })

  return gherkin.fromSources([source], {
    newId: IdGenerator.uuid(),
  })
}

export async function streamToArray(
  readableStream: Readable
): Promise<messages.IEnvelope[]> {
  return new Promise<messages.IEnvelope[]>(
    (
      resolve: (wrappers: messages.IEnvelope[]) => void,
      reject: (err: Error) => void
    ) => {
      const items: messages.IEnvelope[] = []
      readableStream.on('data', items.push.bind(items))
      readableStream.on('error', (err: Error) => reject(err))
      readableStream.on('end', () => resolve(items))
    }
  )
}
