import * as messages from '@cucumber/messages'
import FeatureSearch from './FeatureSearch'
import ScenarioSearch from './ScenarioSearch'
import StepSearch from './StepSearch'
import RuleSearch from './RuleSearch'
import { GherkinDocumentWalker } from '@cucumber/gherkin-utils'

export default class TextSearch {
  private readonly featureSearch = new FeatureSearch()
  private readonly backgroundSearch = new ScenarioSearch()
  private readonly scenarioSearch = new ScenarioSearch()
  private readonly stepSearch = new StepSearch()
  private readonly ruleSearch = new RuleSearch()

  private readonly gherkinDocuments: messages.GherkinDocument[] = []

  public search(query: string): messages.GherkinDocument[] {
    const matchingSteps = this.stepSearch.search(query)
    const matchingBackgrounds = this.backgroundSearch.search(query)
    const matchingScenarios = this.scenarioSearch.search(query)
    const matchingRules = this.ruleSearch.search(query)
    const matchingFeatures = this.featureSearch.search(query)

    const walker = new GherkinDocumentWalker({
      acceptStep: (step) => matchingSteps.includes(step),
      acceptScenario: (scenario) => matchingScenarios.includes(scenario),
      // TODO: This is an ugly hack to work around the fact that Scenario and Background are no longer interchangeable,
      // because tags is now mandatory.
      acceptBackground: (background) =>
        matchingBackgrounds.includes(background as messages.Scenario),
      acceptRule: (rule) => matchingRules.includes(rule),
      acceptFeature: (feature) => matchingFeatures.includes(feature),
    })

    return this.gherkinDocuments
      .map((gherkinDocument) => walker.walkGherkinDocument(gherkinDocument))
      .filter((gherkinDocument) => gherkinDocument !== null)
  }

  public add(gherkinDocument: messages.GherkinDocument) {
    this.gherkinDocuments.push(gherkinDocument)
    const walker = new GherkinDocumentWalker(
      {},
      {
        handleStep: (step) => this.stepSearch.add(step),
        handleScenario: (scenario) => this.scenarioSearch.add(scenario),
        handleBackground: (background) =>
          this.backgroundSearch.add(background as messages.Scenario),
        handleRule: (rule) => this.ruleSearch.add(rule),
      }
    )
    this.featureSearch.add(gherkinDocument)
    walker.walkGherkinDocument(gherkinDocument)
  }
}
