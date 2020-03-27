import { messages } from '@cucumber/messages'
import FeatureSearch from './FeatureSearch'
import ScenarioSearch from './ScenarioSearch'
import StepSearch from './StepSearch'
import AstWalker from './AstWalker'
import RuleSearch from './RuleSearch'

export default class Search {
  private readonly featureSearch = new FeatureSearch()
  private readonly backgroundSearch = new ScenarioSearch()
  private readonly scenarioSearch = new ScenarioSearch()
  private readonly stepSearch = new StepSearch()
  private readonly ruleSearch = new RuleSearch()

  private gherkinDocuments: messages.IGherkinDocument[] = []

  public search(query: string): messages.IGherkinDocument[] {
    const matchingSteps = this.stepSearch.search(query)
    const matchingBackgrounds = this.backgroundSearch.search(query)
    const matchingScenarios = this.scenarioSearch.search(query)
    const matchingRules = this.ruleSearch.search(query)
    const matchingFeatures = this.featureSearch.search(query)

    const walker = new AstWalker({
      acceptStep: step => matchingSteps.includes(step),
      acceptScenario: scenario => matchingScenarios.includes(scenario),
      acceptBackground: background => matchingBackgrounds.includes(background),
      acceptRule: rule => matchingRules.includes(rule),
      acceptFeature: feature => matchingFeatures.includes(feature),
    })

    return this.gherkinDocuments
      .map(gherkinDocument => walker.walkGherkinDocument(gherkinDocument))
      .filter(gherkinDocument => gherkinDocument !== null)
  }

  public add(gherkinDocument: messages.IGherkinDocument) {
    this.gherkinDocuments.push(gherkinDocument)

    // TODO: Leverage AstWalker
    this.featureSearch.add(gherkinDocument)
    for (const child of gherkinDocument.feature.children) {
      if (child.background) {
        this.backgroundSearch.add(child.background)

        for (const step of child.background.steps) {
          this.stepSearch.add(step)
        }
      }

      if (child.scenario) {
        this.scenarioSearch.add(child.scenario)

        for (const step of child.scenario.steps) {
          this.stepSearch.add(step)
        }
      }

      if (child.rule) {
        this.ruleSearch.add(child.rule)

        for (const ruleChild of child.rule.children) {
          if (ruleChild.scenario) {
            this.scenarioSearch.add(ruleChild.scenario)
          }

          if (ruleChild.background) {
            this.backgroundSearch.add(ruleChild.background)
          }
        }
      }
    }
  }
}
