const ParameterTypeMatcher = require('./parameter_type_matcher')
const GeneratedExpression = require('./generated_expression')

class CucumberExpressionGenerator {
  constructor(parameterTypeRegistry) {
    this._parameterTypeRegistry = parameterTypeRegistry
  }

  generateExpression(text) {
    const parameterNames = []
    const parameterTypeMatchers = this._createParameterTypeMatchers(text)
    const parameterTypes = []
    const usageByTypeName = {}

    let expression = ''
    let pos = 0

    // eslint-disable-next-line no-constant-condition
    while (true) {
      let matchingParameterTypeMatchers = []
      for (const parameterTypeMatcher of parameterTypeMatchers) {
        const advancedParameterTypeMatcher = parameterTypeMatcher.advanceTo(pos)
        if (advancedParameterTypeMatcher.find) {
          matchingParameterTypeMatchers.push(advancedParameterTypeMatcher)
        }
      }

      if (matchingParameterTypeMatchers.length > 0) {
        matchingParameterTypeMatchers = matchingParameterTypeMatchers.sort(
          ParameterTypeMatcher.compare
        )
        const bestParameterTypeMatcher = matchingParameterTypeMatchers[0]
        const parameter = bestParameterTypeMatcher.parameterType
        parameterTypes.push(parameter)

        const parameterName = this._getParameterName(
          parameter.name,
          usageByTypeName
        )
        parameterNames.push(parameterName)

        expression += text.slice(pos, bestParameterTypeMatcher.start)
        expression += `{${parameter.name}}`

        pos =
          bestParameterTypeMatcher.start + bestParameterTypeMatcher.group.length
      } else {
        break
      }

      if (pos >= text.length) {
        break
      }
    }

    expression += text.slice(pos)
    return new GeneratedExpression(expression, parameterNames, parameterTypes)
  }

  _getParameterName(typeName, usageByTypeName) {
    let count = usageByTypeName[typeName]
    count = count ? count + 1 : 1
    usageByTypeName[typeName] = count

    return count == 1 ? typeName : `${typeName}${count}`
  }

  _createParameterTypeMatchers(text) {
    let parameterMatchers = []
    for (const parameter of this._parameterTypeRegistry.parameterTypes) {
      parameterMatchers = parameterMatchers.concat(
        this._createParameterTypeMatchers2(parameter, text)
      )
    }
    return parameterMatchers
  }

  _createParameterTypeMatchers2(parameter, text) {
    const result = []
    for (const regexp of parameter.regexps) {
      result.push(new ParameterTypeMatcher(parameter, regexp, text))
    }
    return result
  }
}

module.exports = CucumberExpressionGenerator
