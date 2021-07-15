import { Expression, ParameterType } from '@cucumber/cucumber-expressions'
import { StepDocument } from './types'

type TextOrIndexExpression = TextOrIndexSegment[]
type TextOrIndexSegment = string | number
type ChoicesArray = Set<string>[]

export default class StepDocumentBuilder {
  // We can't store StepDocument in a Set, so we store a string representation instead
  private readonly jsonDocuments = new Set<string>()
  private choicesArray: ChoicesArray = []
  private parameterTypes: ParameterType<any>[] = []

  constructor(private readonly expression: Expression) {}

  update(text: string) {
    const args = this.expression.match(text)
    const firstUpdate = this.choicesArray.length === 0
    if (args) {
      if (firstUpdate) {
        this.choicesArray = args.map(() => new Set())
      }
      const expression: TextOrIndexExpression = []
      let index = 0
      for (let choiceIndex = 0; choiceIndex < args.length; choiceIndex++) {
        const arg = args[choiceIndex]
        if (firstUpdate) {
          const parameterType = arg.getParameterType()
          this.parameterTypes.push(parameterType)
        }

        const segment = text.substring(index, arg.group.start)
        expression.push(segment)
        expression.push(choiceIndex)
        const choices = this.choicesArray[choiceIndex]
        choices.add(arg.group.value)
        index = arg.group.end
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
      const textOrIndexExpression: TextOrIndexExpression = JSON.parse(jsonSnippet)

      const suggestion = textOrIndexExpression
        .map((segment) => {
          if (typeof segment === 'number') {
            return `{${this.parameterTypes[segment].name || ''}}`
          } else {
            return segment
          }
        })
        .join('')

      const segments = textOrIndexExpression.map((segment) => {
        if (typeof segment === 'number') {
          return [...this.choicesArray[segment]].sort().slice(0, maxChoices)
        } else {
          return segment
        }
      })

      const stepDocument: StepDocument = {
        suggestion,
        segments,
      }
      return stepDocument
    })
  }
}
