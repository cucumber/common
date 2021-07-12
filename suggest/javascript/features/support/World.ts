import { setWorldConstructor } from '@cucumber/cucumber'
import { Expression } from '@cucumber/cucumber-expressions'
import { PermutationExpression } from '../../src/types'

export default class World {
  /**
   * The known Gherkin steps
   */
  steps: readonly string[] = []

  /**
   * The [Cucumber|Regular]Expressions from the step definitions
   */
  expressions: readonly Expression[] = []

  /**
   * The results of calling the index(text) function
   */
  permutationExpressions: readonly PermutationExpression[]
}

setWorldConstructor(World)
