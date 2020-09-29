import { messages } from '@cucumber/messages'

export interface IFilters {
  acceptScenario?: (
    scenario: messages.GherkinDocument.Feature.IScenario
  ) => boolean
  acceptStep?: (step: messages.GherkinDocument.Feature.IStep) => boolean
  acceptBackground?: (
    background: messages.GherkinDocument.Feature.IBackground
  ) => boolean
  acceptRule?: (
    rule: messages.GherkinDocument.Feature.FeatureChild.IRule
  ) => boolean
  acceptFeature?: (feature: messages.GherkinDocument.IFeature) => boolean
}

export interface IHandlers {
  handleStep?: (step: messages.GherkinDocument.Feature.IStep) => void
  handleScenario?: (
    scenario: messages.GherkinDocument.Feature.IScenario
  ) => void
  handleBackground?: (
    background: messages.GherkinDocument.Feature.IBackground
  ) => void
  handleRule?: (
    rule: messages.GherkinDocument.Feature.FeatureChild.IRule
  ) => void
  handleFeature?: (feature: messages.GherkinDocument.IFeature) => void
}

const defaultFilters: IFilters = {
  acceptScenario: () => true,
  acceptStep: () => true,
  acceptBackground: () => true,
  acceptRule: () => true,
  acceptFeature: () => true,
}

export const rejectAllFilters: IFilters = {
  acceptScenario: () => false,
  acceptStep: () => false,
  acceptBackground: () => false,
  acceptRule: () => false,
  acceptFeature: () => false,
}

const defaultHandlers: IHandlers = {
  handleStep: () => null,
  handleScenario: () => null,
  handleBackground: () => null,
  handleRule: () => null,
  handleFeature: () => null,
}

export default class GherkinDocumentWalker {
  private readonly filters: IFilters
  private readonly handlers: IHandlers

  constructor(filters?: IFilters, handlers?: IHandlers) {
    this.filters = { ...defaultFilters, ...filters }
    this.handlers = { ...defaultHandlers, ...handlers }
  }

  public walkGherkinDocument(
    gherkinDocument: messages.IGherkinDocument
  ): messages.IGherkinDocument {
    if (!gherkinDocument.feature) {
      return null
    }

    const feature = this.walkFeature(gherkinDocument.feature)

    if (!feature) {
      return null
    }

    return messages.GherkinDocument.create({
      feature: feature,
      comments: gherkinDocument.comments,
      uri: gherkinDocument.uri,
    })
  }

  protected walkFeature(
    feature: messages.GherkinDocument.IFeature
  ): messages.GherkinDocument.IFeature {
    const keptChildren = this.walkFeatureChildren(feature.children)

    this.handlers.handleFeature(feature)

    const backgroundKept = keptChildren.find((child) => child.background)

    if (this.filters.acceptFeature(feature) || backgroundKept) {
      return this.copyFeature(
        feature,
        feature.children.map((child) => {
          if (child.background) {
            return messages.GherkinDocument.Feature.FeatureChild.create({
              background: this.copyBackground(child.background),
            })
          }
          if (child.scenario) {
            return messages.GherkinDocument.Feature.FeatureChild.create({
              scenario: this.copyScenario(child.scenario),
            })
          }
          if (child.rule) {
            return messages.GherkinDocument.Feature.FeatureChild.create({
              rule: this.copyRule(child.rule, child.rule.children),
            })
          }
        })
      )
    }

    if (keptChildren.find((child) => child !== null)) {
      return this.copyFeature(feature, keptChildren)
    }
  }

  private copyFeature(
    feature: messages.GherkinDocument.IFeature,
    children: messages.GherkinDocument.Feature.IFeatureChild[]
  ): messages.GherkinDocument.IFeature {
    return messages.GherkinDocument.Feature.create({
      children: this.filterFeatureChildren(feature, children),
      location: feature.location,
      language: feature.language,
      keyword: feature.keyword,
      name: feature.name,
      description: feature.description ? feature.description : undefined,
      tags: this.copyTags(feature.tags),
    })
  }

  private copyTags(
    tags: ReadonlyArray<messages.GherkinDocument.Feature.ITag>
  ): messages.GherkinDocument.Feature.ITag[] {
    return tags.map((tag) =>
      messages.GherkinDocument.Feature.Tag.create({
        name: tag.name,
        id: tag.id,
        location: tag.location,
      })
    )
  }

  private filterFeatureChildren(
    feature: messages.GherkinDocument.IFeature,
    children: messages.GherkinDocument.Feature.IFeatureChild[]
  ): messages.GherkinDocument.Feature.IFeatureChild[] {
    const copyChildren: messages.GherkinDocument.Feature.IFeatureChild[] = []

    const scenariosKeptById = new Map(
      children
        .filter((child) => child.scenario)
        .map((child) => [child.scenario.id, child])
    )

    const ruleKeptById = new Map(
      children
        .filter((child) => child.rule)
        .map((child) => [child.rule.id, child])
    )

    for (const child of feature.children) {
      if (child.background) {
        copyChildren.push(
          messages.GherkinDocument.Feature.FeatureChild.create({
            background: this.copyBackground(child.background),
          })
        )
      }

      if (child.scenario) {
        const scenarioCopy = scenariosKeptById.get(child.scenario.id)
        if (scenarioCopy) {
          copyChildren.push(scenarioCopy)
        }
      }

      if (child.rule) {
        const ruleCopy = ruleKeptById.get(child.rule.id)
        if (ruleCopy) {
          copyChildren.push(ruleCopy)
        }
      }
    }
    return copyChildren
  }

