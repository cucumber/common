const TransformMatcher = require('./parameter_matcher')
const GeneratedExpression = require('./generated_expression')

class CucumberExpressionGenerator {
  constructor(parameterRegistry) {
    this._parameterRegistry = parameterRegistry
  }

  generateExpression(text) {
    const parameterNames = []
    const parameterMatchers = this._createTransformMatchers(text)
    const parameters = []
    const usageByTypeName = {}

    let expression = ""
    let pos = 0

    while (true) { // eslint-disable-line no-constant-condition
      let matchingTransformMatchers = []
      for (const parameterMatcher of parameterMatchers) {
        const advancedTransformMatcher = parameterMatcher.advanceTo(pos)
        if (advancedTransformMatcher.find) {
          matchingTransformMatchers.push(advancedTransformMatcher)
        }
      }

      if (matchingTransformMatchers.length > 0) {
        matchingTransformMatchers = matchingTransformMatchers.sort(TransformMatcher.compare)
        const bestTransformMatcher = matchingTransformMatchers[0]
        const parameter = bestTransformMatcher.parameter
        parameters.push(parameter)

        const parameterName = this._getParameterName(parameter.typeName, usageByTypeName)
        parameterNames.push(parameterName)

        expression += text.slice(pos, bestTransformMatcher.start)
        expression += `{${parameter.typeName}}`

        pos = bestTransformMatcher.start + bestTransformMatcher.group.length
      } else {
        break
      }

      if (pos >= text.length) {
        break
      }
    }

    expression += text.slice(pos)
    return new GeneratedExpression(expression, parameterNames, parameters)
  }

  _getParameterName(typeName, usageByTypeName) {
      let count = usageByTypeName[typeName]
      count = count ? count + 1 : 1
      usageByTypeName[typeName] = count

      return count == 1 ? typeName : `${typeName}${count}`
  }

  _createTransformMatchers(text) {
    let parameterMatchers = []
    for (let parameter of this._parameterRegistry.parameters) {
      parameterMatchers = parameterMatchers.concat(this._createTransformMatchers2(parameter, text))
    }
    return parameterMatchers
  }

  _createTransformMatchers2(parameter, text) {
    const result = []
    for (let captureGroupRegexp of parameter.captureGroupRegexps) {
      result.push(new TransformMatcher(parameter, captureGroupRegexp, text))
    }
    return result
  }
}

module.exports = CucumberExpressionGenerator
