const ParameterType = require('./parameter_type')
const CucumberExpressionGenerator = require('./cucumber_expression_generator.js')
const {
  CucumberExpressionError,
  AmbiguousParameterTypeError,
} = require('./errors')

const INTEGER_REGEXPS = [/-?\d+/, /\d+/]
const FLOAT_REGEXP = /-?\d*\.?\d+/

class ParameterTypeRegistry {
  constructor() {
    this._parameterTypeByTypeName = new Map()
    this._parameterTypesByConstructorName = new Map()
    this._parameterTypesByRegexp = new Map()

    this.defineParameterType(
      new ParameterType('int', Number, INTEGER_REGEXPS, true, parseInt)
    )
    this.defineParameterType(
      new ParameterType('float', Number, FLOAT_REGEXP, false, parseFloat)
    )
  }

  get parameterTypes() {
    return this._parameterTypeByTypeName.values()
  }

  lookupByType(type) {
    if (typeof type === 'function') {
      return this._lookupByFunction(type)
    } else if (typeof type === 'string') {
      return this.lookupByTypeName(type)
    } else {
      throw new Error(
        `Type must be string or function, but was ${type} of type ${typeof type}`
      )
    }
  }

  _lookupByFunction(fn) {
    if (fn.name) {
      const looksLikeCtor = looksLikeConstructor(fn)

      let parameterType
      if (looksLikeCtor) {
        parameterType = this.lookupByConstructorName(fn)
      }
      if (!parameterType) {
        const factory = s => {
          if (looksLikeCtor) {
            return new fn(s)
          } else {
            return fn(s)
          }
        }
        return this.createAnonymousLookup(factory)
      } else {
        return parameterType
      }
    } else {
      return this.createAnonymousLookup(fn)
    }
  }

  lookupByConstructorName(fn, text) {
    const parameterTypes = this._parameterTypesByConstructorName.get(fn.name)
    if (!parameterTypes) return null
    if (parameterTypes.length > 1 && !parameterTypes[0].isPreferential) {
      const generatedExpressions = new CucumberExpressionGenerator(
        this
      ).generateExpressions(text)
      throw new AmbiguousParameterTypeError.forConstructor(
        fn.name,
        parameterTypes,
        generatedExpressions
      )
    }
    return parameterTypes[0]
  }

  lookupByTypeName(typeName) {
    return this._parameterTypeByTypeName.get(typeName)
  }

  lookupByRegexp(parameterTypeRegexp, regexp, text) {
    const parameterTypes = this._parameterTypesByRegexp.get(parameterTypeRegexp)
    if (!parameterTypes) return null
    if (parameterTypes.length > 1 && !parameterTypes[0].isPreferential) {
      // We don't do this check on insertion because we only want to restrict
      // ambiguiuty when we look up by Regexp. Users of CucumberExpression should
      // not be restricted.
      const generatedExpressions = new CucumberExpressionGenerator(
        this
      ).generateExpressions(text)
      throw new AmbiguousParameterTypeError.forRegExp(
        parameterTypeRegexp,
        regexp,
        parameterTypes,
        generatedExpressions
      )
    }
    return parameterTypes[0]
  }

  createAnonymousLookup(fn) {
    return new ParameterType(null, null, ['.+'], false, fn)
  }

  defineParameterType(parameterType) {
    set(
      this._parameterTypeByTypeName,
      parameterType.name,
      parameterType,
      'type name'
    )

    if (looksLikeConstructor(parameterType.constructorFunction)) {
      setUnlessPreferentialClash(
        this._parameterTypesByConstructorName,
        parameterType.constructorFunction.name,
        parameterType,
        (key, existingParameterType) => {
          return (
            'There can only be one preferential parameter type per constructor. ' +
            `The constructor ${key} is used for two preferential parameter types, {${existingParameterType.name}} and {${parameterType.name}}`
          )
        }
      )
    }

    for (const parameterTypeRegexp of parameterType.regexps) {
      setUnlessPreferentialClash(
        this._parameterTypesByRegexp,
        parameterTypeRegexp,
        parameterType,
        (key, existingParameterType) => {
          return (
            'There can only be one preferential parameter type per regexp. ' +
            `The regexp ${key} is used for two preferential parameter types, {${existingParameterType.name}} and {${parameterType.name}}`
          )
        }
      )
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
    throw new Error(`There is already a parameter with ${prop} ${key}`)
  map.set(key, value)
}

function setUnlessPreferentialClash(map, key, parameterType, errorMessage) {
  if (!map.has(key)) {
    map.set(key, [])
  }
  const parameterTypes = map.get(key)
  const existingParameterType = parameterTypes[0]
  if (
    parameterTypes.length > 0 &&
    existingParameterType.isPreferential &&
    parameterType.isPreferential
  ) {
    throw new CucumberExpressionError(errorMessage(key, existingParameterType))
  }
  if (!parameterTypes.includes(parameterType)) {
    parameterTypes.push(parameterType)
    map.set(key, parameterTypes.sort(ParameterType.compare))
  }
}

module.exports = ParameterTypeRegistry
