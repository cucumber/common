const Parameter = require('./parameter')

class ParameterRegistry {
  constructor() {
    this._parametersByTypeName = new Map()
    this._parametersByCaptureGroupRegexp = new Map()
    this._parametersByConstructorName = new Map()

    const FIXNUM_REGEXPS = ["-?\\d+", "\\d+"]
    const FLOATING_POINT_REGEXPS = ["-?\\d*\\.?\\d+"]

    this.addParameter(new Parameter('int', Number, FIXNUM_REGEXPS, parseInt))
    this.addParameter(new Parameter('float', Number, FLOATING_POINT_REGEXPS, parseFloat))
  }

  get parameters() {
    return this._parametersByTypeName.values()
  }

  lookupByType(type) {
    if (typeof type === 'function') {
      return this.lookupByFunction(type)
    } else if (typeof type === 'string') {
      return this.lookupByTypeName(type, false)
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

  lookupByTypeName(typeName, ignoreUnknownTypeName) {
    const parameter = this._parametersByTypeName.get(typeName)
    if (!parameter) {
      if (ignoreUnknownTypeName) {
        return null
      } else {
        throw new Error(`No parameter for type name "${typeName}". Registered parameters: ${Object.keys(this._parametersByTypeName)}`)
      }
    } else {
      return parameter
    }
  }

  lookupByCaptureGroupRegexp(captureGroupRegexp) {
    return this._parametersByCaptureGroupRegexp.get(captureGroupRegexp)
  }

  createAnonymousLookup(fn) {
    return new Parameter(null, null, [".+"], fn)
  }

  addParameter(parameter) {
    this._parametersByConstructorName.set(parameter.constructorFunction.name, parameter)

    this._parametersByTypeName.set(parameter.typeName, parameter)

    for (let captureGroupRegexp of parameter.captureGroupRegexps) {
      this._parametersByCaptureGroupRegexp.set(captureGroupRegexp, parameter)
    }
  }
}

module.exports = ParameterRegistry
