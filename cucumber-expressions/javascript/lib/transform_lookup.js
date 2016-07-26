const Transform = require('./transform')

class TransformLookup {
  constructor() {
    this._transformsByName = new Map()
    this._transformsByCaptureGroupRegexp = new Map()

    const FIXNUM_REGEXPS = ["-?\\d+", "\\d+"]
    const FLOATING_POINT_REGEXPS = ["-?\\d*\\.?\\d+"]
    const STRING_REGEXPS = [".+"]

    this.addTransform(new Transform('int', FIXNUM_REGEXPS, parseInt))
    this.addTransform(new Transform('float', FLOATING_POINT_REGEXPS, parseFloat))
    this.addTransform(new Transform('string', STRING_REGEXPS, s => s))
  }

  lookup(typeName) {
    const transform = this._transformsByName.get(typeName)
    if (!transform) throw new Error(`No transformer for type "${typeName}"`)
    return transform
  }

  lookupByCaptureGroupRegexp(captureGroupRegexp) {
    return this._transformsByCaptureGroupRegexp.get(captureGroupRegexp)
  }

  addTransform(transform) {
    this._transformsByName.set(transform.typeName, transform)
    transform.captureGroupRegexps.forEach(captureGroupRegexp => {
      this._transformsByCaptureGroupRegexp.set(captureGroupRegexp, transform)
    })
  }
}

module.exports = TransformLookup
