import { Index, StepDocument } from '../src'
import { Search } from 'js-search'

type Doc = {
  id: number
  text: string
}

export default function fuseIndex(stepDocuments: readonly StepDocument[]): Index {
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
    const results = search.search(text)
    return results.map((result: Doc) => stepDocuments[result.id])
  }
}
