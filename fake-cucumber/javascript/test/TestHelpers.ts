import { Readable } from 'stream'
import { IdGenerator, messages } from '@cucumber/messages'
import { GherkinStreams } from '@cucumber/gherkin-streams'

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

export async function streamToArray(readableStream: Readable): Promise<messages.Envelope[]> {
  return new Promise<messages.Envelope[]>(
    (resolve: (wrappers: messages.Envelope[]) => void, reject: (err: Error) => void) => {
      const items: messages.Envelope[] = []
      readableStream.on('data', items.push.bind(items))
      readableStream.on('error', (err: Error) => reject(err))
      readableStream.on('end', () => resolve(items))
    }
  )
}
