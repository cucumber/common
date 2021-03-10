import ParameterTypeMatcher from './ParameterTypeMatcher'
import ParameterType from './ParameterType'

import util from 'util'
import CombinatorialGeneratedExpressionFactory from './CombinatorialGeneratedExpressionFactory'
import GeneratedExpression from './GeneratedExpression'

export default class CucumberExpressionGenerator {
  constructor(private readonly parameterTypes: () => Iterable<ParameterType<any>>) {}

  public generateExpressions(text: string): ReadonlyArray<GeneratedExpression> {
    const parameterTypeCombinations: Array<Array<ParameterType<any>>> = []
    const parameterTypeMatchers = this.createParameterTypeMatchers(text)
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
          (m) => ParameterTypeMatcher.compare(m, bestParameterTypeMatcher) === 0
        )

        // Build a list of parameter types without duplicates. The reason there
        // might be duplicates is that some parameter types have more than one regexp,
        // which means multiple ParameterTypeMatcher objects will have a reference to the
        // same ParameterType.
        // We're sorting the list so preferential parameter types are listed first.
        // Users are most likely to want these, so they should be listed at the top.
        let parameterTypes = []
        for (const parameterTypeMatcher of bestParameterTypeMatchers) {
          if (parameterTypes.indexOf(parameterTypeMatcher.parameterType) === -1) {
            parameterTypes.push(parameterTypeMatcher.parameterType)
          }
        }
        parameterTypes = parameterTypes.sort(ParameterType.compare)

        parameterTypeCombinations.push(parameterTypes)

        expressionTemplate += escape(text.slice(pos, bestParameterTypeMatcher.start))
        expressionTemplate += '{%s}'

        pos = bestParameterTypeMatcher.start + bestParameterTypeMatcher.group.length
      } else {
        break
      }

      if (pos >= text.length) {
        break
      }
    }

    expressionTemplate += escape(text.slice(pos))
    return new CombinatorialGeneratedExpressionFactory(
      expressionTemplate,
      parameterTypeCombinations
    ).generateExpressions()
  }

  /**
   * @deprecated
   */
  public generateExpression(text: string): GeneratedExpression {
    return util.deprecate(
      () => this.generateExpressions(text)[0],
      'CucumberExpressionGenerator.generateExpression: Use CucumberExpressionGenerator.generateExpressions instead'
    )()
  }

  private createParameterTypeMatchers(text: string): ParameterTypeMatcher[] {
    let parameterMatchers: ParameterTypeMatcher[] = []
    for (const parameterType of this.parameterTypes()) {
      if (parameterType.useForSnippets) {
        parameterMatchers = parameterMatchers.concat(
          CucumberExpressionGenerator.createParameterTypeMatchers2(parameterType, text)
        )
      }
    }
    return parameterMatchers
  }

  private static createParameterTypeMatchers2(
    parameterType: ParameterType<any>,
    text: string
  ): ParameterTypeMatcher[] {
    // TODO: [].map
    const result = []
    for (const regexp of parameterType.regexpStrings) {
      result.push(new ParameterTypeMatcher(parameterType, regexp, text))
    }
    return result
  }
}

function escape(s: string): string {
  return s
    .replace(/%/g, '%%') // for util.format
    .replace(/\(/g, '\\(')
    .replace(/{/g, '\\{')
    .replace(/\//g, '\\/')
}

module.exports = CucumberExpressionGenerator
