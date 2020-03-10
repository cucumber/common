import { messages } from '@cucumber/messages'

export default class AstWalker {
  public walkGherkinDocument(
    gherkinDocument: messages.IGherkinDocument
  ): messages.IGherkinDocument {
    return messages.GherkinDocument.create({
      feature: this.walkFeature(gherkinDocument.feature),
      comments: gherkinDocument.comments,
    })
  }

  protected walkFeature(
    feature: messages.GherkinDocument.IFeature
  ): messages.GherkinDocument.IFeature {
    const copy = messages.GherkinDocument.Feature.create({
      children: feature.children,
      keyword: feature.keyword,
      language: feature.language,
      location: feature.location,
      name: feature.name,
    })
    for (const child of feature.children) {
      if (child.background) {
        this.walkBackground(child.background)
      }
      if (child.scenario) {
        this.walkScenario(child.scenario)
      }
      if (child.rule) {
        this.walkRule(child.rule)
      }
    }
    return copy
  }

  protected walkRule(
    rule: messages.GherkinDocument.Feature.FeatureChild.IRule
  ) {
    for (const child of rule.children) {
      if (child.background) {
        this.walkBackground(child.background)
      }
      if (child.scenario) {
        this.walkScenario(child.scenario)
      }
    }
  }

  protected walkBackground(
    background: messages.GherkinDocument.Feature.IBackground
  ) {
    for (const step of background.steps) {
      this.walkStep(step)
    }
  }

  protected walkScenario(scenario: messages.GherkinDocument.Feature.IScenario) {
    for (const step of scenario.steps) {
      this.walkStep(step)
    }
  }

  protected walkStep(step: messages.GherkinDocument.Feature.IStep) {
    // no-op
  }
}
