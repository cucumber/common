import assert from 'assert'
import RubyJSONParser from '../src/RubyJSONParser'

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

      const multiBackground = [
        {
          name: 'Multi background',
          elements: [
            {
              type: 'background',
              name: 'First background'
            },
            {
              type: 'background',
              name: 'Second background'
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

      it('only keeps one background', () => {
        /* When multiple scenarios are ran, the background is repeated */
        const feature = parser.parse(multiBackground)[0].feature
        const backgroundChildren = feature.children.filter(child => child.background)

        assert.strictEqual(backgroundChildren.length, 1)
        assert.strictEqual(backgroundChildren[0].background.name, 'First background')
      })
    })
  })
})
