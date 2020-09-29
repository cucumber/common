import { messages } from '@cucumber/messages'
import { ArrayMultimap } from '@teppeis/multimaps'

export default class Query {
  private readonly gherkinDocuments: messages.IGherkinDocument[] = []
  private readonly pickles: messages.IPickle[] = []
  private readonly locationByAstNodeId = new Map<string, messages.ILocation>()
  private readonly gherkinStepById = new Map<
    string,
    messages.GherkinDocument.Feature.IStep
  >()
  private readonly pickleIdsMapByUri = new Map<
    string,
    ArrayMultimap<string, string>
  >()

  private readonly pickleIdsByAstNodeId = new Map<string, string[]>()

  private readonly pickleStepIdsByAstNodeId = new Map<string, string[]>()

  /**
   * Gets the location (line and column) of an AST node.
   * @param astNodeId
   */
  public getLocation(astNodeId: string): messages.ILocation {
    return this.locationByAstNodeId.get(astNodeId)
  }

  public getGherkinDocuments(): ReadonlyArray<messages.IGherkinDocument> {
    return this.gherkinDocuments
  }

  public getPickles(): ReadonlyArray<messages.IPickle> {
    return this.pickles
  }

  /**
   * Gets all the pickle IDs
   * @param uri - the URI of the document
   * @param lineNumber - optionally restrict results to a particular line number
   */
  public getPickleIds(uri: string, astNodeId?: string): ReadonlyArray<string> {
    const pickleIdsByAstNodeId = this.pickleIdsMapByUri.get(uri)
    return astNodeId === undefined
      ? Array.from(new Set(pickleIdsByAstNodeId.values()))
      : pickleIdsByAstNodeId.get(astNodeId)
  }

  public getPickleStepIds(astNodeId: string): ReadonlyArray<string> {
    return this.pickleStepIdsByAstNodeId.get(astNodeId) || []
  }

  public update(message: messages.IEnvelope): Query {
    if (message.gherkinDocument) {
      this.gherkinDocuments.push(message.gherkinDocument)

      if (message.gherkinDocument.feature) {
        this.pickleIdsMapByUri.set(
          message.gherkinDocument.uri,
          new ArrayMultimap<string, string>()
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

    for (const astNodeId of pickle.astNodeIds) {
      pickleIdsByLineNumber.put(astNodeId, pickle.id)
    }
    this.updatePickleSteps(pickle)
    this.pickles.push(pickle)

    for (const astNodeId of pickle.astNodeIds) {
      if (!this.pickleIdsByAstNodeId.has(astNodeId)) {
        this.pickleIdsByAstNodeId.set(astNodeId, [])
      }
      this.pickleIdsByAstNodeId.get(astNodeId).push(pickle.id)
    }
  }

  private updatePickleSteps(pickle: messages.IPickle) {
    const pickleSteps = pickle.steps
    for (const pickleStep of pickleSteps) {
      for (const astNodeId of pickleStep.astNodeIds) {
        if (!this.pickleStepIdsByAstNodeId.has(astNodeId)) {
          this.pickleStepIdsByAstNodeId.set(astNodeId, [])
        }
        this.pickleStepIdsByAstNodeId.get(astNodeId).push(pickleStep.id)
      }
    }
  }
}