  private walkFeatureChildren(
    children: messages.GherkinDocument.Feature.IFeatureChild[]
  ): messages.GherkinDocument.Feature.IFeatureChild[] {
    const childrenCopy: messages.GherkinDocument.Feature.IFeatureChild[] = []

    for (const child of children) {
      let backgroundCopy: messages.GherkinDocument.Feature.IBackground = null
      let scenarioCopy: messages.GherkinDocument.Feature.IScenario = null
      let ruleCopy: messages.GherkinDocument.Feature.FeatureChild.IRule = null

      if (child.background) {
        backgroundCopy = this.walkBackground(child.background)
      }
      if (child.scenario) {
        scenarioCopy = this.walkScenario(child.scenario)
      }
      if (child.rule) {
        ruleCopy = this.walkRule(child.rule)
      }

      if (backgroundCopy || scenarioCopy || ruleCopy) {
        childrenCopy.push(
          messages.GherkinDocument.Feature.FeatureChild.create({
            background: backgroundCopy,
            scenario: scenarioCopy,
            rule: ruleCopy,
          })
        )
      }
    }

    return childrenCopy
  }

  protected walkRule(
    rule: messages.GherkinDocument.Feature.FeatureChild.IRule
  ): messages.GherkinDocument.Feature.FeatureChild.IRule {
    const children = this.walkRuleChildren(rule.children)

    this.handlers.handleRule(rule)

    const backgroundKept = children.find(
      (child) => child !== null && child.background !== null
    )
    const scenariosKept = children.filter(
      (child) => child !== null && child.scenario !== null
    )

    if (this.filters.acceptRule(rule) || backgroundKept) {
      return this.copyRule(rule, rule.children)
    }
    if (scenariosKept.length > 0) {
      return this.copyRule(rule, scenariosKept)
    }
  }

  private copyRule(
    rule: messages.GherkinDocument.Feature.FeatureChild.IRule,
    children: messages.GherkinDocument.Feature.FeatureChild.IRuleChild[]
  ): messages.GherkinDocument.Feature.FeatureChild.IRule {
    return messages.GherkinDocument.Feature.FeatureChild.Rule.create({
      id: rule.id,
      name: rule.name,
      description: rule.description ? rule.description : undefined,
      location: rule.location,
      keyword: rule.keyword,
      children: this.filterRuleChildren(rule.children, children),
    })
  }

  private filterRuleChildren(
    children: messages.GherkinDocument.Feature.FeatureChild.IRuleChild[],
    childrenKept: messages.GherkinDocument.Feature.FeatureChild.IRuleChild[]
  ): messages.GherkinDocument.Feature.FeatureChild.IRuleChild[] {
    const childrenCopy: messages.GherkinDocument.Feature.FeatureChild.IRuleChild[] = []
    const scenariosKeptIds = childrenKept
      .filter((child) => child.scenario)
      .map((child) => child.scenario.id)

    for (const child of children) {
      if (child.background) {
        childrenCopy.push(
          messages.GherkinDocument.Feature.FeatureChild.RuleChild.create({
            background: this.copyBackground(child.background),
          })
        )
      }
      if (child.scenario && scenariosKeptIds.includes(child.scenario.id)) {
        childrenCopy.push(
          messages.GherkinDocument.Feature.FeatureChild.RuleChild.create({
            scenario: this.copyScenario(child.scenario),
          })
        )
      }
    }

    return childrenCopy
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
    const steps = this.walkAllSteps(background.steps)
    this.handlers.handleBackground(background)

    if (
      this.filters.acceptBackground(background) ||
      steps.find((step) => step !== null)
    ) {
      return this.copyBackground(background)
    }
  }

  private copyBackground(
    background: messages.GherkinDocument.Feature.IBackground
  ): messages.GherkinDocument.Feature.IBackground {
    return messages.GherkinDocument.Feature.Background.create({
      id: background.id,
      name: background.name,
      location: background.location,
      keyword: background.keyword,
      steps: background.steps.map((step) => this.copyStep(step)),
      description: background.description ? background.description : undefined,
    })
  }

  protected walkScenario(
    scenario: messages.GherkinDocument.Feature.IScenario
  ): messages.GherkinDocument.Feature.IScenario {
    const steps = this.walkAllSteps(scenario.steps)
    this.handlers.handleScenario(scenario)

    if (
      this.filters.acceptScenario(scenario) ||
      steps.find((step) => step !== null)
    ) {
      return this.copyScenario(scenario)
    }
  }

  private copyScenario(
    scenario: messages.GherkinDocument.Feature.IScenario
  ): messages.GherkinDocument.Feature.IScenario {
    return messages.GherkinDocument.Feature.Scenario.create({
      id: scenario.id,
      name: scenario.name,
      description: scenario.description ? scenario.description : undefined,
      location: scenario.location,
      keyword: scenario.keyword,
      examples: scenario.examples,
      steps: scenario.steps.map((step) => this.copyStep(step)),
      tags: this.copyTags(scenario.tags),
    })
  }

  protected walkAllSteps(
    steps: messages.GherkinDocument.Feature.IStep[]
  ): messages.GherkinDocument.Feature.IStep[] {
    return steps.map((step) => this.walkStep(step))
  }

  protected walkStep(
    step: messages.GherkinDocument.Feature.IStep
  ): messages.GherkinDocument.Feature.IStep {
    this.handlers.handleStep(step)
    if (!this.filters.acceptStep(step)) {
      return null
    }
    return this.copyStep(step)
  }

  private copyStep(
    step: messages.GherkinDocument.Feature.IStep
  ): messages.GherkinDocument.Feature.IStep {
    return messages.GherkinDocument.Feature.Step.create({
      id: step.id,
      keyword: step.keyword,
      location: step.location,
      text: step.text,
      dataTable: step.dataTable,
      docString: step.docString,
    })
  }
}
