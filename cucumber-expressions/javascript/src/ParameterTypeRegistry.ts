import ParameterType from './ParameterType'

import CucumberExpressionGenerator from './CucumberExpressionGenerator'
import {AmbiguousParameterTypeError, CucumberExpressionError} from './Errors'

export default class ParameterTypeRegistry {
  public static readonly INTEGER_REGEXPS = [/-?\d+/, /\d+/]
  public static readonly FLOAT_REGEXP = /(?=.*\d.*)[-+]?\d*(?:\.(?=\d.*))?\d*(?:\d+[E][+\-]?\d+)?/
  public static readonly WORD_REGEXP = /[^\s]+/
  public static readonly STRING_REGEXP = /"([^"\\]*(\\.[^"\\]*)*)"|'([^'\\]*(\\.[^'\\]*)*)'/
  public static readonly ANONYMOUS_REGEXP = /.*/

  private readonly parameterTypeByName = new Map<string, ParameterType<any>>()
  private readonly parameterTypesByRegexp = new Map<string, Array<ParameterType<any>>>()

  constructor() {
    this.defineParameterType(
      new ParameterType(
        'int',
        ParameterTypeRegistry.INTEGER_REGEXPS,
        Number,
        s => (s === undefined ? null : Number(s)),
        true,
        true
      )
    )
    this.defineParameterType(
      new ParameterType(
        'float',
        ParameterTypeRegistry.FLOAT_REGEXP,
        Number,
        s => (s === undefined ? null : parseFloat(s)),
        true,
        false
      )
    )
    this.defineParameterType(
      new ParameterType(
        'word',
        ParameterTypeRegistry.WORD_REGEXP,
        String,
        s => s,
        false,
        false
      )
    )
    this.defineParameterType(
      new ParameterType(
        'string',
        ParameterTypeRegistry.STRING_REGEXP,
        String,
        s => s.replace(/\\"/g, '"').replace(/\\'/g, "'"),
        true,
        false
      )
    )
    this.defineParameterType(
      new ParameterType(
        '',
        ParameterTypeRegistry.ANONYMOUS_REGEXP,
        String,
        s => s,
        false,
        true
      )
    )
  }

  get parameterTypes() {
    return this.parameterTypeByName.values()
  }

  public lookupByTypeName(typeName: string) {
    return this.parameterTypeByName.get(typeName)
  }

  public lookupByRegexp(
    parameterTypeRegexp: string,
    expressionRegexp: RegExp,
    text: string
  ): ParameterType<any> {
    const parameterTypes = this.parameterTypesByRegexp.get(parameterTypeRegexp)
    if (!parameterTypes) {
      return null
    }
    if (parameterTypes.length > 1 && !parameterTypes[0].preferForRegexpMatch) {
      // We don't do this check on insertion because we only want to restrict
      // ambiguiuty when we look up by Regexp. Users of CucumberExpression should
      // not be restricted.
      const generatedExpressions = new CucumberExpressionGenerator(
        this
      ).generateExpressions(text)
      throw AmbiguousParameterTypeError.forRegExp(
        parameterTypeRegexp,
        expressionRegexp,
        parameterTypes,
        generatedExpressions
      )
    }
    return parameterTypes[0]
  }

  public defineParameterType(parameterType: ParameterType<any>) {
    if (parameterType.name !== undefined) {
      if (this.parameterTypeByName.has(parameterType.name)) {
        if (parameterType.name.length === 0) {
          throw new Error(
            `The anonymous parameter type has already been defined`
          )
        } else {
          throw new Error(
            `There is already a parameter type with name ${parameterType.name}`
          )
        }
      }
      this.parameterTypeByName.set(parameterType.name, parameterType)
    }

    for (const parameterTypeRegexp of parameterType.regexpStrings) {
      if (!this.parameterTypesByRegexp.has(parameterTypeRegexp)) {
        this.parameterTypesByRegexp.set(parameterTypeRegexp, [])
      }
      const parameterTypes = this.parameterTypesByRegexp.get(
        parameterTypeRegexp
      )
      const existingParameterType = parameterTypes[0]
      if (
        parameterTypes.length > 0 &&
        existingParameterType.preferForRegexpMatch &&
        parameterType.preferForRegexpMatch
      ) {
        throw new CucumberExpressionError(
          'There can only be one preferential parameter type per regexp. ' +
            `The regexp /${parameterTypeRegexp}/ is used for two preferential parameter types, {${existingParameterType.name}} and {${parameterType.name}}`
        )
      }
      if (parameterTypes.indexOf(parameterType) === -1) {
        parameterTypes.push(parameterType)
        this.parameterTypesByRegexp.set(
          parameterTypeRegexp,
          parameterTypes.sort(ParameterType.compare)
        )
      }
    }
  }
}

module.exports = ParameterTypeRegistry
