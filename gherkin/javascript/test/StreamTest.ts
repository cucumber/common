import assert from 'assert'
import { Readable } from 'stream'
import { messages } from 'cucumber-messages'
import Gherkin from '../src/Gherkin'
import makeSourceEnvelope from '../src/stream/makeSourceEnvelope'

describe('gherkin', () => {
  it('parses gherkin from the file system', async () => {
    const envelopes = await streamToArray(
      Gherkin.fromPaths(['testdata/good/minimal.feature'])
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

    const envelopes = await streamToArray(Gherkin.fromSources([source]))
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
      Gherkin.fromSources([source], { defaultDialect: 'fr' })
    )
    assert.strictEqual(envelopes.length, 3)
  })

  it('outputs dialects', async () => {
    const dialects = Gherkin.dialects()
    assert.strictEqual(dialects.en.name, 'English')
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
