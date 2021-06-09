import { Readable } from 'stream'
import * as messages from '@cucumber/messages'
import { GherkinStreams } from '@cucumber/gherkin-streams'

export function gherkinMessages(gherkinSource: string, uri: string): Readable {
  const source: messages.Envelope = {
    source: {
      uri,
      data: gherkinSource,
      mediaType: messages.SourceMediaType.TEXT_X_CUCUMBER_GHERKIN_PLAIN,
    },
  }

  return GherkinStreams.fromSources([source], {
    newId: messages.IdGenerator.uuid(),
  })
}

export async function streamToArray(readableStream: Readable): Promise<messages.Envelope[]> {
  return new Promise<messages.Envelope[]>(
    (resolve: (wrappers: messages.Envelope[]) => void, reject: (err: Error) => void) => {
      const items: messages.Envelope[] = []
      readableStream.on('data', items.push.bind(items))
      readableStream.on('error', reject)
      readableStream.on('end', () => resolve(items))
    }
  )
}
