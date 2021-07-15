import { setWorldConstructor, defineParameterType } from '@cucumber/cucumber'
import { Expression } from '@cucumber/cucumber-expressions'
import { StepDocument } from '../../src'

defineParameterType({
  name: 'ordinal',
  regexp: /(\d+)(?:st|nd|rd|th)/,
  transformer(s) {
    return +s - 1
  },
})

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
  suggestedStepDocuments: readonly StepDocument[]

  /**
   * The index of the selected suggestion
   */
  selectedSuggestionIndex: number
}

setWorldConstructor(World)
