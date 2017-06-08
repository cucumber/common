const ParameterTypeMatcher = require('./parameter_type_matcher')
const ParameterType = require('./parameter_type')
const CombinatorialGeneratedExpressionFactory = require('./combinatorial_generated_expression_factory')

class CucumberExpressionGenerator {
  constructor(parameterTypeRegistry) {
    this._parameterTypeRegistry = parameterTypeRegistry
  }

  generateExpressions(text) {
    const parameterTypeCombinations = []
    const parameterTypeMatchers = this._createParameterTypeMatchers(text)
    let expressionTemplate = ''
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

        // Find all the best parameter type matchers, they are all candidates.
        const bestParameterTypeMatcher = matchingParameterTypeMatchers[0]
        const bestParameterTypeMatchers = matchingParameterTypeMatchers.filter(
          m => ParameterTypeMatcher.compare(m, bestParameterTypeMatcher) === 0
        )

        // Build a list of parameter types without duplicates. The reason there
        // might be duplicates is that some parameter types have more than one regexp,
        // which means multiple ParameterTypeMatcher objects will have a reference to the
        // same ParameterType.
        // We're sorting the list so preferential parameter types are listed first.
        // Users are most likely to want these, so they should be listed at the top.
        let parameterTypes = []
        for (const parameterTypeMatcher of bestParameterTypeMatchers) {
          if (!parameterTypes.includes(parameterTypeMatcher.parameterType)) {
            parameterTypes.push(parameterTypeMatcher.parameterType)
          }
        }
        parameterTypes = parameterTypes.sort(ParameterType.compare)

        parameterTypeCombinations.push(parameterTypes)

        expressionTemplate += text.slice(pos, bestParameterTypeMatcher.start)
        expressionTemplate += '{%s}'

        pos =
          bestParameterTypeMatcher.start + bestParameterTypeMatcher.group.length
      } else {
        break
      }

      if (pos >= text.length) {
        break
      }
    }

    expressionTemplate += text.slice(pos)
    return new CombinatorialGeneratedExpressionFactory(
      expressionTemplate,
      parameterTypeCombinations
    ).generateExpressions()
  }

  /**
   * @deprecated
   */
  generateExpression(text) {
    return this.generateExpressions(text)[0]
  }

  _createParameterTypeMatchers(text) {
    let parameterMatchers = []
    for (const parameterType of this._parameterTypeRegistry.parameterTypes) {
      parameterMatchers = parameterMatchers.concat(
        this._createParameterTypeMatchers2(parameterType, text)
      )
    }
    return parameterMatchers
  }

  _createParameterTypeMatchers2(parameterType, text) {
    // TODO: [].map
    const result = []
    for (const regexp of parameterType.regexps) {
      result.push(new ParameterTypeMatcher(parameterType, regexp, text))
    }
    return result
  }
}

module.exports = CucumberExpressionGenerator
