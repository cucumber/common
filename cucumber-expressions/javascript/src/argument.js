class Argument {
  constructor(groups, parameterType) {
    this._groups = groups
    this._parameterType = parameterType
  }

  get groups() {
    return this._groups
  }

  get transformedValue() {
    return this._parameterType.transform(this._groups)
  }
}

module.exports = Argument
