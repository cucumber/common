import { Expression, ParameterType } from '@cucumber/cucumber-expressions'
import { StepDocument } from './types'

type TextOrParameterTypeNameExpression = TextOrParameterTypeNameSegment[]
type TextOrParameterTypeNameSegment = string | ParameterTypeData
type ParameterTypeData = { name: string, regexpStrings: string }

export default class StepDocumentBuilder {
  // We can't store StepDocument in a Set, so we store a string representation instead
  private readonly jsonTextOrParameterTypeNameExpression = new Set<string>()
  private parameterTypes: ParameterType<any>[] = []

  constructor(private readonly expression: Expression, private readonly choicesByParameterTypeRegexpStrings: Map<string,Set<string>>) {}

  update(text: string) {
    const args = this.expression.match(text)
    if (args) {
      const firstUpdate = this.jsonTextOrParameterTypeNameExpression.size === 0
      if (firstUpdate) {
        this.parameterTypes = args.map(arg => arg.getParameterType())
      }
      const textOrParameterTypeNameExpression: TextOrParameterTypeNameExpression = []
      let index = 0
      for (let argIndex = 0; argIndex < args.length; argIndex++) {
        const arg = args[argIndex]

        const segment = text.substring(index, arg.group.start)
        textOrParameterTypeNameExpression.push(segment)
        const parameterType = this.parameterTypes[argIndex]
        const regexpStrings = parameterType.regexpStrings.join('|')
        textOrParameterTypeNameExpression.push({ name: parameterType.name || '', regexpStrings })
        let choices = this.choicesByParameterTypeRegexpStrings.get(regexpStrings)
        if(!choices) {
          choices = new Set<string>()
          this.choicesByParameterTypeRegexpStrings.set(regexpStrings, choices)
        }
        choices.add(arg.group.value)

        index = arg.group.end
      }
      const lastSegment = text.substring(index)
      if (lastSegment !== '') {
        textOrParameterTypeNameExpression.push(lastSegment)
      }
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
