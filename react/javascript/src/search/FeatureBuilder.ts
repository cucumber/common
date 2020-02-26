import { messages } from "@cucumber/messages"

export default class FeatureBuilder {
  public build(
    sourceFeature: messages.GherkinDocument.IFeature,
    scenarios: messages.GherkinDocument.Feature.IScenario[]
  ): messages.GherkinDocument.IFeature {
    return messages.GherkinDocument.Feature.create({
      keyword: sourceFeature.keyword,
      location: sourceFeature.location,
      name: sourceFeature.name,
      description: sourceFeature.name,
      tags: sourceFeature.tags,
      children: this.filterChidren(sourceFeature.children, scenarios)
    })
  }

  private filterChidren(
    children: messages.GherkinDocument.Feature.IFeatureChild[],
    scenarios: messages.GherkinDocument.Feature.IScenario[]
  ): messages.GherkinDocument.Feature.IFeatureChild[] {
    return children.filter(child => {
      const isExceptedScenario = child.scenario && scenarios.includes(child.scenario)
      return child.background || isExceptedScenario
    })
  }
}