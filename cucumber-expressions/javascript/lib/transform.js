class Transform {
  constructor(typeName, captureRegexps, transformer) {
    this._typeName = typeName
    this._captureRegexps = captureRegexps
    this._transformer = transformer
  }

  get typeName() { return this._typeName}
  get captureGroupRegexps() { return this._captureRegexps }

  transform(string) { return this._transformer(string) }
}

module.exports = Transform
