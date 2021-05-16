import CucumberExpressionError from './CucumberExpressionError'

const ILLEGAL_PARAMETER_NAME_PATTERN = /([[\]()$.|?*+])/
const UNESCAPE_PATTERN = () => /(\\([[$.|?*+\]]))/g

export default class ParameterType<T> {
  private transformFn: (...match: readonly string[]) => T

  public static compare(pt1: ParameterType<any>, pt2: ParameterType<any>) {
    if (pt1.preferForRegexpMatch && !pt2.preferForRegexpMatch) {
      return -1
    }
    if (pt2.preferForRegexpMatch && !pt1.preferForRegexpMatch) {
      return 1
    }
    return pt1.name.localeCompare(pt2.name)
  }

  public static checkParameterTypeName(typeName: string) {
    if (!this.isValidParameterTypeName(typeName)) {
      throw new CucumberExpressionError(
        `Illegal character in parameter name {${typeName}}. Parameter names may not contain '{', '}', '(', ')', '\\' or '/'`
      )
    }
  }

  public static isValidParameterTypeName(typeName: string) {
    const unescapedTypeName = typeName.replace(UNESCAPE_PATTERN(), '$2')
    return !unescapedTypeName.match(ILLEGAL_PARAMETER_NAME_PATTERN)
  }

  public regexpStrings: readonly string[]

  /**
   * @param name {String} the name of the type
   * @param regexps {Array.<RegExp>,RegExp,Array.<String>,String} that matches the type
   * @param type {Function} the prototype (constructor) of the type. May be null.
   * @param transform {Function} function transforming string to another type. May be null.
   * @param useForSnippets {boolean} true if this should be used for snippets. Defaults to true.
   * @param preferForRegexpMatch {boolean} true if this is a preferential type. Defaults to false.
   */
  constructor(
    public readonly name: string,
    regexps: readonly RegExp[] | readonly string[] | RegExp | string,
    private readonly type: any,
    transform: (...match: string[]) => T,
    public readonly useForSnippets: boolean,
    public readonly preferForRegexpMatch: boolean
  ) {
    if (transform === undefined) {
      transform = (s) => s as unknown as T
    }
    if (useForSnippets === undefined) {
      this.useForSnippets = true
    }
    if (preferForRegexpMatch === undefined) {
      this.preferForRegexpMatch = false
    }

    if (name) {
      ParameterType.checkParameterTypeName(name)
    }

    this.regexpStrings = stringArray(regexps)
    this.transformFn = transform
  }

  public transform(thisObj: any, groupValues: string[]) {
    return this.transformFn.apply(thisObj, groupValues)
  }
}

type StringOrRegexp = string | RegExp

function stringArray(regexps: readonly StringOrRegexp[] | StringOrRegexp): string[] {
  // @ts-ignore
  const array: StringOrRegexp[] = Array.isArray(regexps) ? regexps : [regexps]
  return array.map((r) => (r instanceof RegExp ? regexpSource(r) : r))
}

function regexpSource(regexp: RegExp): string {
  const flags = regexpFlags(regexp)

  for (const flag of ['g', 'i', 'm', 'y']) {
    if (flags.indexOf(flag) !== -1) {
      throw new CucumberExpressionError(`ParameterType Regexps can't use flag '${flag}'`)
    }
  }
  return regexp.source
}

// Backport RegExp.flags for Node 4.x
// https://github.com/nodejs/node/issues/8390
function regexpFlags(regexp: RegExp) {
  let flags = regexp.flags
  if (flags === undefined) {
    flags = ''
    if (regexp.ignoreCase) {
      flags += 'i'
    }
    if (regexp.global) {
      flags += 'g'
    }
    if (regexp.multiline) {
      flags += 'm'
    }
  }
  return flags
}
