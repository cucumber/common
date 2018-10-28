const ParameterType = require('./parameter_type')
const CucumberExpressionGenerator = require('./cucumber_expression_generator.js')
const {
  CucumberExpressionError,
  AmbiguousParameterTypeError,
} = require('./errors')

const INTEGER_REGEXPS = [/-?\d+/, /\d+/]
const FLOAT_REGEXP = /-?\d*\.\d+/
const WORD_REGEXP = /[^\s]+/
const STRING_REGEXP = /"([^"\\]*(\\.[^"\\]*)*)"|'([^'\\]*(\\.[^'\\]*)*)'/
const ANONYMOUS_REGEXP = /.*/

class ParameterTypeRegistry {
  constructor() {
    this._parameterTypeByName = new Map()
    this._parameterTypesByRegexp = new Map()

    this.defineParameterType(
      new ParameterType(
        'int',
        INTEGER_REGEXPS,
        Number,
        s => s && parseInt(s),
        true,
        true
      )
    )
    this.defineParameterType(
      new ParameterType(
        'float',
        FLOAT_REGEXP,
        Number,
        s => s && parseFloat(s),
        true,
        false
      )
    )
    this.defineParameterType(
      new ParameterType('word', WORD_REGEXP, String, s => s, false, false)
    )
    this.defineParameterType(
      new ParameterType(
        'string',
        STRING_REGEXP,
        String,
        s => s.replace(/\\"/g, '"').replace(/\\'/g, "'"),
        true,
        false
      )
    )
    this.defineParameterType(
      new ParameterType('', ANONYMOUS_REGEXP, String, s => s, false, true)
    )
  }

  get parameterTypes() {
    return this._parameterTypeByName.values()
  }

  lookupByTypeName(typeName) {
    return this._parameterTypeByName.get(typeName)
  }

  lookupByRegexp(parameterTypeRegexp, expressionRegexp, text) {
    const parameterTypes = this._parameterTypesByRegexp.get(parameterTypeRegexp)
    if (!parameterTypes) return null
    if (parameterTypes.length > 1 && !parameterTypes[0].preferForRegexpMatch) {
      // We don't do this check on insertion because we only want to restrict
      // ambiguiuty when we look up by Regexp. Users of CucumberExpression should
      // not be restricted.
      const generatedExpressions = new CucumberExpressionGenerator(
        this
      ).generateExpressions(text)
      throw new AmbiguousParameterTypeError.forRegExp(
        parameterTypeRegexp,
        expressionRegexp,
        parameterTypes,
        generatedExpressions
      )
    }
    return parameterTypes[0]
  }

  defineParameterType(parameterType) {
    if (parameterType.name !== undefined) {
      if (this._parameterTypeByName.has(parameterType.name))
        if (parameterType.name.length === 0)
          throw new Error(
            `The anonymous parameter type has already been defined`
          )
        else
          throw new Error(
            `There is already a parameter type with name ${parameterType.name}`
          )
      this._parameterTypeByName.set(parameterType.name, parameterType)
    }

    for (const parameterTypeRegexp of parameterType.regexps) {
      if (!this._parameterTypesByRegexp.has(parameterTypeRegexp)) {
        this._parameterTypesByRegexp.set(parameterTypeRegexp, [])
      }
      const parameterTypes = this._parameterTypesByRegexp.get(
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
            `The regexp /${parameterTypeRegexp}/ is used for two preferential parameter types, {${
              existingParameterType.name
            }} and {${parameterType.name}}`
        )
      }
      if (parameterTypes.indexOf(parameterType) === -1) {
        parameterTypes.push(parameterType)
        this._parameterTypesByRegexp.set(
          parameterTypeRegexp,
          parameterTypes.sort(ParameterType.compare)
        )
      }
    }
  }
}

module.exports = ParameterTypeRegistry
