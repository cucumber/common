import { setWorldConstructor } from '@cucumber/cucumber'
import { Expression } from '@cucumber/cucumber-expressions'
import { StepDocument } from '../../src/types'

export default class World {
  /**
   * The known Gherkin steps
   */
  steps: readonly string[] = []

  /**
   * The known [Cucumber|Regular]Expressions from the step definitions
   */
  expressions: readonly Expression[] = []

  /**
   * The results of calling the index(text) function
   */
  stepDocuments: readonly StepDocument[]
}

setWorldConstructor(World)
