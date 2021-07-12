import { Expression } from '@cucumber/cucumber-expressions'
import { PermutationExpression } from './types'

type TextOrChoiceIndexExpression = TextOrChoiceIndexSegment[]
type TextOrChoiceIndexSegment = string | number
type ChoicesArray = Set<string>[]

export default class PermutationExpressionBuilder {
  private readonly jsonExpressions = new Set<string>()
  private choicesArray: ChoicesArray = []

  constructor(private readonly expression: Expression) {
  }

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
      this.jsonExpressions.add(JSON.stringify(expression))
    }
  }

  toPermutationExpressions(): readonly PermutationExpression[] {
    return [...this.jsonExpressions].sort().map(jsonSnippet => {
      const snippet: TextOrChoiceIndexExpression = JSON.parse(jsonSnippet)
      const permutationExpression: PermutationExpression = snippet.map((segment, i) => typeof segment === 'number' ? [...this.choicesArray[segment]].sort() : segment)
      return permutationExpression
    })
  }
}
