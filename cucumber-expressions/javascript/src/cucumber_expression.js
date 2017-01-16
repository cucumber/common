import matchArguments from './match_arguments'

class CucumberExpression {
  /**
   * @param expression
   * @param types Array of type name (String) or types (function). Functions can be a regular function or a constructor
   * @param transformLookup
   */
  constructor(expression, types, transformLookup) {
    const parameterPattern = /\{([^}:]+)(:([^}]+))?}/g
    const optionalPattern = /\(([^\)]+)\)/g

    this._expression = expression
    this._transforms = []
    let regexp = "^"
    let typeIndex = 0
    let match
    let matchOffset = 0

    // Create non-capturing, optional capture groups from parenthesis
    expression = expression.replace(optionalPattern, '(?:$1)?')

    while ((match = parameterPattern.exec(expression)) !== null) {
      const parameterName = match[1]
      const typeName = match[3]
      const type = types.length <= typeIndex ? null : types[typeIndex++]

      let transform;
      if (type) {
        transform = transformLookup.lookupByType(type)
      }
      if (!transform && typeName) {
        transform = transformLookup.lookupByTypeName(typeName, false)
      }
      if (!transform) {
        transform = transformLookup.lookupByTypeName(parameterName, true)
      }
      if (!transform) {
        transform = transformLookup.createAnonymousLookup(s => s)
      }
      this._transforms.push(transform)

      const text = expression.slice(matchOffset, match.index)
      const captureRegexp = getCaptureRegexp(transform.captureGroupRegexps)
      matchOffset = parameterPattern.lastIndex
      regexp += text
      regexp += captureRegexp
    }
    regexp += expression.slice(matchOffset)
    regexp += "$"
    this._regexp = new RegExp(regexp)
  }

  match(text) {
    return matchArguments(this._regexp, text, this._transforms)
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

export default CucumberExpression
