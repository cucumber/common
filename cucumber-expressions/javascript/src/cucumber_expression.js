const matchPattern = require('./build_arguments')

class CucumberExpression {
  /**
   * @param expression
   * @param types Array of type name (String) or types (function). Functions can be a regular function or a constructor
   * @param parameterTypeRegistry
   */
  constructor (expression, types, parameterTypeRegistry) {
      var PARAMETER_REGEXP = /[{\[]([^}\]:]+)(:([^}\]]+))?[}\]]/g;
    const OPTIONAL_REGEXP = /\(([^)]+)\)/g
    const ALTERNATIVE_WORD_REGEXP = /(\w+)((\/\w+)+)/g

    this._expression = expression
    this._parameterTypes = []
    let regexp = "^"
    let typeIndex = 0
    let match
    let matchOffset = 0

    // Does not include (){}[] because they have special meaning
      expression = expression.replace(/([\\\^$.|?*+])/g, "\\$1");

    // Create non-capturing, optional capture groups from parenthesis
    expression = expression.replace(OPTIONAL_REGEXP, '(?:$1)?')

    expression = expression.replace(ALTERNATIVE_WORD_REGEXP, (_, p1, p2) => `(?:${p1}${p2.replace(/\//g, '|')})`)

    while ((match = PARAMETER_REGEXP.exec(expression)) !== null) {
      const parameterName = match[1]
      const parameterTypeName = match[3]
      // eslint-disable-next-line no-console
      if (parameterTypeName && (typeof console !== 'undefined') && (typeof console.error == 'function')) {
        // eslint-disable-next-line no-console
        console.error(`Cucumber expression parameter syntax {${parameterName}:${parameterTypeName}} is deprecated. Please use {${parameterTypeName}} instead.`)
      }

      const type = types.length <= typeIndex ? null : types[typeIndex++]

      let parameter
      if (type) {
        parameter = parameterTypeRegistry.lookupByType(type)
      }
      if (!parameter && parameterTypeName) {
        parameter = parameterTypeRegistry.lookupByTypeName(parameterTypeName)
      }
      if (!parameter) {
        parameter = parameterTypeRegistry.lookupByTypeName(parameterName)
      }
      if (!parameter) {
        parameter = parameterTypeRegistry.createAnonymousLookup(s => s)
      }
        parameter.matchType = match[0].split("")[0] === "{" ? "capture" : "non-capture";
        this._parameterTypes.push(parameter)

      const text = expression.slice(matchOffset, match.index)
      const captureRegexp = getCaptureRegexp(parameter.regexps, parameter.matchType)
      matchOffset = PARAMETER_REGEXP.lastIndex
      regexp += text
      regexp += captureRegexp
    }
    regexp += expression.slice(matchOffset)
    regexp += "$"
    this._regexp = new RegExp(regexp)
  }

  match (text) {
    return matchPattern(this._regexp, text, this._parameterTypes)
  }

  get source () {
    return this._expression
  }
}

function getCaptureRegexp (regexps, matchType) {
  if (regexps.length === 1) {
      return matchType === "capture" ? "(" + regexps[0] + ")" : "(?:" + regexps[0] + ")";
  }

  const captureGroups = regexps.map(group => {
    return `(?:${group})`
  })

  return `(${captureGroups.join('|')})`
}

module.exports = CucumberExpression
