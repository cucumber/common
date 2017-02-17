const matchPattern = require('./build_arguments')

class CucumberExpression {
  /**
   * @param expression
   * @param types Array of type name (String) or types (function). Functions can be a regular function or a constructor
   * @param parameterRegistry
   */
  constructor(expression, types, parameterRegistry) {
    const parameterPattern = /\{([^}:]+)(:([^}]+))?}/g
    const optionalPattern = /\(([^)]+)\)/g

    this._expression = expression
    this._parameters = []
    let regexp = "^"
    let typeIndex = 0
    let match
    let matchOffset = 0

    // Does not include (){} because they have special meaning
    expression = expression.replace(/([\\\^\[$.|?*+])/g, "\\$1")

    // Create non-capturing, optional capture groups from parenthesis
    expression = expression.replace(optionalPattern, '(?:$1)?')

    while ((match = parameterPattern.exec(expression)) !== null) {
      const parameterName = match[1]
      const typeName = match[3]
      if (typeName && (typeof console !== 'undefined') && (typeof console.error == 'function')) {
        console.error(`Cucumber expression parameter syntax {${parameterName}:${typeName}} is deprecated. Please use {${typeName}} instead.`);
      }

      const type = types.length <= typeIndex ? null : types[typeIndex++]

      let parameter;
      if (type) {
        parameter = parameterRegistry.lookupByType(type)
      }
      if (!parameter && typeName) {
        parameter = parameterRegistry.lookupByTypeName(typeName)
      }
      if (!parameter) {
        parameter = parameterRegistry.lookupByTypeName(parameterName)
      }
      if (!parameter) {
        parameter = parameterRegistry.createAnonymousLookup(s => s)
      }
      this._parameters.push(parameter)

      const text = expression.slice(matchOffset, match.index)
      const captureRegexp = getCaptureRegexp(parameter.captureGroupRegexps)
      matchOffset = parameterPattern.lastIndex
      regexp += text
      regexp += captureRegexp
    }
    regexp += expression.slice(matchOffset)
    regexp += "$"
    this._regexp = new RegExp(regexp)
  }

  match(text) {
    return matchPattern(this._regexp, text, this._parameters)
  }

  get source() {
    return this._expression
  }
}

function getCaptureRegexp(captureGroupRegexps) {
  if (captureGroupRegexps.length === 1) {
    return `(${captureGroupRegexps[0]})`
  }

  const captureGroups = captureGroupRegexps.map(group => {
    return `(?:${group})`
  })

  return `(${captureGroups.join('|')})`
}

module.exports = CucumberExpression
