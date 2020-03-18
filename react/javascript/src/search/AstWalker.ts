import { messages } from '@cucumber/messages'

interface IFilters {
  acceptScenario?: (
    scenario: messages.GherkinDocument.Feature.IScenario
  ) => boolean,
  acceptStep?: (
    step: messages.GherkinDocument.Feature.IStep
  ) => boolean
}

const defaultFilters: IFilters = {
  acceptScenario: () => true,
  acceptStep: () => true,
}

export default class AstWalker {
  private readonly filters: IFilters

  constructor(filters?: IFilters) {
    this.filters = { ...defaultFilters, ...filters }
  }

  public walkGherkinDocument(
    gherkinDocument: messages.IGherkinDocument
  ): messages.IGherkinDocument {
    const featureWalkerCall = this.walkFeature(gherkinDocument.feature)

    return messages.GherkinDocument.create({
      feature: featureWalkerCall,
      comments: gherkinDocument.comments,
    })
  }

  protected walkFeature(
    feature: messages.GherkinDocument.IFeature
  ): messages.GherkinDocument.IFeature {
    return messages.GherkinDocument.Feature.create({
      children: this.walkFeatureChildren(feature.children),
      location: feature.location,
      language: feature.language,
      keyword: feature.keyword,
      name: feature.name,
    })
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
    return messages.GherkinDocument.Feature.Background.create({
      id: background.id,
      name: background.name,
      location: background.location,
      keyword: background.keyword,
      steps: this.walkAllSteps(background.steps),
    })
  }

  protected walkScenario(
    scenario: messages.GherkinDocument.Feature.IScenario
  ): messages.GherkinDocument.Feature.IScenario {
    const steps = this.walkAllSteps(scenario.steps)
    const allStepsRejected = steps.filter(step => step === null).length === steps.length

    if (!this.filters.acceptScenario(scenario ) || (allStepsRejected && steps.length > 0)) {
      return null
    }

    return messages.GherkinDocument.Feature.Scenario.create({
      id: scenario.id,
      name: scenario.name,
      location: scenario.location,
      keyword: scenario.keyword,
      examples: scenario.examples,
      steps: scenario.steps.map(step => this.copyStep(step)),
      tags: scenario.tags,
    })
  }
  protected walkAllSteps(
    steps: messages.GherkinDocument.Feature.IStep[]
  ): messages.GherkinDocument.Feature.IStep[] {
    return steps.map(step => this.walkStep(step))
  }

  protected walkStep(
    step: messages.GherkinDocument.Feature.IStep
  ): messages.GherkinDocument.Feature.IStep {
    if(!this.filters.acceptStep(step)) {
      return null
    }
    return this.copyStep(step)
  }

  private copyStep(step: messages.GherkinDocument.Feature.IStep): messages.GherkinDocument.Feature.IStep {
    return messages.GherkinDocument.Feature.Step.create({
      id: step.id,
      keyword: step.keyword,
      location: step.location,
      text: step.text,
      dataTable: step.dataTable,
      docString: step.docString,
    });
  }
}
