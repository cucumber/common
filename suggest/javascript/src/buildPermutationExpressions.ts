import { PermutationExpression } from './types'
import PermutationExpressionBuilder from './PermutationExpressionBuilder'
import { Expression } from '@cucumber/cucumber-expressions'

/**
 * Builds an array of {@link PermutationExpression} from steps and step definitions.
 *
 * @param steps
 * @param expressions
 */
export default function buildPermutationExpressions(steps: readonly string[], expressions: readonly Expression[]): readonly PermutationExpression[] {
  let permutationExpressions: PermutationExpression[] = []
  const builders = expressions.map(expression => new PermutationExpressionBuilder(expression))
  for (const builder of builders) {
    for (const step of steps) {
      builder.update(step)
    }
    permutationExpressions = permutationExpressions.concat(builder.toPermutationExpressions())
  }
  return permutationExpressions
}
