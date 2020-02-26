import { messages } from '@cucumber/messages'
import FeatureSearch from './FeatureSearch'
import ScenarioSearch from './ScenarioSearch'
import StepSearch from './StepSearch'
import FeatureBuilder from './FeatureBuilder'

export default class Search {
  private readonly featureSearch = new FeatureSearch()
  private readonly scenarioSearch = new ScenarioSearch()
  private readonly stepSearch = new StepSearch()

  private gherkinDocumentByFeature = new Map<
    messages.GherkinDocument.IFeature,
    messages.IGherkinDocument
  >()

  private featureByScenarioId = new Map<
    string,
    messages.GherkinDocument.IFeature
  >()

  private scenarioByStepId = new Map<
    string,
    messages.GherkinDocument.Feature.IScenario
  >()

  private featureByURI = new Map<string, messages.GherkinDocument.IFeature>()

  public search(query: string): messages.IGherkinDocument[] {
    const steps = this.stepSearch.search(query)
    const matchingScenarios = this.scenarioSearch.search(query)
    const scenarios = this.consolidateScenariosFromSteps(
      matchingScenarios,
      steps
    )

    const matchingFeatures = this.featureSearch.search(query)
    const features = this.consolidateFeaturesFromScenarios(
      matchingFeatures,
      scenarios
    )

    return features.map(feature =>
      this.constructGherkinDocumentFromFeature(feature)
    )
  }

  private consolidateScenariosFromSteps(
    matchingScenarios: messages.GherkinDocument.Feature.IScenario[],
    steps: messages.GherkinDocument.Feature.IStep[]
  ): messages.GherkinDocument.Feature.IScenario[] {
    const consolidated = matchingScenarios
    for (const step of steps) {
      const scenario = this.scenarioByStepId.get(step.id)

      if (!consolidated.includes(scenario)) {
        consolidated.push(scenario)
      }
    }

    return consolidated
  }

  public add(gherkinDocument: messages.IGherkinDocument) {
    this.gherkinDocumentByFeature.set(gherkinDocument.feature, gherkinDocument)
    this.featureByURI.set(gherkinDocument.uri, gherkinDocument.feature)

    this.featureSearch.add(gherkinDocument)
    for (const child of gherkinDocument.feature.children) {
      if (child.scenario) {
        this.featureByScenarioId.set(child.scenario.id, gherkinDocument.feature)
        this.scenarioSearch.add(child.scenario)

        for (const step of child.scenario.steps) {
          this.scenarioByStepId.set(step.id, child.scenario)
          this.stepSearch.add(step)
        }
      }
    }
  }

  private constructGherkinDocumentFromFeature(
    feature: messages.GherkinDocument.IFeature
  ): messages.IGherkinDocument {
    const originalDocument = this.gherkinDocumentByFeature.get(feature)

    return messages.GherkinDocument.create({
      uri: originalDocument.uri,
      feature: feature,
    })
  }

  private consolidateFeaturesFromScenarios(
    matchingFeatures: messages.GherkinDocument.IFeature[],
    scenarios: messages.GherkinDocument.Feature.IScenario[]
  ): messages.GherkinDocument.IFeature[] {
    const consolidated = matchingFeatures
    const featuresToRebuild: messages.GherkinDocument.IFeature[] = []
    const featureBuilder = new FeatureBuilder()

    for (const scenario of scenarios) {
      const originalFeature = this.featureByScenarioId.get(scenario.id)
      if (!featuresToRebuild.includes(originalFeature) && !matchingFeatures.includes(originalFeature)) {
        featuresToRebuild.push(originalFeature)
      }
    }

    for (const sourceFeature of featuresToRebuild) {
      const newFeature = featureBuilder.build(sourceFeature, scenarios)
      this.gherkinDocumentByFeature.set(
        newFeature,
        this.gherkinDocumentByFeature.get(sourceFeature)
      )
      consolidated.push(newFeature)
    }
    return consolidated
  }
}
