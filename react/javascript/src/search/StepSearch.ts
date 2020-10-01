import { messages } from '@cucumber/messages'
import elasticlunr from 'elasticlunr'

interface SearchableStep {
  id: string
  keyword: string
  text: string
  docString?: string
  dataTable?: string
}

export default class StepSearch {
  private readonly index = elasticlunr<SearchableStep>((ctx) => {
    ctx.addField('keyword')
    ctx.addField('text')
    ctx.addField('docString')
    ctx.addField('dataTable')
    ctx.setRef('id')
    ctx.saveDocument(true)
  })
  private stepById = new Map<string, messages.GherkinDocument.Feature.IStep>()

  public add(step: messages.GherkinDocument.Feature.IStep): void {
    const doc = {
      id: step.id,
      keyword: step.keyword,
      text: step.text,
      docString: this.docStringToString(step),
      dataTable: this.dataTableToString(step),
    }

    this.index.addDoc(doc)
    this.stepById.set(step.id, step)
  }

  public search(query: string): messages.GherkinDocument.Feature.IStep[] {
    const results = this.index.search(query, {
      fields: {
        keyword: { bool: 'OR', boost: 1 },
        text: { bool: 'OR', boost: 2 },
        docString: { bool: 'OR', boost: 1 },
        dataTable: { bool: 'OR', boost: 1 },
      },
    })

    return results.map((result) => this.stepById.get(result.ref))
  }

  private docStringToString(
    step: messages.GherkinDocument.Feature.IStep
  ): string {
    return step.docString ? step.docString.content : ''
  }

  private dataTableToString(
    step: messages.GherkinDocument.Feature.IStep
  ): string {
    return step.dataTable
      ? step.dataTable.rows
          .map((row) => row.cells.map((cell) => cell.value).join(' '))
          .join(' ')
      : undefined
  }
}
