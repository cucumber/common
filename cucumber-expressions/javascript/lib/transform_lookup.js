const Transform = require('./transform')

class TransformLookup {
  constructor() {
    this._transformsByName = new Map()

    const FIXNUM_REGEXP = "-?\\d+"
    const FLOATING_POINT_REGEXP = "-?\\d*\\.?\\d+"
    const STRING_REGEXP = ".+"

    this._addTransform(new Transform('int', FIXNUM_REGEXP, parseInt))
    this._addTransform(new Transform('float', FLOATING_POINT_REGEXP, parseFloat))
    this._addTransform(new Transform('string', STRING_REGEXP, s => s))
  }

  lookup(typeName) {
    var transform = this._transformsByName.get(typeName)
    if (!transform) throw new Error(`No transformer for type "${typeName}"`)
    return transform
  }

  _addTransform(transform) {
    this._transformsByName.set(transform.typeName, transform)
  }
}

module.exports = TransformLookup