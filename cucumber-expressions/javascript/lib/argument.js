class Argument {
  constructor(offset, value, transformedValue) {
    this._offset = offset
    this._value = value
    this._transformedValue = transformedValue
  }

  get offset() {
    return this._offset
  }

  get value() {
    return this._value
  }

  get transformedValue() {
    return this._transformedValue
  }
}

module.exports = Argument