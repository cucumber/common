const ParameterType = require('./parameter_type')
const CucumberExpressionGenerator = require('./cucumber_expression_generator.js')
const {
  CucumberExpressionError,
  AmbiguousParameterTypeError,
} = require('./errors')

const INTEGER_REGEXPS = [/-?\d+/, /\d+/]
const FLOAT_REGEXP = /-?\d*\.?\d+/
const WORD_REGEXP = /\w+/

class Integer extends Number {}
class Float extends Number {}

class ParameterTypeRegistry {
  constructor() {
    this._parameterTypeByName = new Map()
    this._parameterTypeByConstructorName = new Map()
    this._parameterTypesByRegexp = new Map()

    this.defineParameterType(
      new ParameterType('int', INTEGER_REGEXPS, Integer, parseInt, true, true)
    )
    this.defineParameterType(
      new ParameterType('float', FLOAT_REGEXP, Float, parseFloat, false, true)
    )
    this.defineParameterType(
      new ParameterType('word', WORD_REGEXP, String, s => s, false, false)
    )
  }

  get parameterTypes() {
    return this._parameterTypeByName.values()
  }

  lookupByType(type) {
    return this._parameterTypeByConstructorName.get(type.name)
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
    set(this._parameterTypeByName, parameterType.name, parameterType, 'name')

    if (looksLikeConstructor(parameterType.constructorFunction)) {
      set(
        this._parameterTypeByConstructorName,
        parameterType.constructorFunction.name,
        parameterType,
        'type'
      )
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
            `The regexp /${parameterTypeRegexp}/ is used for two preferential parameter types, {${existingParameterType.name}} and {${parameterType.name}}`
        )
      }
      if (!parameterTypes.includes(parameterType)) {
        parameterTypes.push(parameterType)
        this._parameterTypesByRegexp.set(
          parameterTypeRegexp,
          parameterTypes.sort(ParameterType.compare)
        )
      }
    }
  }
}

function looksLikeConstructor(fn) {
  if (typeof fn !== 'function') return false
  if (!fn.name) return false
  const prefix = fn.name[0]
  return prefix.toUpperCase() === prefix
}

function set(map, key, value, prop) {
  if (map.has(key))
    throw new Error(`There is already a parameter type with ${prop} ${key}`)
  map.set(key, value)
}

module.exports = ParameterTypeRegistry
