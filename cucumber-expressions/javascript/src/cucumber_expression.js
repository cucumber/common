const Argument = require('./argument')
const TreeRegexp = require('./tree_regexp')
const { UndefinedParameterTypeError } = require('./errors')

// Does not include (){} characters because they have special meaning
const ESCAPE_REGEXP = /([\\^[$.|?*+])/g
const PARAMETER_REGEXP = /(\\\\)?{([^}]+)}/g
const OPTIONAL_REGEXP = /(\\\\)?\(([^)]+)\)/g
const ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP = /([^\s^/]+)((\/[^\s^/]+)+)/g
const DOUBLE_ESCAPE = '\\\\'

class CucumberExpression {
  /**
   * @param expression
   * @param parameterTypeRegistry
   */
  constructor(expression, parameterTypeRegistry) {
    this._expression = expression
    this._parameterTypes = []

    expression = this.processEscapes(expression)
    expression = this.processOptional(expression)
    expression = this.processAlternation(expression)
    expression = this.processParameters(expression, parameterTypeRegistry)
    expression = `^${expression}$`

    this._treeRegexp = new TreeRegexp(expression)
  }

  processEscapes(expression) {
    return expression.replace(ESCAPE_REGEXP, '\\$1')
  }

  processOptional(expression) {
    return expression.replace(
      OPTIONAL_REGEXP,
      (match, p1, p2) => (p1 === DOUBLE_ESCAPE ? `\\(${p2}\\)` : `(?:${p2})?`)
    )
  }

  processAlternation(expression) {
    return expression.replace(ALTERNATIVE_NON_WHITESPACE_TEXT_REGEXP, match => {
      // replace \/ with /
      // replace / with |
      const replacement = match.replace(/\//g, '|').replace(/\\\|/g, '/')
      return `(?:${replacement})`
    })
  }

  processParameters(expression, parameterTypeRegistry) {
    return expression.replace(PARAMETER_REGEXP, (match, p1, p2) => {
      if (p1 === DOUBLE_ESCAPE) return `\\{${p2}\\}`

      const typeName = p2
      const parameterType = parameterTypeRegistry.lookupByTypeName(typeName)
      if (!parameterType) throw new UndefinedParameterTypeError(typeName)
      this._parameterTypes.push(parameterType)
      return buildCaptureRegexp(parameterType.regexps)
    })
  }

  match(text) {
    return Argument.build(this._treeRegexp, text, this._parameterTypes)
  }

  get regexp() {
    return this._treeRegexp.regexp
  }

  get source() {
    return this._expression
  }
}

function buildCaptureRegexp(regexps) {
  if (regexps.length === 1) {
    return `(${regexps[0]})`
  }

  const captureGroups = regexps.map(group => {
    return `(?:${group})`
  })

  return `(${captureGroups.join('|')})`
}

module.exports = CucumberExpression
