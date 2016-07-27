const Transform = require('./transform')

class TransformLookup {
  constructor() {
    this._transformsByTypeName = new Map()
    this._transformsByCaptureGroupRegexp = new Map()
    this._transformsByConstructorName = new Map()

    const FIXNUM_REGEXPS = ["-?\\d+", "\\d+"]
    const FLOATING_POINT_REGEXPS = ["-?\\d*\\.?\\d+"]
    const STRING_REGEXPS = [".+"]

    this.addTransform(new Transform(['int'], Number, FIXNUM_REGEXPS, parseInt))
    this.addTransform(new Transform(['float'], Number, FLOATING_POINT_REGEXPS, parseFloat))
    this.addTransform(new Transform(['string'], String, STRING_REGEXPS, s => s))
  }

  lookupByConstructor(constructor) {
    return this._transformsByConstructorName.get(constructor.name)
  }

  lookupByTypeName(typeName) {
    return this._transformsByTypeName.get(typeName)
  }

  lookupByCaptureGroupRegexp(captureGroupRegexp) {
    return this._transformsByCaptureGroupRegexp.get(captureGroupRegexp)
  }

  addTransform(transform) {
    this._transformsByConstructorName.set(transform.constructorFunction.name, transform)

    transform.typeNames.forEach(typeName => {
      this._transformsByTypeName.set(typeName, transform)
    })

    transform.captureGroupRegexps.forEach(captureGroupRegexp => {
      this._transformsByCaptureGroupRegexp.set(captureGroupRegexp, transform)
    })
  }
}

module.exports = TransformLookup
