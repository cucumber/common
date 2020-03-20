import assert from 'assert'
import { messages } from '@cucumber/messages'

class RubyJSONParser {
  public parse(sources: Record<string, any>[]): messages.IGherkinDocument[] {
    return sources.map(source => this.makeGherkinDocument(source))
  }

  private makeGherkinDocument(
    source: Record<string, any>
  ): messages.IGherkinDocument {
    return messages.GherkinDocument.create({
      uri: source.uri,
      feature: this.makeFeature(source),
    })
  }

  private makeFeature(
    source: Record<string, any>
  ): messages.GherkinDocument.IFeature {
    return messages.GherkinDocument.Feature.create({
      name: source.name,
      description: source.description,
    })
  }
}

describe('RubyJSONParser', () => {
  const parser = new RubyJSONParser()
  const sources = [
    {
      name: 'Attachments',
      description: 'Attachments can be added to steps',
      uri: 'features/attachments/attachments.feature',
    },
    {
      name: 'Another feature',
      description: '',
      uri: 'features/another/another.feature',
    },
  ]

  context('.parse', () => {
    it('returns an empty list when sources are empty', () => {
      assert.deepStrictEqual(parser.parse([]), [])
    })

    it('produces a list of GherkinDocument with the correct URIs', () => {
      const documents = parser.parse(sources)
      assert.deepStrictEqual(
        documents.map(d => d.uri),
        [
          'features/attachments/attachments.feature',
          'features/another/another.feature',
        ]
      )
    })

    it('creates a Feature for each document', () => {
      const documents = parser.parse(sources)

      assert.deepStrictEqual(
        documents.map(d => d.feature.name),
        ['Attachments', 'Another feature']
      )

      assert.deepStrictEqual(
        documents.map(d => d.feature.description),
        ['Attachments can be added to steps', '']
      )
    })
  })
})
