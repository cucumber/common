const matchArguments = require('./match_arguments')
const Transform = require('./transform')

class CucumberExpression {
  /**
   * @param expression
   * @param targetTypes Array of type name (String) or types (constructor functions)
   * @param transformLookup
   */
  constructor(expression, targetTypes, transformLookup) {
    const variablePattern = /\{([^}:]+)(:([^}]+))?}/g
    const optionalPattern = /\(([^\)]+)\)/g

    this.transforms = []
    let regexp = "^"
    let typeNameIndex = 0
    let match
    let index = 0

    // Create non-capturing, optional capture groups from parenthesis
    expression = expression.replace(optionalPattern, '(?:$1)?')

    while ((match = variablePattern.exec(expression)) !== null) {
      const targetType = targetTypes.length <= typeNameIndex ? null : targetTypes[typeNameIndex++]
      const argumentName = match[1]
      const expressionTypeName = match[3]

      let transform
      if (expressionTypeName) {
        transform = transformLookup.lookupByTypeName(expressionTypeName)
        if (!transform) {
          throw new Error(`No transformer for type "${expressionTypeName}"`)
        }
      }
      if (!transform && targetType != null) {
        if (typeof targetType === 'string') {
          transform = transformLookup.lookupByTypeName(targetType)
        } else if (typeof targetType === 'function') {
          transform = transformLookup.lookupByConstructor(targetType)
        }
      }
      if (!transform && targetType != null) {
        if (typeof targetType === 'function') {
          transform = new Transform(null, null, [".+"], s => new targetType(s))
        }
      }
      if (!transform) {
        transform = transformLookup.lookupByTypeName(argumentName)
      }
      if (!transform) {
        transform = transformLookup.lookupByTypeName('string')
      }
      this.transforms.push(transform)

      const text = expression.slice(index, match.index)
      const captureRegexp = `(${transform.captureGroupRegexps[0]})`
      index = variablePattern.lastIndex
      regexp += text
      regexp += captureRegexp
    }
    regexp += expression.slice(index)
    regexp += "$"
    this.regexp = new RegExp(regexp)
  }

  match(text) {
    return matchArguments(this.regexp, text, this.transforms)
  }
}

module.exports = CucumberExpression
