import { messages } from '@cucumber/messages'

export default class AstWalker {
  public walkGherkinDocument(gherkinDocument: messages.IGherkinDocument) {
    this.walkFeature(gherkinDocument.feature)
  }

  protected walkFeature(feature: messages.GherkinDocument.IFeature) {
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
