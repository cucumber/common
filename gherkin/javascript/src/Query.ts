import { messages } from '@cucumber/messages'
import { ArrayMultimap } from '@teppeis/multimaps'

export default class Query {
  private readonly gherkinDocuments: messages.IGherkinDocument[] = []
  private readonly locationByAstNodeId = new Map<string, messages.ILocation>()
  private readonly gherkinStepById = new Map<
    string,
    messages.GherkinDocument.Feature.IStep
  >()
  private readonly pickleIdsMapByUri = new Map<
    string,
    ArrayMultimap<number, string>
  >()
  private readonly pickleStepIdsMapByUri = new Map<
    string,
    ArrayMultimap<number, string>
  >()

  /**
   * Gets the location (line and column) of an AST node.
   * @param astNodeId
   */
  public getLocation(astNodeId: string): messages.ILocation {
    return this.locationByAstNodeId.get(astNodeId)
  }

  public getGherkinDocuments(): messages.IGherkinDocument[] {
    return this.gherkinDocuments
  }

  /**
   * Gets all the pickle IDs
   * @param uri - the URI of the document
   * @param lineNumber - optionally restrict results to a particular line number
   */
  public getPickleIds(uri: string, lineNumber?: number): string[] {
    const pickleIdsByLineNumber = this.pickleIdsMapByUri.get(uri)
    return lineNumber === undefined
      ? Array.from(new Set(pickleIdsByLineNumber.values()))
      : pickleIdsByLineNumber.get(lineNumber)
  }

  public getPickleStepIds(uri: string, lineNumber: number): string[] {
    const pickleStepIdsByLineNumber = this.pickleStepIdsMapByUri.get(uri)
    return pickleStepIdsByLineNumber.get(lineNumber)
  }

  public update(message: messages.IEnvelope): Query {
    if (message.gherkinDocument) {
      this.gherkinDocuments.push(message.gherkinDocument)
      if (message.gherkinDocument.feature) {
        this.pickleIdsMapByUri.set(
          message.gherkinDocument.uri,
          new ArrayMultimap<number, string>()
        )
        this.pickleStepIdsMapByUri.set(
          message.gherkinDocument.uri,
          new ArrayMultimap<number, string>()
        )

        for (const featureChild of message.gherkinDocument.feature.children) {
          if (featureChild.background) {
            this.updateGherkinBackground(featureChild.background)
          }

          if (featureChild.scenario) {
            this.updateGherkinScenario(featureChild.scenario)
          }

          if (featureChild.rule) {
            const ruleChildren = featureChild.rule.children
            for (const ruleChild of ruleChildren) {
              if (ruleChild.background) {
                this.updateGherkinBackground(ruleChild.background)
              }

              if (ruleChild.scenario) {
                this.updateGherkinScenario(ruleChild.scenario)
              }
            }
          }
        }
      }
    }

    if (message.pickle) {
      const pickle = message.pickle
      this.updatePickle(pickle)
    }

    return this
  }

  private updateGherkinBackground(
    background: messages.GherkinDocument.Feature.IBackground
  ) {
    for (const step of background.steps) {
      this.updateGherkinStep(step)
    }
  }

  private updateGherkinScenario(
    scenario: messages.GherkinDocument.Feature.IScenario
  ) {
    this.locationByAstNodeId.set(scenario.id, scenario.location)
    for (const step of scenario.steps) {
      this.updateGherkinStep(step)
    }

    for (const examples of scenario.examples) {
      for (const tableRow of examples.tableBody) {
        this.locationByAstNodeId.set(tableRow.id, tableRow.location)
      }
    }
  }

  private updateGherkinStep(step: messages.GherkinDocument.Feature.IStep) {
    this.locationByAstNodeId.set(step.id, step.location)
    this.gherkinStepById.set(step.id, step)
  }

  private updatePickle(pickle: messages.IPickle) {
    const pickleIdsByLineNumber = this.pickleIdsMapByUri.get(pickle.uri)
    const pickleLineNumbers = pickle.astNodeIds.map(
      astNodeId => this.locationByAstNodeId.get(astNodeId).line
    )
    for (const pickleLineNumber of pickleLineNumbers) {
      // if (!pickleIdsByLineNumber.has(pickleLineNumber)) {
      pickleIdsByLineNumber.put(pickleLineNumber, pickle.id)
      // }
    }
    this.updatePickleSteps(pickle)
  }

  private updatePickleSteps(pickle: messages.IPickle) {
    const pickleStepIdsByLineNumber = this.pickleStepIdsMapByUri.get(pickle.uri)
    const pickleSteps = pickle.steps
    for (const pickleStep of pickleSteps) {
      const stepLineNumbers = pickleStep.astNodeIds.map(
        astNodeId => this.locationByAstNodeId.get(astNodeId).line
      )
      for (const stepLineNumber of stepLineNumbers) {
        pickleStepIdsByLineNumber.put(stepLineNumber, pickleStep.id)
      }
    }
  }
}
