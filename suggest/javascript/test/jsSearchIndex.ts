import { Index, PermutationExpression } from '../src/types'
import { Search } from 'js-search'

type Doc = {
  id: number
  text: string
}

export default function fuseIndex(permutationExpressions: readonly PermutationExpression[]): Index {
  const docs: Doc[] = permutationExpressions.map((expression, id) => {
    return {
      id,
      text: expression.map(segment => typeof segment === 'string' ? segment : segment.join(' ')).join('')
    }
  })

  const search = new Search('id')
  search.addIndex('text')
  search.addDocuments(docs)

  return (text) => {
    const results = search.search(text)
    return results.map((result: Doc) => permutationExpressions[result.id])
  }
}
