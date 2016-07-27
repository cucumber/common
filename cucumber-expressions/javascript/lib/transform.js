class Transform {
  constructor(typeNames, constructorFunction, captureGroupRegexps, transformer) {
    this._typeNames = typeNames
    this._constructorFunction = constructorFunction
    this._captureGroupRegexps = captureGroupRegexps
    this._transformer = transformer
  }

  get typeNames() {
    return this._typeNames
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

module.exports = Transform
