import { Readable } from 'stream'
import { jsonToMessages } from '../src'
import * as messages from '@cucumber/messages'
import assert from 'assert'
import { version } from '../package.json'
import { NdjsonToMessageStream } from '@cucumber/message-streams'

describe('jsonToMessages', () => {
  it('emits a Source message for every Gherkin document', async () => {
    const emitted = await produceMessages([
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

    assert.strictEqual(emitted.filter((envelope) => envelope.source).length, 1)
  })

  context('a meta Message is emitted at the beginning', () => {
    let meta: messages.Meta

    before(async () => {
      const emitted = await produceMessages(['[]'])
      meta = emitted.find((envelope) => envelope.meta).meta
    })

    it('contains the @cucumber-messages version', () => {
      assert.strictEqual(meta.protocolVersion, messages.version)
    })

    it('does not provide any information about the original producer of the JSON', () => {
      assert.strictEqual(meta.implementation.name, '@cucumber/json-to-messages')
      assert.strictEqual(meta.implementation.version, version)
    })
  })
})

async function produceMessages(jsons: string[]): Promise<messages.Envelope[]> {
  const inputStream = new Readable({
    read() {
      this.push(jsons.join(''))
      this.push(null)
    },
  })

  const emitted: messages.Envelope[] = []
  const out = new NdjsonToMessageStream()
  out.on('data', (message) => emitted.push(message))
  await jsonToMessages(inputStream, out)

  return emitted
}
