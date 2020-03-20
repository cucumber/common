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
      children: this.makeChildren(source.elements || [])
    })
  }

  private makeChildren(elements: Record<string, any>[]): messages.GherkinDocument.Feature.IFeatureChild[] {
    return elements.map(element => {
      if (element.type === 'background') {
        return this.makeBackground(element)
      }
    })
  }

  private makeBackground(element: Record<string, any>): messages.GherkinDocument.Feature.IFeatureChild {
    return messages.GherkinDocument.Feature.FeatureChild.create({
      background: messages.GherkinDocument.Feature.Background.create({
        keyword: element.keyword,
        name: element.name,
        description: element.description,
        steps: this.makeSteps(element.steps || [])
      })
    })
  }

  private makeSteps(steps: Record<string, any>[]): messages.GherkinDocument.Feature.IStep[] {
    return steps.map(step =>
      messages.GherkinDocument.Feature.Step.create({
        keyword: step.keyword,
        text: step.text
      })
    )
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

    context('with backgrounds', () => {
      const singleBackground = [
        {
          name: 'Attachments',
          description: 'Attachments can be added to steps',
          uri: 'features/attachments/attachments.feature',
          elements: [
            {
              type: "background",
              keyword: "Background",
              name: "Set up",
              description: "Let's do things",
              steps: [
                {
                  keyword: "Given ",
                  text: "things"
                },
                {
                  keyword: "And ",
                  text: "stuff"
                }
              ]
            }
          ]
        }
      ]

      it('adds the background as a FeatureChild', () => {
        const feature = parser.parse(singleBackground)[0].feature
        assert.equal(feature.children.length, 1)
      })

      it('adds the proper attributes to the background', () => {
        const feature = parser.parse(singleBackground)[0].feature
        const background = feature.children[0].background

        assert.equal(background.keyword, "Background")
        assert.equal(background.name, "Set up")
        assert.equal(background.description, "Let's do things")
      })

      it('adds the steps to the background', () => {
        const feature = parser.parse(singleBackground)[0].feature
        const background = feature.children[0].background

        assert.deepStrictEqual(
          background.steps.map(step => step.keyword),
          ['Given ', 'And ']
        )

        assert.deepStrictEqual(
          background.steps.map(step => step.text),
          ['things', 'stuff']
        )
      })
    })
  })
})
