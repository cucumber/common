import assert from 'assert'
import * as gherkin from '../src'
import { Readable } from 'stream'
import { messages } from 'cucumber-messages'

describe('gherkin', () => {
  it('parses gherkin from the file system', async () => {
    const wrappers = await streamToArray(
      gherkin.fromPaths(['testdata/good/minimal.feature'])
    )
    assert.strictEqual(wrappers.length, 3)
  })

  it('parses gherkin from STDIN', async () => {
    const source = messages.Source.fromObject({
      uri: 'test.feature',
      data: `Feature: Minimal

  Scenario: minimalistic
    Given the minimalism
`,
      media: messages.Media.fromObject({
        encoding: 'UTF8',
        contentType: 'text/x.cucumber.gherkin+plain',
      }),
    })

    const envelopes = await streamToArray(gherkin.fromSources([source]))
    assert.strictEqual(envelopes.length, 3)
  })

  it('parses gherkin using the provided default language', async () => {
    const source = messages.Source.fromObject({
      uri: 'test.feature',
      data: `Fonctionnalité: i18n support
  Scénario: Support des caractères spéciaux
    Soit un exemple de scénario en français
`,
      media: messages.Media.fromObject({
        encoding: 'UTF-8',
        contentType: 'text/x.cucumber.gherkin+plain',
      }),
    })
    const wrappers = await streamToArray(
      gherkin.fromSources([source], { defaultDialect: 'fr' })
    )
    assert.strictEqual(wrappers.length, 3)
  })

  it('outputs dialects', async () => {
    const result = gherkin.dialects()
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
