import { Index } from './types'
import { StepDocument } from '../types'
import Fuse from 'fuse.js'

type Doc = {
  text: string
}

export function fuseIndex(stepDocuments: readonly StepDocument[]): Index {
  const docs: Doc[] = stepDocuments.map((stepDocument) => {
    return {
      text: stepDocument.segments
        .map((segment) => (typeof segment === 'string' ? segment : segment.join(' ')))
        .join(''),
    }
  })
  const fuse = new Fuse(docs, {
    keys: ['text'],
    minMatchCharLength: 2,
    threshold: 0.1,
    ignoreLocation: true,
  })

  return (text) => {
    if (!text) return []
    const results = fuse.search(text, { limit: 10 })
    return results.map((result) => stepDocuments[result.refIndex])
  }
}
