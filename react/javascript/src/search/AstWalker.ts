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
      children: this.walkFeatureChildren(feature.children),
      location: feature.location,
      language: feature.language,
      keyword: feature.keyword,
      name: feature.name,
    })
    return copy
  }

  private walkFeatureChildren(
    children: messages.GherkinDocument.Feature.IFeatureChild[]
  ): messages.GherkinDocument.Feature.IFeatureChild[] {
    const childrenCopy: messages.GherkinDocument.Feature.IFeatureChild[] = []

    for (const child of children) {
      if (child.background) {
        childrenCopy.push(
          messages.GherkinDocument.Feature.FeatureChild.create({
            background: this.walkBackground(child.background),
          })
        )
      }
      if (child.scenario) {
        childrenCopy.push(
          messages.GherkinDocument.Feature.FeatureChild.create({
            scenario: this.walkScenario(child.scenario),
          })
        )
      }
      if (child.rule) {
        childrenCopy.push(
          messages.GherkinDocument.Feature.FeatureChild.create({
            rule: this.walkRule(child.rule),
          })
        )
      }
    }

    return childrenCopy
  }

  protected walkRule(
    rule: messages.GherkinDocument.Feature.FeatureChild.IRule
  ): messages.GherkinDocument.Feature.FeatureChild.IRule {
    return messages.GherkinDocument.Feature.FeatureChild.Rule.create({
      id: rule.id,
      name: rule.name,
      location: rule.location,
      keyword: rule.keyword,
      children: this.walkRuleChildren(rule.children),
    })
  }

  private walkRuleChildren(
    children: messages.GherkinDocument.Feature.FeatureChild.IRuleChild[]
  ): messages.GherkinDocument.Feature.FeatureChild.IRuleChild[] {
    const childrenCopy: messages.GherkinDocument.Feature.FeatureChild.IRuleChild[] = []

    for (const child of children) {
      if (child.background) {
        childrenCopy.push(
          messages.GherkinDocument.Feature.FeatureChild.RuleChild.create({
            background: this.walkBackground(child.background),
          })
        )
      }
      if (child.scenario) {
        childrenCopy.push(
          messages.GherkinDocument.Feature.FeatureChild.RuleChild.create({
            scenario: this.walkScenario(child.scenario),
          })
        )
      }
    }
    return childrenCopy
  }

  protected walkBackground(
    background: messages.GherkinDocument.Feature.IBackground
  ): messages.GherkinDocument.Feature.IBackground {
    for (const step of background.steps) {
      this.walkStep(step)
    }

    return messages.GherkinDocument.Feature.Background.create({
      id: background.id,
      name: background.name,
      location: background.location,
      keyword: background.keyword,
      steps: background.steps,
    })
  }

  protected walkScenario(
    scenario: messages.GherkinDocument.Feature.IScenario
  ): messages.GherkinDocument.Feature.IScenario {
    for (const step of scenario.steps) {
      this.walkStep(step)
    }

    return messages.GherkinDocument.Feature.Scenario.create({
      id: scenario.id,
      name: scenario.name,
      location: scenario.location,
      keyword: scenario.keyword,
      examples: scenario.examples,
      steps: scenario.steps,
      tags: scenario.tags,
    })
  }

  protected walkStep(step: messages.GherkinDocument.Feature.IStep) {
    // no-op
  }
}
