import { Index, StepDocument } from '../src/types'

/**
 * A brute force (not very performant or fuzzy-search capable) index that matches permutation expressions with string.includes()
 *
 * @param permutationExpressions
 */
export default function bruteForceIndex(permutationExpressions: readonly StepDocument[]): Index {
  return (text) => {
    const predicate = (segment: string) => segment.includes(text)
    return permutationExpressions.filter(permutationExpression => matches(permutationExpression, predicate))
  }
}

function matches(expression: StepDocument, predicate: (segment: string) => boolean): boolean {
  return !!expression.find(segment => typeof segment === 'string' ? predicate(segment) : !!segment.find(predicate))
}
