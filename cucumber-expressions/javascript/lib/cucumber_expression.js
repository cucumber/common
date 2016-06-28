const matchArguments = require('./match_arguments')

class CucumberExpression {
  constructor(expression, targetTypes, transformLookup) {
    const variablePattern = /\{([^}:]+)(:([^}]+))?}/g

    this.transforms = []
    let sb = "^"
    let typeNameIndex = 0
    let match
    let index = 0
    while ((match = variablePattern.exec(expression)) !== null) {
      const targetType = targetTypes.length <= typeNameIndex ? null : targetTypes[typeNameIndex++]
      const expressionTypeName = match[3]

      let transform
      if (expressionTypeName) {
        transform = transformLookup.lookup(expressionTypeName)
      } else if (targetType != null) {
        transform = transformLookup.lookup(targetType)
      } else {
        transform = transformLookup.lookup('string')
      }
      this.transforms.push(transform)

      const text = expression.slice(index, match.index)
      const captureRegexp = `(${transform.captureGroupRegexp})`
      index = variablePattern.lastIndex
      sb += text
      sb += captureRegexp
    }
    sb += expression.slice(index)
    sb += "$"
    this.regexp = new RegExp(sb)
  }

  match(text) {
    return matchArguments(this.regexp, text, this.transforms)
  }
}

module.exports = CucumberExpression