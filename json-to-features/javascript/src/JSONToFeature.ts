import GherkinDocument from './GherkinDocument'
import Feature from './Feature'
import FeatureElement from './FeatureElement'
import Step from './Step'
import DocString from './DocString'
import { isNullOrUndefined } from 'util'

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
    const steps = element.steps || []

    return new FeatureElement(
      element.line,
      element.keyword,
      element.name,
      element.description,
      steps.map((step: Record<string, any>) => this.makeStep(step))
    )
  }

  private makeStep(step: Record<string, any>): Step {
    return new Step(step.line, step.keyword, step.name, this.makeDocString(step.doc_string))
  }

  private makeDocString(docString: Record<string, any>): DocString {
    if (isNullOrUndefined(docString)) {
      return null
    }

    return new DocString(
      docString.line,
      docString.content_type,
      docString.value
    )
  }
}
