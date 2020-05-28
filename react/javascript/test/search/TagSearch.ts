import { messages } from '@cucumber/messages'
import { Query as GherkinQuery } from '@cucumber/gherkin'
import AstWalker, { rejectAllFilters } from '../../src/search/AstWalker'
import { ArrayMultimap } from '@teppeis/multimaps'
import parse from '@cucumber/tag-expressions'

export default class TagSearch {
  private readonly pickleById = new Map<string, messages.IPickle>()
  private readonly picklesByScenarioId = new ArrayMultimap<
    string,
    messages.IPickle
  >()
  private gherkinDocuments: messages.IGherkinDocument[] = []

  constructor(private readonly gherkinQuery: GherkinQuery) {}

  public search(query: string): messages.IGherkinDocument[] {
    const expressionNode = parse(query)
    const tagFilters = {
      acceptScenario: (
        scenario: messages.GherkinDocument.Feature.IScenario
      ) => {
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
    const astWalker = new AstWalker(filters)

    return this.gherkinDocuments
      .map((gherkinDocument) => astWalker.walkGherkinDocument(gherkinDocument))
      .filter((gherkinDocument) => gherkinDocument !== null)
  }

  public add(gherkinDocument: messages.IGherkinDocument) {
    this.gherkinDocuments.push(gherkinDocument)
    this.gherkinQuery
      .getPickles()
      .map((pickle) => this.pickleById.set(pickle.id, pickle))

    const astWalker = new AstWalker(
      {},
      {
        handleScenario: (scenario) => {
          const pickleIds = this.gherkinQuery.getPickleIds(
            gherkinDocument.uri,
            scenario.id
          )

          pickleIds.map((pickleId) =>
            this.picklesByScenarioId.put(
              scenario.id,
              this.pickleById.get(pickleId)
            )
          )
        },
      }
    )
    astWalker.walkGherkinDocument(gherkinDocument)
  }
}
