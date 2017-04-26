class ParameterType {
  static compare(pt1, pt2) {
    if (pt1.isPreferential && !pt2.isPreferential) return -1
    if (pt2.isPreferential && !pt1.isPreferential) return 1
    return pt1.name.localeCompare(pt2.name)
  }

  /**
   * @param name {String} the name of the type
   * @param constructorFunction {Function} the prototype (constructor) of the type. May be null.
   * @param regexps {Array.<RegExp>,RegExp,Array.<String>,String} that matches the type
   * @param isPreferential {boolean} true if this is a preferential type.
   * @param transform {Function} function transforming string to another type. May be null.
   */
  constructor(name, constructorFunction, regexps, isPreferential, transform) {
    this._name = name
    this._constructorFunction = constructorFunction
    this._regexps = stringArray(regexps)
    this._isPreferential = isPreferential
    this._transform = transform
  }

  get name() {
    return this._name
  }

  get constructorFunction() {
    return this._constructorFunction
  }

  get regexps() {
    return this._regexps
  }

  get isPreferential() {
    return this._isPreferential
  }

  transform(string) {
    return this._transform ? this._transform(string) : string
  }
}

function stringArray(regexps) {
  const array = Array.isArray(regexps) ? regexps : [regexps]
  return array.map(r => typeof r === 'string' ? r : r.source)
}

module.exports = ParameterType
