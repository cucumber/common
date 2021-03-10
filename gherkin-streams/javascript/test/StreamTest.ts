import assert from 'assert'
import { Readable } from 'stream'
import { messages } from '@cucumber/messages'
import { dialects, IGherkinOptions, makeSourceEnvelope } from '@cucumber/gherkin'
import { GherkinStreams } from '../src'

const defaultOptions: IGherkinOptions = {}

describe('gherkin', () => {
  it('parses gherkin from the file system', async () => {
    const envelopes = await streamToArray(
      GherkinStreams.fromPaths(['testdata/good/minimal.feature'], defaultOptions)
    )
    assert.strictEqual(envelopes.length, 3)
  })

  it('throws an error when the path is a directory', async () => {
    assert.rejects(async () =>
      streamToArray(GherkinStreams.fromPaths(['testdata/good'], defaultOptions))
    )
  })

  it('parses gherkin from STDIN', async () => {
    const source = makeSourceEnvelope(
      `Feature: Minimal

  Scenario: minimalistic
    Given the minimalism
`,
      'test.feature'
    )

    const envelopes = await streamToArray(GherkinStreams.fromSources([source], defaultOptions))
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
      GherkinStreams.fromSources([source], { defaultDialect: 'fr' })
    )
    assert.strictEqual(envelopes.length, 3)
  })

  it('outputs dialects', async () => {
    assert.strictEqual(dialects.en.name, 'English')
  })
})

async function streamToArray(readableStream: Readable): Promise<messages.IEnvelope[]> {
  return new Promise<messages.IEnvelope[]>(
    (resolve: (wrappers: messages.IEnvelope[]) => void, reject: (err: Error) => void) => {
      const items: messages.IEnvelope[] = []
      readableStream.on('data', items.push.bind(items))
      readableStream.on('error', (err: Error) => reject(err))
      readableStream.on('end', () => resolve(items))
    }
  )
}
