import { messages } from '@cucumber/messages'
import { isNullOrUndefined } from 'util'

export default class RubyJSONParser {
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
    let backgroundFound = false

    return elements.map(element => {
      if (element.type === 'background' && !backgroundFound) {
        backgroundFound = true
        return this.makeBackground(element)
      }
    }).filter(child => !isNullOrUndefined(child))
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