class Argument {
  constructor(offset, value, parameter) {
    this._offset = offset
    this._value = value
    this._parameter = parameter
  }

  get offset() {
    return this._offset
  }

  get value() {
    return this._value
  }

  get transformedValue() {
    return this._parameter.transform(this._value)
  }
}

module.exports = Argument
