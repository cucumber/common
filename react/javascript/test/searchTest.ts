import assert from 'assert'
import { messages } from '@cucumber/messages'

function search(
  gherkinDocuments: messages.IGherkinDocument[],
  query: string
): messages.IGherkinDocument[] {
  return gherkinDocuments.filter(
    gherkinDocument => gherkinDocument.feature.name.includes(query)
  )
}

describe('search', () => {
  it('returns an empty array when there are no hits', () => {
    const searchResult = search([], 'banana')

    assert.deepStrictEqual(searchResult, [])
  })

  it('finds results with equal feature name', () => {
    const gherkinDocument = messages.GherkinDocument.create({
      feature: messages.GherkinDocument.Feature.create({
        name: 'this exists',
      }),
    })
    const searchResult = search([gherkinDocument], 'this exists')

    assert.deepStrictEqual(searchResult, [gherkinDocument])
  })

  it('finds results with substring of feature name', () => {
    const gherkinDocument = messages.GherkinDocument.create({
      feature: messages.GherkinDocument.Feature.create({
        name: 'this exists',
      }),
    })
    const searchResult = search([gherkinDocument], 'exists')

    assert.deepStrictEqual(searchResult, [gherkinDocument])
  })
})
