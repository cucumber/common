import { Expression } from '@cucumber/cucumber-expressions'
import { StepDocument } from './types'

type TextOrChoiceIndexExpression = TextOrChoiceIndexSegment[]
type TextOrChoiceIndexSegment = string | number
type ChoicesArray = Set<string>[]

export default class StepDocumentBuilder {
  // We can't store StepDocument in a Set, so we store a string representation instead
  private readonly jsonDocuments = new Set<string>()
  private choicesArray: ChoicesArray = []

  constructor(private readonly expression: Expression) {}

  update(text: string) {
    const args = this.expression.match(text)
    if (args) {
      if (this.choicesArray.length === 0) {
        this.choicesArray = args.map(() => new Set())
      }
      const expression: TextOrChoiceIndexExpression = []
      let index = 0
      for (let choiceIndex = 0; choiceIndex < args.length; choiceIndex++) {
        const choice = args[choiceIndex]
        const segment = text.substring(index, choice.group.start)
        expression.push(segment)
        expression.push(choiceIndex)
        const choices = this.choicesArray[choiceIndex]
        choices.add(choice.group.value)
        index = choice.group.end
      }
      const lastSegment = text.substring(index)
      if (lastSegment !== '') {
        expression.push(lastSegment)
      }
      this.jsonDocuments.add(JSON.stringify(expression))
    }
  }

  getStepDocuments(maxChoices = 10): readonly StepDocument[] {
    return [...this.jsonDocuments].sort().map((jsonSnippet) => {
      const textOrChoiceIndexExpression: TextOrChoiceIndexExpression = JSON.parse(jsonSnippet)
      return textOrChoiceIndexExpression.map((segment) =>
        typeof segment === 'number' ? [...this.choicesArray[segment]].sort().slice(0, maxChoices) : segment
      )
    })
  }
}
