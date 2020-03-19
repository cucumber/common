import GherkinDocument from './GherkinDocument'
import Feature from './Feature'
import FeatureElement from './FeatureElement'

export default class JSONToFeature {
  public makeFeatures(sources: Record<string, any>[]): GherkinDocument[] {
    return sources.map(
      source => new GherkinDocument(source.uri, this.makeFeature(source))
    )
  }

  private makeFeature(source: Record<string, any>): Feature {
    const elements = source.elements || []

    return new Feature(
      source.line,
      source.keyword,
      source.name,
      source.description,
      elements.map((element: Record<string, any>) =>
        this.makeFeatureElement(element)
      )
    )
  }

  private makeFeatureElement(element: Record<string, any>): FeatureElement {
    return new FeatureElement(
      element.line,
      element.keyword,
      element.name,
      element.description
    )
  }
}
