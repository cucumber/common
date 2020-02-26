import { messages } from '@cucumber/messages'
import elasticlunr from 'elasticlunr'

interface SearchableFeature {
  uri: string
  name: string
  description: string
}

export default class FeatureSearch {
  private readonly featuresByUri = new Map<
    string,
    messages.GherkinDocument.IFeature
  >()
  private readonly index = elasticlunr<SearchableFeature>(ctx => {
    ctx.setRef('uri')
    ctx.addField('name')
    ctx.addField('description')
    ctx.saveDocument(true)
  })

  public add(gherkinDocument: messages.IGherkinDocument) {
    this.featuresByUri.set(gherkinDocument.uri, gherkinDocument.feature)

    this.index.addDoc({
      uri: gherkinDocument.uri,
      name: gherkinDocument.feature.name,
      description: gherkinDocument.feature.description,
    })
  }

  public search(query: string): messages.GherkinDocument.IFeature[] {
    const searchResultsList = this.index.search(query, {
      fields: {
        name: { bool: 'OR', expand: true, boost: 1 },
        description: { bool: 'OR', expand: true, boost: 1 },
      },
    })

    return searchResultsList.map(searchResults => {
      return this.featuresByUri.get(searchResults.ref)
    })
  }
}
