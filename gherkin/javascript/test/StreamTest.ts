import assert from 'assert'
import { Readable } from 'stream'
import { messages } from 'cucumber-messages'
import { fromPaths, fromSources, dialects } from '../src'
import makeSourceEnvelope from '../src/stream/makeSourceEnvelope'
import { gherkinOptions } from '../src/types'

describe('gherkin', () => {
  it('parses gherkin from the file system', async () => {
    const envelopes = await streamToArray(
      fromPaths(['testdata/good/minimal.feature'], gherkinOptions({}))
    )
    assert.strictEqual(envelopes.length, 3)
  })

  it('parses gherkin from STDIN', async () => {
    const source = makeSourceEnvelope(
      `Feature: Minimal

  Scenario: minimalistic
    Given the minimalism
`,
      'test.feature'
    )

    const envelopes = await streamToArray(
      fromSources([source], gherkinOptions({}))
    )
    assert.strictEqual(envelopes.length, 3)
  })

  it('parses gherkin using the provided default language', async () => {
    const source = makeSourceEnvelope(
      `Fonctionnalité: i18n support
  Scénario: Support des caractères spéciaux
    Soit un exemple de scénario en français
`,
      'test.feature'
    )
    const envelopes = await streamToArray(
      fromSources([source], gherkinOptions({ defaultDialect: 'fr' }))
    )
    assert.strictEqual(envelopes.length, 3)
  })

  it('outputs dialects', async () => {
    const result = dialects()
    assert.strictEqual(result.en.name, 'English')
  })
})

async function streamToArray(
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
