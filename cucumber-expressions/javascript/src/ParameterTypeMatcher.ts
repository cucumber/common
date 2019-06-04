import ParameterType from './ParameterType'

export default class ParameterTypeMatcher {
  private readonly match: RegExpExecArray

  constructor(
    public readonly parameterType: ParameterType<any>,
    private readonly regexpString: string,
    private readonly text: string,
    private matchPosition: number = 0
  ) {
    const captureGroupRegexp = new RegExp(`(${regexpString})`)
    this.match = captureGroupRegexp.exec(text.slice(this.matchPosition))
  }

  public advanceTo(newMatchPosition: number) {
    for (
      let advancedPos = newMatchPosition;
      advancedPos < this.text.length;
      advancedPos++
    ) {
      const matcher = new ParameterTypeMatcher(
        this.parameterType,
        this.regexpString,
        this.text,
        advancedPos
      )

      if (matcher.find) {
        return matcher
      }
    }

    return new ParameterTypeMatcher(
      this.parameterType,
      this.regexpString,
      this.text,
      this.text.length
    )
  }

  get find() {
    return this.match && this.group !== ''
  }

  get start() {
    return this.matchPosition + this.match.index
  }

  get group() {
    return this.match[0]
  }

  public static compare(a: ParameterTypeMatcher, b: ParameterTypeMatcher) {
    const posComparison = a.start - b.start
    if (posComparison !== 0) {
      return posComparison
    }
    const lengthComparison = b.group.length - a.group.length
    if (lengthComparison !== 0) {
      return lengthComparison
    }
    return 0
  }
}

module.exports = ParameterTypeMatcher
