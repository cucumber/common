const { CucumberExpressionError } = require('./errors')

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
    useForSnippets,
    preferForRegexpMatch
  ) {
    if (typeof transform !== 'function')
      throw new Error('transform must be a function')
    if (useForSnippets === undefined)
      throw new Error('useForSnippets must be specified')
    this._name = name
    this._regexps = stringArray(regexps)
    this._constructorFunction = constructorFunction
    this._transform = transform
    this._useForSnippets = useForSnippets
    this._preferForRegexpMatch = preferForRegexpMatch
  }

  get name() {
    return this._name
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

  transform(groupValues) {
    if (this._transform.length === 1) {
      // transform function with arity 1.
      const nonNullGroupValues = groupValues.filter(
        v => v !== null && v !== undefined
      )
      if (nonNullGroupValues.length >= 2)
        throw new CucumberExpressionError(
          `Single transformer unexpectedly matched 2 values - "${nonNullGroupValues[0]}" and "${nonNullGroupValues[1]}"`
        )
      return this._transform(nonNullGroupValues[0])
    }

    return this._transform.apply(null, groupValues)
  }
}

function stringArray(regexps) {
  const array = Array.isArray(regexps) ? regexps : [regexps]
  return array.map(r => (typeof r === 'string' ? r : r.source))
}

module.exports = ParameterType
