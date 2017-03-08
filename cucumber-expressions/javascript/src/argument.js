class Argument {
  constructor(offset, value, parameterType) {
    this._offset = offset
    this._value = value
    this._parameterType = parameterType
  }

  get offset() {
    return this._offset
  }

  get value() {
    return this._value
  }

  get transformedValue() {
    return this._parameterType.transform(this._value)
  }
}

module.exports = Argument
