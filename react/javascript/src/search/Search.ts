import { messages } from '@cucumber/messages'
import { Query as GherkinQuery } from '@cucumber/gherkin-utils'
import TagSearch from '../../src/search/TagSearch'
import TextSearch from '../../src/search/TextSearch'
import isTagExpression from '../../src/is_tag_expression'

export default class Search {
  private readonly tagSearch: TagSearch
  private readonly textSearch = new TextSearch()

  constructor(private readonly gherkinQuery: GherkinQuery) {
    this.tagSearch = new TagSearch(gherkinQuery)
  }

  public search(query: string): messages.IGherkinDocument[] {
    if (isTagExpression(query)) {
      try {
        return this.tagSearch.search(query)
      } catch {
        // No-op, we fall back to text search.
      }
    }

    return this.textSearch.search(query)
  }

  public add(gherkinDocument: messages.IGherkinDocument) {
    this.tagSearch.add(gherkinDocument)
    this.textSearch.add(gherkinDocument)
  }
}
