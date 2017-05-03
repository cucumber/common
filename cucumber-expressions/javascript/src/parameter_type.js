class ParameterType {
  constructor(name, constructorFunction, regexps, transform) {
    this._name = name
    this._constructorFunction = constructorFunction
    this._regexps = stringArray(regexps)
    this._transform = transform
  }

  get name() {
    return this._name
  }

  get constructorFunction() {
    return this._constructorFunction
  }

  get regexps() {
    return this._regexps
  }

  transform(string) {
    return this._transform ? this._transform(string) : string
  }
}

function stringArray(regexps) {
  const array = Array.isArray(regexps) ? regexps : [regexps]
  return array.map(r => (typeof r == 'string' ? r : r.source))
}

module.exports = ParameterType
