const Parameter = require('./parameter_type')

class ParameterTypeRegistry {
  constructor() {
    this._parameterTypesByTypeName = new Map()
    this._parameterTypesByRegexp = new Map()
    this._parameterTypesByConstructorName = new Map()

    const INTEGER_REGEXPS = [/-?\d+/, /\d+/]
    const FLOAT_REGEXP = /-?\d*\.?\d+/

    this._definePredefinedParameterType(new Parameter('int', Number, INTEGER_REGEXPS, parseInt))
    this._definePredefinedParameterType(new Parameter('float', Number, FLOAT_REGEXP, parseFloat))
  }

  get parameterTypes() {
    return this._parameterTypesByTypeName.values()
  }

  lookupByType(type) {
    if (typeof type === 'function') {
      return this.lookupByFunction(type)
    } else if (typeof type === 'string') {
      return this.lookupByTypeName(type)
    } else {
      throw new Error(`Type must be string or function, but was ${type} of type ${typeof type}`)
    }
  }

  lookupByFunction(fn) {
    if (fn.name) {
      const prefix = fn.name[0]
      const looksLikeConstructor = prefix.toUpperCase() === prefix

      let parameter
      if (looksLikeConstructor) {
        parameter = this._parameterTypesByConstructorName.get(fn.name)
      }
      if (!parameter) {
        const factory = s => {
          if (looksLikeConstructor) {
            return new fn(s)
          } else {
            return fn(s)
          }
        }
        return this.createAnonymousLookup(factory)
      } else {
        return parameter
      }
    } else {
      return this.createAnonymousLookup(fn)
    }
  }

  lookupByTypeName(typeName) {
    return this._parameterTypesByTypeName.get(typeName)
  }

  lookupByRegexp(regexp) {
    return this._parameterTypesByRegexp.get(regexp)
  }

  createAnonymousLookup(fn) {
    return new Parameter(null, null, [".+"], fn)
  }

  defineParameterType(parameterType) {
    this._defineParameterType(parameterType, true)
  }

  _definePredefinedParameterType(parameterType) {
    this._defineParameterType(parameterType, false)
  }

  _defineParameterType(parameterType, checkConflicts) {
    set(this._parameterTypesByConstructorName, parameterType.constructorFunction.name, parameterType, 'constructor', checkConflicts)
    set(this._parameterTypesByTypeName, parameterType.name, parameterType, 'type name', checkConflicts)

    for (const regexp of parameterType.regexps) {
      set(this._parameterTypesByRegexp, regexp, parameterType, 'regexp', checkConflicts)
    }
  }
}

function set(map, key, value, prop, checkConflicts) {
  if(checkConflicts && map.has(key))
    throw new Error(`There is already a parameter with ${prop} ${key}`)
  map.set(key, value)
}

module.exports = ParameterTypeRegistry
