import matchArguments from './match_arguments'

class RegularExpression {
  constructor(regexp, types, transformLookup) {
    this._regexp = regexp
    this._transforms = []

    const CAPTURE_GROUP_PATTERN = /\(([^(]+)\)/g

    let typeIndex = 0
    let match
    while ((match = CAPTURE_GROUP_PATTERN.exec(regexp.source)) !== null) {
      const captureGroupPattern = match[1]
      const type = types.length <= typeIndex ? null : types[typeIndex++]

      let transform;
      if (type) {
        transform = transformLookup.lookupByType(type)
      }
      if (!transform) {
        transform = transformLookup.lookupByCaptureGroupRegexp(captureGroupPattern)
      }
      if (!transform) {
        transform = transformLookup.createAnonymousLookup(s => s)
      }
      this._transforms.push(transform)
    }
  }

  match(text) {
    return matchArguments(this._regexp, text, this._transforms)
  }

  getSource() {
    return this._regexp.toString()
  }
}

export default RegularExpression
