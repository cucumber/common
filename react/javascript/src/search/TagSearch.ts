import * as messages from '@cucumber/messages'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import { ArrayMultimap } from '@teppeis/multimaps'
import parse from '@cucumber/tag-expressions'
import { GherkinDocumentWalker, rejectAllFilters } from '@cucumber/gherkin-utils'

export default class TagSearch {
  private readonly pickleById = new Map<string, messages.Pickle>()
  private readonly picklesByScenarioId = new ArrayMultimap<string, messages.Pickle>()
  private gherkinDocuments: messages.GherkinDocument[] = []

  constructor(private readonly gherkinQuery: GherkinQuery) {
    this.gherkinQuery = gherkinQuery
  }

  public search(query: string): messages.GherkinDocument[] {
    const expressionNode = parse(query)
    const tagFilters = {
      acceptScenario: (scenario: messages.Scenario) => {
        const pickles = this.picklesByScenarioId.get(scenario.id)

        for (const pickle of pickles) {
          const tags = pickle.tags.map((tag) => tag.name)
          if (expressionNode.evaluate(tags)) {
            return true
          }
        }

        return false
      },
    }
    const filters = { ...rejectAllFilters, ...tagFilters }
    const astWalker = new GherkinDocumentWalker(filters)

    return this.gherkinDocuments
      .map((gherkinDocument) => astWalker.walkGherkinDocument(gherkinDocument))
      .filter((gherkinDocument) => gherkinDocument !== null)
  }

  public add(gherkinDocument: messages.GherkinDocument) {
    this.gherkinDocuments.push(gherkinDocument)
    const pickles = this.gherkinQuery.getPickles()
    pickles.forEach((pickle) => this.pickleById.set(pickle.id, pickle))

    const astWalker = new GherkinDocumentWalker(
      {},
      {
        handleScenario: (scenario) => {
          const pickleIds = this.gherkinQuery.getPickleIds(gherkinDocument.uri, scenario.id)

          pickleIds.map((pickleId) =>
            this.picklesByScenarioId.put(scenario.id, this.pickleById.get(pickleId))
          )
        },
      }
    )
    astWalker.walkGherkinDocument(gherkinDocument)
  }
}
