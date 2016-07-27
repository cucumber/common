const matchArguments = require('./match_arguments')

class RegularExpression {
  constructor(regexp, transformLookup) {
    this.regexp = regexp
    this.transforms = []

    const CAPTURE_GROUP_PATTERN = /\(([^(]+)\)/g

    let match
    while ((match = CAPTURE_GROUP_PATTERN.exec(regexp.source)) !== null) {
      const captureGroupPattern = match[1]

      let transform = transformLookup.lookupByCaptureGroupRegexp(captureGroupPattern)
      if (!transform) transform = transformLookup.lookupByTypeName('string')
      this.transforms.push(transform)

      const captureRegexp = `(${transform.captureGroupRegexp})`
    }
  }

  match(text) {
    return matchArguments(this.regexp, text, this.transforms)
  }
}

module.exports = RegularExpression
