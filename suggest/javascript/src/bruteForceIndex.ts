import { Index, PermutationExpression } from './types'

export default function bruteForceIndex(permutationExpressions: readonly PermutationExpression[]): Index {
  return (text) => {
    return permutationExpressions.filter(permutationExpression => hasWordStartingWith(permutationExpression, text))
  }
}

function hasWordStartingWith(expression: PermutationExpression, text: string) {
  return true
}
