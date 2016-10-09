class Transform {
  constructor(typeName, constructorFunction, captureGroupRegexps, transformer) {
    this._typeName = typeName
    this._constructorFunction = constructorFunction
    this._captureGroupRegexps = (typeof captureGroupRegexps == 'string') ? [captureGroupRegexps] : captureGroupRegexps
    this._transformer = transformer
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
    return this._transformer(string)
  }
}

export default Transform
