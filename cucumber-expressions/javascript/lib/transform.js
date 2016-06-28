class Transform {
  constructor(typeName, captureRegexp, transformer) {
    this._typeName = typeName
    this._captureRegexp = captureRegexp
    this._transformer = transformer
  }

  get typeName() { return this._typeName}
  get captureGroupRegexp() { return this._captureRegexp }

  transform(string) { return this._transformer(string) }
}

module.exports = Transform