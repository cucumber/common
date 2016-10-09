class TransformMatcher {

  constructor(transform, captureGroupRegexp, text, matchPosition) {
    this._transform = transform
    this._captureGroupRegexp = captureGroupRegexp
    this._text = text
    this._matchPosition = matchPosition || 0

    const regexp = new RegExp(`(${captureGroupRegexp})`)
    this._match = regexp.exec(text.slice(this._matchPosition))
  }

  get transform() {
    return this._transform
  }

  advanceTo(newMatchPosition) {
    return new TransformMatcher(this._transform, this._captureGroupRegexp, this._text, newMatchPosition)
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

export default TransformMatcher
