import { Readable } from 'stream'
import { jsonToMessages } from '../src'
import {
  messages,
  NdjsonToMessageStream,
  version as messagesVersion,
} from '@cucumber/messages'
import assert from 'assert'
import { version } from '../package.json'

describe('jsonToMesssages', () => {
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

    assert.equal(emitted.filter((envelope) => envelope.source).length, 1)
  })

  context('a meta Mesage is emitted at the beginning', () => {
    let meta: messages.IMeta

    before(async () => {
      const emitted = await produceMessages(['[]'])
      meta = emitted.find((envelope) => envelope.meta).meta
    })

    it('contains the @cucumber-messages version', () => {
      assert.equal(meta.protocolVersion, messagesVersion)
    })

    it('does not provide any information about the original producer of the JSON', () => {
      assert.equal(meta.implementation.name, '@cucumber/json-to-messages')
      assert.equal(meta.implementation.version, version)
    })

    it('doe not provide informations about the underlying infrastructure', () => {
      assert.equal(meta.cpu, null)
      assert.equal(meta.os, null)
      assert.equal(meta.runtime, null)
    })
  })
})

async function produceMessages(jsons: string[]): Promise<messages.IEnvelope[]> {
  const inputStream = new Readable({
    read() {
      this.push(jsons.join(''))
      this.push(null)
    },
  })

  const emitted: messages.IEnvelope[] = []
  const out = new NdjsonToMessageStream(
    messages.Envelope.fromObject.bind(messages.Envelope)
  )
  out.on('data', (message) => emitted.push(message))
  await jsonToMessages(inputStream, out)

  return emitted
}
