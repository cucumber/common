import { Index, StepDocument } from '../src'
import Fuse from 'fuse.js'

type Doc = {
  text: string
}

export default function fuseIndex(stepDocuments: readonly StepDocument[]): Index {
  const docs: Doc[] = stepDocuments.map((stepDocument) => {
    return {
      text: stepDocument.segments
        .map((segment) => (typeof segment === 'string' ? segment : segment.join(' ')))
        .join(''),
    }
  })
  const fuse = new Fuse(docs, { keys: ['text'], minMatchCharLength: 2 })

  return (text) => {
    const results = fuse.search(text, { limit: 10 })
    return results.map((result) => stepDocuments[result.refIndex])
  }
}
