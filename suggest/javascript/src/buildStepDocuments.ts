import { StepDocument } from './types'
import { Expression } from '@cucumber/cucumber-expressions'

type TextOrParameterTypeNameExpression = TextOrParameterTypeNameSegment[]
type TextOrParameterTypeNameSegment = string | ParameterTypeData
type ParameterTypeData = { name: string; regexpStrings: string }

/**
 * Builds an array of {@link StepDocument} from steps and step definitions.
 *
 * @param stepTexts
 * @param expressions
 * @param maxChoices
 */
export function buildStepDocuments(
  stepTexts: readonly string[],
  expressions: readonly Expression[],
  maxChoices = 10
): readonly StepDocument[] {
  const jsonTextOrParameterTypeNameExpression = new Set<string>()
  const choicesByParameterTypeRegexpStrings = new Map<string, Set<string>>()

  for (const expression of expressions) {
    for (const text of stepTexts) {
      const args = expression.match(text)
      if (args) {
        const parameterTypes = args.map((arg) => arg.getParameterType())
        const textOrParameterTypeNameExpression: TextOrParameterTypeNameExpression = []
        let index = 0
        for (let argIndex = 0; argIndex < args.length; argIndex++) {
          const arg = args[argIndex]

          const segment = text.substring(index, arg.group.start)
          textOrParameterTypeNameExpression.push(segment)
          const parameterType = parameterTypes[argIndex]
          const regexpStrings = parameterType.regexpStrings.join('|')
          textOrParameterTypeNameExpression.push({ name: parameterType.name || '', regexpStrings })
          let choices = choicesByParameterTypeRegexpStrings.get(regexpStrings)
          if (!choices) {
            choices = new Set<string>()
            choicesByParameterTypeRegexpStrings.set(regexpStrings, choices)
          }
          choices.add(arg.group.value)

          index = arg.group.end
        }
        const lastSegment = text.substring(index)
        if (lastSegment !== '') {
          textOrParameterTypeNameExpression.push(lastSegment)
        }
        jsonTextOrParameterTypeNameExpression.add(JSON.stringify(textOrParameterTypeNameExpression))
      }
    }
  }

  return [...jsonTextOrParameterTypeNameExpression].sort().map((json) => {
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
        const choices = choicesByParameterTypeRegexpStrings.get(segment.regexpStrings)
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
