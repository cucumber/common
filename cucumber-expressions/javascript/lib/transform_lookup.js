const Transform = require('./transform')

class TransformLookup {
  constructor() {
    this._transformsByTypeName = new Map()
    this._transformsByCaptureGroupRegexp = new Map()
    this._transformsByConstructorName = new Map()

    const FIXNUM_REGEXPS = ["-?\\d+", "\\d+"]
    const FLOATING_POINT_REGEXPS = ["-?\\d*\\.?\\d+"]

    this.addTransform(new Transform('int', Number, FIXNUM_REGEXPS, parseInt))
    this.addTransform(new Transform('float', Number, FLOATING_POINT_REGEXPS, parseFloat))
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

      let transform
      if (looksLikeConstructor) {
        transform = this._transformsByConstructorName.get(fn.name)
      }
      if (!transform) {
        const factory = s => {
          if (looksLikeConstructor) {
            return new fn(s)
          } else {
            return fn(s)
          }
        }
        return this.createAnonymousLookup(factory)
      } else {
        return transform
      }
    } else {
      return this.createAnonymousLookup(fn)
    }
  }

  lookupByTypeName(s, ignoreUnknownTypeName) {
    const transform = this._transformsByTypeName.get(s)
    if (!transform) {
      if (ignoreUnknownTypeName) {
        return null
      } else {
        throw new Error(`No transformer for type name "${s}"`)
      }
    } else {
      return transform
    }
  }

  lookupByCaptureGroupRegexp(captureGroupRegexp) {
    return this._transformsByCaptureGroupRegexp.get(captureGroupRegexp)
  }

  createAnonymousLookup(fn) {
    return new Transform(null, null, [".+"], fn)
  }

  addTransform(transform) {
    this._transformsByConstructorName.set(transform.constructorFunction.name, transform)

    this._transformsByTypeName.set(transform.typeName, transform)

    transform.captureGroupRegexps.forEach(captureGroupRegexp => {
      this._transformsByCaptureGroupRegexp.set(captureGroupRegexp, transform)
    })
  }
}

module.exports = TransformLookup
