class ParameterType {
  static compare(pt1, pt2) {
    if (pt1.preferForRegexpMatch && !pt2.preferForRegexpMatch) return -1
    if (pt2.preferForRegexpMatch && !pt1.preferForRegexpMatch) return 1
    return pt1.name.localeCompare(pt2.name)
  }

  /**
   * @param name {String} the name of the type
   * @param regexps {Array.<RegExp>,RegExp,Array.<String>,String} that matches the type
   * @param constructorFunction {Function} the prototype (constructor) of the type. May be null.
   * @param transform {Function} function transforming string to another type. May be null.
   * @param preferForRegexpMatch {boolean} true if this is a preferential type.
   * @param useForSnippets {boolean} true if this should be used for snippets.
   */
  constructor(
    name,
    regexps,
    constructorFunction,
    transform,
    preferForRegexpMatch,
    useForSnippets
  ) {
    if (useForSnippets === undefined)
      throw new Error('useForSnippets must be specified')
    this._name = name
    this._regexps = stringArray(regexps)
    this._constructorFunction = constructorFunction
    this._transform = transform
    this._preferForRegexpMatch = preferForRegexpMatch
    this._useForSnippets = useForSnippets
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

  get preferForRegexpMatch() {
    return this._preferForRegexpMatch
  }

  get useForSnippets() {
    return this._useForSnippets
  }

  transform(string) {
    return this._transform ? this._transform(string) : string
  }
}

function stringArray(regexps) {
  const array = Array.isArray(regexps) ? regexps : [regexps]
  return array.map(r => (typeof r === 'string' ? r : r.source))
}

module.exports = ParameterType
