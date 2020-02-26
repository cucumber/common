import { messages } from '@cucumber/messages'
import elasticlunr from 'elasticlunr'

interface SearchableStep {
  id: string
  keyword: string
  text: string
}

export default class StepSearch {
  private readonly index = elasticlunr<SearchableStep>(ctx => {
    ctx.addField('keyword')
    ctx.addField('text')
    ctx.setRef('id')
    ctx.saveDocument(true)
  })
  private stepById = new Map<string, messages.GherkinDocument.Feature.IStep>()

  public add(step: messages.GherkinDocument.Feature.IStep): void {
    const doc = {
      id: step.id,
      keyword: step.keyword,
      text: step.text,
    }

    this.index.addDoc(doc)
    this.stepById.set(step.id, step)
  }

  public search(query: string): messages.GherkinDocument.Feature.IStep[] {
    const results = this.index.search(query, {
      fields: {
        keyword: { bool: 'OR', expand: true, boost: 1 },
        text: { bool: 'OR', expand: true, boost: 2 },
      },
    })

    return results.map(result => this.stepById.get(result.ref))
  }
}
