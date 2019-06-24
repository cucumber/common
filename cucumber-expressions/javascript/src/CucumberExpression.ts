import ParameterTypeRegistry from './ParameterTypeRegistry'
import ParameterType from './ParameterType'
import TreeRegexp from './TreeRegexp'
import Argument from './Argument'
import { CucumberExpressionError, UndefinedParameterTypeError } from './Errors'

// RegExps with the g flag are stateful in JavaScript. In order to be able
// to reuse them we have to wrap them in a function.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test

// Does not include (){} characters because they have special meaning
const ESCAPE_REGEXP = () => /([\\^[$.|?*+])/g
const PARAMETER_REGEXP = () => /(\\\\)?{([^}]*)}/g
const OPTIONAL_REGEXP = () => /(\\\\)?\(([^)]+)\)/g
const ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP = () =>
  /([^\s^/]+)((\/[^\s^/]+)+)/g
const DOUBLE_ESCAPE = '\\\\'
const PARAMETER_TYPES_CANNOT_BE_ALTERNATIVE =
  'Parameter types cannot be alternative: '
const PARAMETER_TYPES_CANNOT_BE_OPTIONAL =
  'Parameter types cannot be optional: '

export default class CucumberExpression {
  private parameterTypes: Array<ParameterType<any>> = []
  private treeRegexp: TreeRegexp

  /**
   * @param expression
   * @param parameterTypeRegistry
   */
  constructor(
    private readonly expression: string,
    private readonly parameterTypeRegistry: ParameterTypeRegistry
  ) {
    let expr = this.processEscapes(expression)
    expr = this.processOptional(expr)
    expr = this.processAlternation(expr)
    expr = this.processParameters(expr, parameterTypeRegistry)
    expr = `^${expr}$`

    this.treeRegexp = new TreeRegexp(expr)
  }

  public processEscapes(expression: string) {
    return expression.replace(ESCAPE_REGEXP(), '\\$1')
  }

  public processOptional(expression: string) {
    return expression.replace(OPTIONAL_REGEXP(), (match, p1, p2) => {
      if (p1 === DOUBLE_ESCAPE) {
        return `\\(${p2}\\)`
      }
      this._checkNoParameterType(p2, PARAMETER_TYPES_CANNOT_BE_OPTIONAL)
      return `(?:${p2})?`
    })
  }

  public processAlternation(expression: string) {
    return expression.replace(
      ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP(),
      match => {
        // replace \/ with /
        // replace / with |
        const replacement = match.replace(/\//g, '|').replace(/\\\|/g, '/')
        if (replacement.indexOf('|') !== -1) {
          for (const part of replacement.split(/\|/)) {
            this._checkNoParameterType(
              part,
              PARAMETER_TYPES_CANNOT_BE_ALTERNATIVE
            )
          }
          return `(?:${replacement})`
        } else {
          return replacement
        }
      }
    )
  }

  public processParameters(
    expression: string,
    parameterTypeRegistry: ParameterTypeRegistry
  ) {
    return expression.replace(PARAMETER_REGEXP(), (match, p1, p2) => {
      if (p1 === DOUBLE_ESCAPE) {
        return `\\{${p2}\\}`
      }

      const typeName = p2
      ParameterType.checkParameterTypeName(typeName)
      const parameterType = parameterTypeRegistry.lookupByTypeName(typeName)
      if (!parameterType) {
        throw new UndefinedParameterTypeError(typeName)
      }
      this.parameterTypes.push(parameterType)
      return buildCaptureRegexp(parameterType.regexpStrings)
    })
  }

  public match(text: string): Array<Argument<any>> {
    return Argument.build(this.treeRegexp, text, this.parameterTypes)
  }

  get regexp(): RegExp {
    return this.treeRegexp.regexp
  }

  get source() {
    return this.expression
  }

  public _checkNoParameterType(s: string, message: string) {
    if (s.match(PARAMETER_REGEXP())) {
      throw new CucumberExpressionError(message + this.source)
    }
  }
}

function buildCaptureRegexp(regexps: string[]) {
  if (regexps.length === 1) {
    return `(${regexps[0]})`
  }

  const captureGroups = regexps.map(group => {
    return `(?:${group})`
  })

  return `(${captureGroups.join('|')})`
}
