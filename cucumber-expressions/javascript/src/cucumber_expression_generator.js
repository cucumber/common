const TransformMatcher = require('./transform_matcher')
const GeneratedExpression = require('./generated_expression')

class CucumberExpressionGenerator {
  constructor(transformLookup) {
    this._transformLookup = transformLookup
  }

  generateExpression(text, typed) {
    const argumentNames = []
    const transformMatchers = this._createTransformMatchers(text)
    const transforms = []

    let expression = ""
    let argCounter = 0
    let pos = 0

    while (true) { // eslint-disable-line no-constant-condition
      let matchingTransformMatchers = []
      for (let transformMatcher of transformMatchers) {
        const advancedTransformMatcher = transformMatcher.advanceTo(pos)
        if (advancedTransformMatcher.find) {
          matchingTransformMatchers.push(advancedTransformMatcher)
        }
      }

      if (matchingTransformMatchers.length > 0) {
        const argumentName = `arg${++argCounter}`
        argumentNames.push(argumentName)
        matchingTransformMatchers = matchingTransformMatchers.sort(TransformMatcher.compare)
        const bestTransformMatcher = matchingTransformMatchers[0]
        transforms.push(bestTransformMatcher.transform)

        expression += text.slice(pos, bestTransformMatcher.start)
        expression += `{${argumentName}`

        if (typed) {
          expression += `:${bestTransformMatcher.transform.typeName}`
        }
        expression += "}"
        pos = bestTransformMatcher.start + bestTransformMatcher.group.length
      } else {
        break
      }

      if (pos >= text.length) {
        break
      }
    }

    expression += text.slice(pos)
    return new GeneratedExpression(expression, argumentNames, transforms)
  }

  _createTransformMatchers(text) {
    let transformMatchers = []
    for (let transform of this._transformLookup.transforms) {
      transformMatchers = transformMatchers.concat(this._createTransformMatchers2(transform, text))
    }
    return transformMatchers
  }

  _createTransformMatchers2(transform, text) {
    const result = []
    for (let captureGroupRegexp of transform.captureGroupRegexps) {
      result.push(new TransformMatcher(transform, captureGroupRegexp, text))
    }
    return result
  }
}

module.exports = CucumberExpressionGenerator
