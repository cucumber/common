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
   * @param type {Function} the prototype (constructor) of the type. May be null.
   * @param transform {Function} function transforming string to another type. May be null.
   * @param useForSnippets {boolean} true if this should be used for snippets. Defaults to true.
   * @param preferForRegexpMatch {boolean} true if this is a preferential type. Defaults to false.
   */
  constructor(
    name,
    regexps,
    type,
    transform,
    useForSnippets,
    preferForRegexpMatch
  ) {
    if (transform === undefined) transform = s => s
    if (useForSnippets === undefined) useForSnippets = true
    if (preferForRegexpMatch === undefined) preferForRegexpMatch = false
    this._name = name
    this._regexps = stringArray(regexps)
    this._type = type
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

  get type() {
    return this._type
  }

  get preferForRegexpMatch() {
    return this._preferForRegexpMatch
  }

  get useForSnippets() {
    return this._useForSnippets
  }

  transform(thisObj, groupValues) {
    let args
    if (this._transform.length === 1) {
      // transform function with arity 1.
      const nonNullGroupValues = groupValues.filter(
        v => v !== null && v !== undefined
      )
      if (nonNullGroupValues.length >= 2)
        throw new CucumberExpressionError(
          `Single transformer unexpectedly matched 2 values - "${
            nonNullGroupValues[0]
          }" and "${nonNullGroupValues[1]}"`
        )
      args = [nonNullGroupValues[0]]
    } else {
      args = groupValues
    }

    return this._transform.apply(thisObj, args)
  }
}

function stringArray(regexps) {
  const array = Array.isArray(regexps) ? regexps : [regexps]
  return array.map(r => (typeof r === 'string' ? r : regexpSource(r)))
}

function regexpSource(regexp) {
  for (const flag of ['g', 'i', 'm', 'y']) {
    if (regexp.flags.indexOf(flag) !== -1)
      throw new CucumberExpressionError(
        `ParameterType Regexps can't use flag '${flag}'`
      )
  }
  return regexp.source
}

module.exports = ParameterType
