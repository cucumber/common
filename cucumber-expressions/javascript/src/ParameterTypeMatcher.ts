import ParameterType from './ParameterType'
// @ts-ignore
import XRegExp from 'xregexp';

// Needed for Node8 support, should be able to remove once Node 8 reaches end of life
// (eta 2019-12-31) https://nodejs.org/en/about/releases/
const whitespacePunctuationPattern = XRegExp('\\s|\\p{P}', 'u')

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
    return this.match && this.group !== '' && this.full_word
  }

  get start() {
    return this.matchPosition + this.match.index
  }

  get full_word() {
    return this.match_start_word && this.match_end_word
  }

  get match_start_word() {
    return this.start == 0 || this.text[this.start - 1].match(whitespacePunctuationPattern)
  }

  get match_end_word() {
    const next_character_index = this.start + this.group.length
    return  next_character_index === this.text.length || this.text[next_character_index].match(whitespacePunctuationPattern)
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
