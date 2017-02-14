class Parameter {
  constructor(typeName, constructorFunction, captureGroupRegexps, transform) {
    this._typeName = typeName
    this._constructorFunction = constructorFunction
    this._captureGroupRegexps = (typeof captureGroupRegexps == 'string') ? [captureGroupRegexps] : captureGroupRegexps
    this._transform = transform
  }

  get typeName() {
    return this._typeName
  }

  get constructorFunction() {
    return this._constructorFunction
  }

  get captureGroupRegexps() {
    return this._captureGroupRegexps
  }

  transform(string) {
    return this._transform(string)
  }
}

module.exports = Parameter
