import { messages } from '@cucumber/messages'
import FeatureSearch from './FeatureSearch'

export default class Search {
  private readonly featureSearch = new FeatureSearch()
  private gherkinDocumentByFeature = new Map<
    messages.GherkinDocument.IFeature,
    messages.IGherkinDocument
  >()

  public search(query: string): messages.IGherkinDocument[] {
    const features =  this.featureSearch.search(query)

    return features.map(feature => this.constructGherkinDocumentFromFeature(feature))
  }

  public add(gherkinDocument: messages.IGherkinDocument) {
    this.gherkinDocumentByFeature.set(gherkinDocument.feature, gherkinDocument)
    this.featureSearch.add(gherkinDocument)
  }

  private constructGherkinDocumentFromFeature(feature: messages.GherkinDocument.IFeature): messages.IGherkinDocument {
    const originalDocument = this.gherkinDocumentByFeature.get(feature)

    return messages.GherkinDocument.create({
      uri: originalDocument.uri,
      feature: feature
    })
  }
}