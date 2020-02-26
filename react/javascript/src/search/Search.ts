import { messages } from '@cucumber/messages'
import FeatureSearch from './FeatureSearch'
import ScenarioSearch from './ScenarioSearch'
import StepSearch from './StepSearch'

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
  consolidateScenariosFromSteps(
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
    const toCreate = this.scenariosByFeatureURI(scenarios)

    for (const featureUri of toCreate.keys()) {
      const originalFeature = this.featureByURI.get(featureUri)

      if (!consolidated.includes(originalFeature)) {
        consolidated.push(
          this.constructFeatureFromScenarios(
            originalFeature,
            toCreate.get(featureUri)
          )
        )
      }
    }
    return consolidated
  }

  private constructFeatureFromScenarios(
    originalFeature: messages.GherkinDocument.IFeature,
    scenarios: messages.GherkinDocument.Feature.IScenario[]
  ): messages.GherkinDocument.IFeature {
    const newFeature = messages.GherkinDocument.Feature.create({
      keyword: originalFeature.keyword,
      location: originalFeature.location,
      name: originalFeature.name,
      description: originalFeature.name,
      tags: originalFeature.tags,
      children: scenarios.map(scenario =>
        messages.GherkinDocument.Feature.FeatureChild.create({
          scenario: scenario,
        })
      ),
    })

    this.gherkinDocumentByFeature.set(
      newFeature,
      this.gherkinDocumentByFeature.get(originalFeature)
    )
    return newFeature
  }

  private scenariosByFeatureURI(
    scenarios: messages.GherkinDocument.Feature.IScenario[]
  ): Map<string, messages.GherkinDocument.Feature.IScenario[]> {
    const scenariosByFeatureURI = new Map<
      string,
      messages.GherkinDocument.Feature.IScenario[]
    >()

    for (const scenario of scenarios) {
      const scenarioFeature = this.featureByScenarioId.get(scenario.id)
      const featureUri = this.gherkinDocumentByFeature.get(scenarioFeature).uri

      if (!scenariosByFeatureURI.has(featureUri)) {
        scenariosByFeatureURI.set(featureUri, [])
      }
      scenariosByFeatureURI.get(featureUri).push(scenario)
    }

    return scenariosByFeatureURI
  }
}
