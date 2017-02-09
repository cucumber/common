class Transform {
  constructor(typeName, constructorFunction, captureGroupRegexps, transformer) {
    this._typeName = typeName
    this._constructorFunction = constructorFunction
    this._captureGroupRegexps = stringArray(captureGroupRegexps)
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

function stringArray(captureGroupRegexps) {
  const array = Array.isArray(captureGroupRegexps) ? captureGroupRegexps : [captureGroupRegexps]
  return array.map(r => typeof r == 'string' ? r : r.source)
}

module.exports = Transform
