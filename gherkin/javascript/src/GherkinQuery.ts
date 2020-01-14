import { messages } from '@cucumber/messages'

export default class GherkinQuery {
  private readonly locationByAstNodeId = new Map<string, messages.ILocation>()
  private readonly gherkinStepById = new Map<
    string,
    messages.GherkinDocument.Feature.IStep
  >()
  private readonly pickleIdsMapByUri = new Map<string, Map<number, string[]>>()

  /**
   * Gets the location (line and column) of an AST node.
   * @param astNodeId
   */
  public getLocation(astNodeId: string): messages.ILocation {
    const location = this.locationByAstNodeId.get(astNodeId)
    if (location === undefined) {
      throw new Error(
        `No location found for ${astNodeId}. Known: ${Array.from(
          this.locationByAstNodeId.keys()
        )}`
      )
    }
    return location
  }

  public getPickleIds(uri: string, lineNumber: number): string[] {
    const pickleIdsByLineNumber = this.pickleIdsMapByUri.get(uri)
    if (pickleIdsByLineNumber === undefined) {
      throw new Error(
        `No document found for uri ${uri}. Known: ${Array.from(
          this.pickleIdsMapByUri.keys()
        )}`
      )
    }
    return pickleIdsByLineNumber.get(lineNumber)
  }

  public update(message: messages.IEnvelope): GherkinQuery {
    if (message.gherkinDocument && message.gherkinDocument.feature) {
      this.pickleIdsMapByUri.set(
        message.gherkinDocument.uri,
        new Map<number, string[]>()
      )

      for (const featureChild of message.gherkinDocument.feature.children) {
        if (featureChild.background) {
          this.updateBackground(
            featureChild.background,
            message.gherkinDocument.uri
          )
        }

        if (featureChild.scenario) {
          this.updateScenario(
            featureChild.scenario,
            message.gherkinDocument.uri
          )
        }

        if (featureChild.rule) {
          const ruleChildren = featureChild.rule.children
          for (const ruleChild of ruleChildren) {
            if (ruleChild.background) {
              this.updateBackground(
                ruleChild.background,
                message.gherkinDocument.uri
              )
            }

            if (ruleChild.scenario) {
              this.updateScenario(
                ruleChild.scenario,
                message.gherkinDocument.uri
              )
            }
          }
        }
      }
    }

    if (message.pickle) {
      const pickleIdsByLineNumber = this.pickleIdsMapByUri.get(
        message.pickle.uri
      )
      const pickleLineNumbers = message.pickle.astNodeIds.map(
        astNodeId => this.locationByAstNodeId.get(astNodeId).line
      )
      for (const pickleLineNumber of pickleLineNumbers) {
        pickleIdsByLineNumber.get(pickleLineNumber).push(message.pickle.id)
      }

      for (const pickleStep of message.pickle.steps) {
        const stepLineNumbers = pickleStep.astNodeIds.map(
          astNodeId => this.locationByAstNodeId.get(astNodeId).line
        )
        for (const stepLineNumber of stepLineNumbers) {
          pickleIdsByLineNumber.get(stepLineNumber).push(pickleStep.id)
        }
      }
    }

    return this
  }

  private updateBackground(
    background: messages.GherkinDocument.Feature.IBackground,
    uri: string
  ) {
    const pickleIdsByLineNumber = this.pickleIdsMapByUri.get(uri)
    pickleIdsByLineNumber.set(background.location.line, [])

    for (const step of background.steps) {
      this.updateStep(step, uri)
    }
  }

  private updateScenario(
    scenario: messages.GherkinDocument.Feature.IScenario,
    uri: string
  ) {
    this.locationByAstNodeId.set(scenario.id, scenario.location)
    const pickleIdsByLineNumber = this.pickleIdsMapByUri.get(uri)
    pickleIdsByLineNumber.set(scenario.location.line, [])

    for (const step of scenario.steps) {
      this.updateStep(step, uri)
    }

    for (const examples of scenario.examples) {
      for (const tableRow of examples.tableBody) {
        this.locationByAstNodeId.set(tableRow.id, tableRow.location)
        pickleIdsByLineNumber.set(tableRow.location.line, [])
      }
    }
  }

  private updateStep(
    step: messages.GherkinDocument.Feature.IStep,
    uri: string
  ) {
    this.locationByAstNodeId.set(step.id, step.location)
    this.gherkinStepById.set(step.id, step)

    const pickleIdsByLineNumber = this.pickleIdsMapByUri.get(uri)
    pickleIdsByLineNumber.set(step.location.line, [])
  }
}
