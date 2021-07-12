import { Index, StepDocument } from '../src/types'
import Fuse from 'fuse.js'

type Doc = {
  text: string
}

export default function fuseIndex(permutationExpressions: readonly StepDocument[]): Index {
  const docs: Doc[] = permutationExpressions.map(expression => {
    return {
      text: expression.map(segment => typeof segment === 'string' ? segment : segment.join(' ')).join('')
    }
  })
  const fuse = new Fuse(docs, { keys: ['text'], minMatchCharLength: 2 })

  return (text) => {
    let results = fuse.search(text, {limit: 10})
    return results.map(result => {
      // console.log('result: %o', result)
      return permutationExpressions[result.refIndex]
    })
  }
}
