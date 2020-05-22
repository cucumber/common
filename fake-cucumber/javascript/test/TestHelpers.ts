import { Readable } from 'stream'
import { IdGenerator, messages } from '@cucumber/messages'
import { GherkinStreams } from '@cucumber/gherkin'

export function gherkinMessages(gherkinSource: string, uri: string): Readable {
  const source = messages.Envelope.fromObject({
    source: {
      uri,
      data: gherkinSource,
      mediaType: 'text/x.cucumber.gherkin+plain',
    },
  })

  return GherkinStreams.fromSources([source], {
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
