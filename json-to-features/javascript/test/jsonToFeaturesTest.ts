import assert from 'assert'
import JSONToFeature from '../src/JSONToFeature'

describe('JSONToFeature', () => {
  const jsonToFeatures: JSONToFeature = new JSONToFeature()

  context('makeFeatures', () => {
    it('returns an empty list when no sources are provided', () => {
      assert.deepStrictEqual(jsonToFeatures.makeFeatures([]), [])
    })

    it('returns a GherkinDocument for each valid object given', () => {
      const documents = jsonToFeatures.makeFeatures([
        {
          name: 'Attachments',
          uri: 'features/attachments/attachments.feature',
        },
        {
          name: 'Another feature',
          uri: 'features/another/another.feature',
        },
      ])

      assert.equal(documents.length, 2)
    })
  })
})
