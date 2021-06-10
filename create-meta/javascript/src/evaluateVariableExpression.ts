import { Env } from './types'

export default function evaluateVariableExpression(
  expression: string | undefined,
  env: Env
): string | undefined {
  if (expression === undefined) {
    return undefined
  }
  try {
    const re = new RegExp('\\${(.*?)(?:(?<!\\\\)/(.*)/(.*))?}', 'g')
    return expression.replace(re, (substring, ...args): string => {
      const variable = args[0]
      const value = getValue(env, variable)
      if (value === undefined) {
        throw new Error(`Undefined variable: ${variable}`)
      }
      const pattern = args[1]
      if (!pattern) {
        return value
      }
      const regExp = new RegExp(pattern.replace('/', '/'))
      const match = regExp.exec(value)
      if (!match) {
        throw new Error(`No match for: ${variable}`)
      }
      let replacement = args[2]
      let ref = 1
      for (const group of match.slice(1)) {
        replacement = replacement.replace(`\\${ref++}`, group)
      }
      return replacement
    })
  } catch (err) {
    // There was an undefined variable
    return undefined
  }
}

function getValue(env: Env, variable: string) {
  if (variable.includes('*')) {
    const regexp = new RegExp(variable.replace('*', '.*'))
    for (const [name, value] of Object.entries(env)) {
      if (regexp.exec(name)) {
        return value
      }
    }
  }
  return env[variable]
}
