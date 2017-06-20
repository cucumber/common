class Argument {
  constructor(groupValues, parameterType) {
    this._groupValues = groupValues
    this._parameterType = parameterType
  }

  get groups() {
    return this._groupValues
  }

  get transformedValue() {
    return this._parameterType.transform(this._groupValues)
  }
}

module.exports = Argument
