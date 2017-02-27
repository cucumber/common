const Parameter = require('./parameter')

class ParameterRegistry {
  constructor() {
    this._parametersByTypeName = new Map()
    this._parametersByCaptureGroupRegexp = new Map()
    this._parametersByConstructorName = new Map()

    const INTEGER_REGEXPS = [/-?\d+/, /\d+/]
    const FLOAT_REGEXP = /-?\d*\.?\d+/

    this._addPredefinedParameter(new Parameter('int', Number, INTEGER_REGEXPS, parseInt))
    this._addPredefinedParameter(new Parameter('float', Number, FLOAT_REGEXP, parseFloat))
  }

  get parameters() {
    return this._parametersByTypeName.values()
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
        parameter = this._parametersByConstructorName.get(fn.name)
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
    return this._parametersByTypeName.get(typeName)
  }

  lookupByCaptureGroupRegexp(captureGroupRegexp) {
    return this._parametersByCaptureGroupRegexp.get(captureGroupRegexp)
  }

  createAnonymousLookup(fn) {
    return new Parameter(null, null, [".+"], fn)
  }

  addParameter(parameter) {
    this._addParameter(parameter, true)
  }

  _addPredefinedParameter(parameter) {
    this._addParameter(parameter, false)
  }

  _addParameter(parameter, checkConflicts) {
    set(this._parametersByConstructorName, parameter.constructorFunction.name, parameter, 'constructor', checkConflicts)
    set(this._parametersByTypeName, parameter.typeName, parameter, 'type name', checkConflicts)

    for (let captureGroupRegexp of parameter.captureGroupRegexps) {
      set(this._parametersByCaptureGroupRegexp, captureGroupRegexp, parameter, 'regexp', checkConflicts)
    }
  }
}

function set(map, key, value, prop, checkConflicts) {
  if(checkConflicts && map.has(key))
    throw new Error(`There is already a parameter with ${prop} ${key}`)
  map.set(key, value)
}

module.exports = ParameterRegistry
