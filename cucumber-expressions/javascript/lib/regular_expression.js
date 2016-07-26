const matchArguments = require('./match_arguments')

class RegularExpression {
  constructor(regexp, transformLookup) {
    this.regexp = regexp
    this.transforms = []

    const CAPTURE_GROUP_PATTERN = /\(([^(]+)\)/g

    let match
    let index = 0

    while ((match = CAPTURE_GROUP_PATTERN.exec(regexp.source)) !== null) {
      const captureGroupPattern = match[1]

      let transform = transformLookup.lookupByCaptureGroupRegexp(captureGroupPattern)
      if (!transform) transform = transformLookup.lookup('string')
      this.transforms.push(transform)

      const captureRegexp = `(${transform.captureGroupRegexp})`
      index = CAPTURE_GROUP_PATTERN.lastIndex // TODO: not standard - use match.index?
    }
  }

  match(text) {
    return matchArguments(this.regexp, text, this.transforms)
  }
}

module.exports = RegularExpression
