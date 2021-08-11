import { Index } from './types'
import { StepDocument } from '../types'
import { Search } from 'js-search'

type Doc = {
  id: number
  text: string
}

export function jsSearchIndex(stepDocuments: readonly StepDocument[]): Index {
  const docs: Doc[] = stepDocuments.map((stepDocument, id) => {
    return {
      id,
      text: stepDocument.segments
        .map((segment) => (typeof segment === 'string' ? segment : segment.join(' ')))
        .join(''),
    }
  })

  const search = new Search('id')
  search.addIndex('text')
  search.addDocuments(docs)

  return (text) => {
    if (!text) return []
    const results = search.search(text)
    return results.map((result: Doc) => stepDocuments[result.id])
  }
}
