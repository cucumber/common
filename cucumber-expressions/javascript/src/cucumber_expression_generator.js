import TransformMatcher from './transform_matcher'
import GeneratedExpression from './generated_expression'

class CucumberExpressionGenerator {
  constructor(transformLookup) {
    this._transformLookup = transformLookup
  }

  generateExpression(text) {
    const argumentNames = []
    const transformMatchers = this._createTransformMatchers(text)
    const transforms = []
    const usageByTypeName = {}

    let expression = ""
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
        matchingTransformMatchers = matchingTransformMatchers.sort(TransformMatcher.compare)
        const bestTransformMatcher = matchingTransformMatchers[0]
        const transform = bestTransformMatcher.transform
        transforms.push(transform)

        const argumentName = this._getArgumentName(transform.typeName, usageByTypeName)
        argumentNames.push(argumentName)

        expression += text.slice(pos, bestTransformMatcher.start)
        expression += `{${transform.typeName}}`

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

  _getArgumentName(typeName, usageByTypeName) {
      let count = usageByTypeName[typeName]
      count = count ? count + 1 : 1
      usageByTypeName[typeName] = count

      return count == 1 ? typeName : `${typeName}${count}`
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

export default CucumberExpressionGenerator
