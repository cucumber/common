import * as messages from '@cucumber/messages'
import { ArrayMultimap } from '@teppeis/multimaps'

export default class Query {
  private readonly gherkinDocuments: messages.GherkinDocument[] = []
  private readonly pickles: messages.Pickle[] = []
  private readonly locationByAstNodeId = new Map<string, messages.Location>()
  private readonly gherkinStepById = new Map<string, messages.Step>()
  private readonly pickleIdsMapByUri = new Map<string, ArrayMultimap<string, string>>()

  private readonly pickleIdsByAstNodeId = new Map<string, string[]>()

  private readonly pickleStepIdsByAstNodeId = new Map<string, string[]>()

  /**
   * Gets the location (line and column) of an AST node.
   * @param astNodeId
   */
  public getLocation(astNodeId: string): messages.Location {
    return this.locationByAstNodeId.get(astNodeId)
  }

  public getGherkinDocuments(): readonly messages.GherkinDocument[] {
    return this.gherkinDocuments
  }

  public getPickles(): readonly messages.Pickle[] {
    return this.pickles
  }

  /**
   * Gets all the pickle IDs
   * @param uri - the URI of the document
   * @param astNodeId - optionally restrict results to a particular AST Node
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

  public update(message: messages.Envelope): Query {
    if (message.gherkinDocument) {
      this.gherkinDocuments.push(message.gherkinDocument)

      if (message.gherkinDocument.feature) {
        this.pickleIdsMapByUri.set(message.gherkinDocument.uri, new ArrayMultimap<string, string>())

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

  private updateGherkinBackground(background: messages.Background) {
    for (const step of background.steps) {
      this.updateGherkinStep(step)
    }
  }

  private updateGherkinScenario(scenario: messages.Scenario) {
    this.locationByAstNodeId.set(scenario.id, scenario.location)
    for (const step of scenario.steps) {
      this.updateGherkinStep(step)
    }

    for (const examples of scenario.examples) {
      if (!examples.tableBody) throw new Error('tableBody was null or undefined')
      for (const tableRow of examples.tableBody) {
        this.locationByAstNodeId.set(tableRow.id, tableRow.location)
      }
    }
  }

  private updateGherkinStep(step: messages.Step) {
    this.locationByAstNodeId.set(step.id, step.location)
    this.gherkinStepById.set(step.id, step)
  }

  private updatePickle(pickle: messages.Pickle) {
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

  private updatePickleSteps(pickle: messages.Pickle) {
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
