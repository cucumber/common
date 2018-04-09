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
    return this._transform.apply(thisObj, groupValues)
  }
}

function stringArray(regexps) {
  const array = Array.isArray(regexps) ? regexps : [regexps]
  return array.map(r => (typeof r === 'string' ? r : regexpSource(r)))
}

function regexpSource(regexp) {
  const flags = regexpFlags(regexp)

  for (const flag of ['g', 'i', 'm', 'y']) {
    if (flags.indexOf(flag) !== -1)
      throw new CucumberExpressionError(
        `ParameterType Regexps can't use flag '${flag}'`
      )
  }
  return regexp.source
}

// Backport RegExp.flags for Node 4.x
// https://github.com/nodejs/node/issues/8390
//
// For some strange reason this is not needed for
// `./mocha dist/test`, but it is needed for
// `./mocha dist/test/parameter_type_test.js`
function regexpFlags(regexp) {
  let flags = regexp.flags
  if (flags === undefined) {
    flags = ''
    if (regexp.ignoreCase) flags += 'i'
    if (regexp.global) flags += 'g'
    if (regexp.multiline) flags += 'm'
  }
  return flags
}

module.exports = ParameterType
