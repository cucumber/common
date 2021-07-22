import { Expression, ParameterType } from '@cucumber/cucumber-expressions'
import { StepDocument } from './types'

type TextOrParameterTypeNameExpression = TextOrParameterTypeNameSegment[]
type TextOrParameterTypeNameSegment = string | ParameterTypeData
type ParameterTypeData = { name: string, regexpStrings: string }

type TextOrIndexExpression = TextOrIndexSegment[]
type TextOrIndexSegment = string | number
type ChoicesArray = Set<string>[]

export default class StepDocumentBuilder {
  // We can't store StepDocument in a Set, so we store a string representation instead
  private readonly jsonDocuments = new Set<string>()
  private readonly jsonTextOrParameterTypeNameExpression = new Set<string>()
  private choicesArray: ChoicesArray = []
  private parameterTypes: ParameterType<any>[] = []

  constructor(private readonly expression: Expression, private readonly choicesByParameterTypeRegexpStrings: Map<string,Set<string>>) {}

  update(text: string) {
    const args = this.expression.match(text)
    const firstUpdate = this.choicesArray.length === 0
    if (args) {
      if (firstUpdate) {
        this.choicesArray = args.map(() => new Set())
        this.parameterTypes = args.map(arg => arg.getParameterType())
      }
      const textOrIndexExpression: TextOrIndexExpression = []
      const textOrParameterTypeNameExpression: TextOrParameterTypeNameExpression = []
      let index = 0
      for (let argIndex = 0; argIndex < args.length; argIndex++) {
        const arg = args[argIndex]

        const segment = text.substring(index, arg.group.start)
        textOrParameterTypeNameExpression.push(segment)
        const parameterType = this.parameterTypes[argIndex]
        const regexpStrings = parameterType.regexpStrings.join('|')
        textOrParameterTypeNameExpression.push({ name: parameterType.name || '', regexpStrings })
        let choices2 = this.choicesByParameterTypeRegexpStrings.get(regexpStrings)
        if(!choices2) {
          choices2 = new Set<string>()
          this.choicesByParameterTypeRegexpStrings.set(regexpStrings, choices2)
        }
        choices2.add(arg.group.value)

        textOrIndexExpression.push(segment)
        textOrIndexExpression.push(argIndex)
        const choices = this.choicesArray[argIndex]
        choices.add(arg.group.value)
        index = arg.group.end
      }
      const lastSegment = text.substring(index)
      if (lastSegment !== '') {
        textOrIndexExpression.push(lastSegment)
        textOrParameterTypeNameExpression.push(lastSegment)
      }
      this.jsonDocuments.add(JSON.stringify(textOrIndexExpression))
      this.jsonTextOrParameterTypeNameExpression.add(JSON.stringify(textOrParameterTypeNameExpression))
    }
  }

  getStepDocuments(maxChoices = 10): readonly StepDocument[] {
    return [...this.jsonTextOrParameterTypeNameExpression].map(json => {
      const textOrParameterTypeNameExpression: TextOrParameterTypeNameExpression = JSON.parse(json)

      const suggestion = textOrParameterTypeNameExpression
        .map((segment) => {
          if (typeof segment === 'string') {
            return segment
          } else {
            return `{${segment.name}}`
          }
        })
        .join('')

      const segments = textOrParameterTypeNameExpression.map((segment) => {
        if (typeof segment === 'string') {
          return segment
        } else {
          const choices = this.choicesByParameterTypeRegexpStrings.get(segment.regexpStrings)
          return [...choices].sort().slice(0, maxChoices)
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
