import { messages } from '@cucumber/messages'
import { ArrayMultimap } from '@teppeis/multimaps'

export default class Query {
  private readonly sources: messages.ISource[] = []
  private readonly gherkinDocuments: messages.IGherkinDocument[] = []
  private readonly pickles: messages.IPickle[] = []
  private readonly locationByAstNodeId = new Map<string, messages.ILocation>()
  private readonly gherkinStepByAstNodeId = new Map<
    string,
    messages.GherkinDocument.Feature.IStep
  >()
  private readonly pickleIdsMapByUri = new Map<
    string,
    ArrayMultimap<string, string>
  >()

  private readonly pickleIdsByAstNodeId = new Map<string, string[]>()

  private readonly pickleStepIdsByAstNodeId = new Map<string, string[]>()

  private readonly stepByUriLocation = new Map<
    string,
    messages.GherkinDocument.Feature.IStep
  >()

  /**
   * Gets the location (line and column) of an AST node.
   * @param astNodeId
   */
  public getLocation(astNodeId: string): messages.ILocation {
    return this.locationByAstNodeId.get(astNodeId)
  }

  public getSources(): readonly messages.ISource[] {
    return this.sources
  }

  public getGherkinDocuments(): readonly messages.IGherkinDocument[] {
    return this.gherkinDocuments
  }

  public getPickles(): readonly messages.IPickle[] {
    return this.pickles
  }

  public getStep(
    uri: string,
    line: number
  ): messages.GherkinDocument.Feature.IStep | undefined {
    return this.stepByUriLocation.get([uri, line].join(':'))
  }

  /**
   * Gets all the pickle IDs
   * @param uri - the URI of the document
   * @param astNodeId - optionally restrict results to a particular AST node
   */
  public getPickleIds(uri: string, astNodeId?: string): readonly string[] {
    const pickleIdsByAstNodeId = this.pickleIdsMapByUri.get(uri)
    return astNodeId === undefined
      ? Array.from(new Set(pickleIdsByAstNodeId.values()))
      : pickleIdsByAstNodeId.get(astNodeId)
  }

  public getPickleStepIds(astNodeId: string): readonly string[] {
    return this.pickleStepIdsByAstNodeId.get(astNodeId) || []
  }

  public update(message: messages.IEnvelope): Query {
    if (message.source) {
      this.sources.push(message.source)
    }

    if (message.gherkinDocument) {
      this.gherkinDocuments.push(message.gherkinDocument)

      if (message.gherkinDocument.feature) {
        this.pickleIdsMapByUri.set(
          message.gherkinDocument.uri,
          new ArrayMultimap<string, string>()
        )

        for (const featureChild of message.gherkinDocument.feature.children) {
          if (featureChild.background) {
            this.updateGherkinBackground(
              message.gherkinDocument.uri,
              featureChild.background
            )
          }

          if (featureChild.scenario) {
            this.updateGherkinScenario(
              message.gherkinDocument.uri,
              featureChild.scenario
            )
          }

          if (featureChild.rule) {
            const ruleChildren = featureChild.rule.children
            for (const ruleChild of ruleChildren) {
              if (ruleChild.background) {
                this.updateGherkinBackground(
                  message.gherkinDocument.uri,
                  ruleChild.background
                )
              }

              if (ruleChild.scenario) {
                this.updateGherkinScenario(
                  message.gherkinDocument.uri,
                  ruleChild.scenario
                )
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
    uri: string,
    background: messages.GherkinDocument.Feature.IBackground
  ) {
    for (const step of background.steps) {
      this.updateGherkinStep(uri, step)
    }
  }

  private updateGherkinScenario(
    uri: string,
    scenario: messages.GherkinDocument.Feature.IScenario
  ) {
    this.locationByAstNodeId.set(scenario.id, scenario.location)
    for (const step of scenario.steps) {
      this.updateGherkinStep(uri, step)
    }

    for (const examples of scenario.examples) {
      for (const tableRow of examples.tableBody) {
        this.locationByAstNodeId.set(tableRow.id, tableRow.location)
      }
    }
  }

  private updateGherkinStep(
    uri: string,
    step: messages.GherkinDocument.Feature.IStep
  ) {
    this.locationByAstNodeId.set(step.id, step.location)
    this.gherkinStepByAstNodeId.set(step.id, step)
    const uriLocation = [uri, step.location.line].join(':')
    this.stepByUriLocation.set(uriLocation, step)
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
