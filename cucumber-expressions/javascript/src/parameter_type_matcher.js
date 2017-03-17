class ParameterTypeMatcher {

  constructor(parameter, regexp, text, matchPosition) {
    this._parameterType = parameter
    this._regexp = regexp
    this._text = text
    this._matchPosition = matchPosition || 0

    const captureGroupRegexp = new RegExp(`(${regexp})`)
    this._match = captureGroupRegexp.exec(text.slice(this._matchPosition))
  }

  get parameterType() {
    return this._parameterType
  }

  advanceTo(newMatchPosition) {
    return new ParameterTypeMatcher(this._parameterType, this._regexp, this._text, newMatchPosition)
  }

  get find() {
    return this._match
  }

  get start() {
    return this._matchPosition + this._match.index
  }

  get group() {
    return this._match[1]
  }

  static compare(a, b) {
    const posComparison = a.start - b.start
    if (posComparison != 0) return posComparison
    const lengthComparison = b.group.length - a.group.length
    if (lengthComparison != 0) return lengthComparison
    return 0
  }
}

module.exports = ParameterTypeMatcher
