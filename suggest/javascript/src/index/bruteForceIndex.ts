import { Index } from './types'
import { StepDocument } from '../types'

/**
 * A brute force (not very performant or fuzzy-search capable) index that matches permutation expressions with string.includes()
 *
 * @param stepDocuments
 */
export function bruteForceIndex(stepDocuments: readonly StepDocument[]): Index {
  return (text) => {
    if (!text) return []
    const predicate = (segment: string) => segment.toLowerCase().includes(text.toLowerCase())
    return stepDocuments.filter((permutationExpression) =>
      matches(permutationExpression, predicate)
    )
  }
}

function matches(stepDocument: StepDocument, predicate: (segment: string) => boolean): boolean {
  return !!stepDocument.segments.find((segment) =>
    typeof segment === 'string' ? predicate(segment) : !!segment.find(predicate)
  )
}
