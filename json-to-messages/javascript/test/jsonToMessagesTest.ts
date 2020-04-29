import { Readable } from 'stream'
import { jsonToMessages } from '../src'
import { messages, NdjsonToMessageStream } from '@cucumber/messages'
import assert from 'assert'

describe('jsonToMesssages', () => {
  it('emits a Source message for every Gherkin document', async () => {
    const jsons = Readable.from([
      JSON.stringify([
        {
          elements: [],
          id: 'hooks',
          keyword: 'Feature',
          line: 1,
          name: 'Hooks',
          uri: 'features/hooks/hooks.feature',
        },
      ]),
    ])
    const emitted: messages.IEnvelope[] = []
    const out = new NdjsonToMessageStream(
      messages.Envelope.fromObject.bind(messages.Envelope)
    )
    out.on('data', (message) => emitted.push(message))
    await jsonToMessages(jsons, out)

    assert.equal(emitted.filter((envelope) => envelope.source).length, 1)
  })
})
