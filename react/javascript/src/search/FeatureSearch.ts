import { messages } from '@cucumber/messages'
import elasticlunr from 'elasticlunr'

interface SearchableFeature {
  uri: string
  name: string
}

export default class FeatureSearch {
  private readonly featuresByUri = new Map<
    string,
    messages.GherkinDocument.IFeature
  >()
  private readonly index = elasticlunr<SearchableFeature>(ctx => {
    ctx.setRef('uri')
    ctx.addField('name')
    ctx.saveDocument(true)
  })

  public add(gherkinDocument: messages.IGherkinDocument) {
    this.featuresByUri.set(gherkinDocument.uri, gherkinDocument.feature)

    this.index.addDoc({
      uri: gherkinDocument.uri,
      name: gherkinDocument.feature.name,
    })
  }

  public search(query: string): messages.GherkinDocument.IFeature[] {
    const searchResultsList = this.index.search(query, {
      fields: {
        name: { boost: 1 },
      },
    })

    return searchResultsList.map(searchResults => {
      return this.featuresByUri.get(searchResults.ref)
    })
  }
}
