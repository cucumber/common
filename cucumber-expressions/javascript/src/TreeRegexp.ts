import GroupBuilder from './GroupBuilder'
// @ts-ignore
import Regex from 'becke-ch--regex--s0-0-v1--base--pl--lib'
import RegexExecArray from './RegexExecArray'
import Group from './Group'

export default class TreeRegexp {
  public regexp: RegExp
  private regex: any
  public groupBuilder: GroupBuilder

  constructor(regexp: RegExp | string) {
    this.regexp = 'string' === typeof regexp ? new RegExp(regexp) : regexp
    this.regex = new Regex(this.regexp.source, this.regexp.flags)
    this.groupBuilder = TreeRegexp.createGroupBuilder(this.regex)
  }

  private static createGroupBuilder(regexp: RegExp) {
    const source = regexp.source
    const stack: GroupBuilder[] = [new GroupBuilder()]
    const groupStartStack: number[] = []
    let escaping = false
    let charClass = false

    for (let i = 0; i < source.length; i++) {
      const c = source[i]
      if (c === '[' && !escaping) {
        charClass = true
      } else if (c === ']' && !escaping) {
        charClass = false
      } else if (c === '(' && !escaping && !charClass) {
        groupStartStack.push(i)
        const nonCapturing = TreeRegexp.isNonCapturing(source, i)
        const groupBuilder = new GroupBuilder()
        if (nonCapturing) {
          groupBuilder.setNonCapturing()
        }
        stack.push(groupBuilder)
      } else if (c === ')' && !escaping && !charClass) {
        const gb = stack.pop()
        const groupStart = groupStartStack.pop()
        if (gb.capturing) {
          gb.source = source.substring(groupStart + 1, i)
          stack[stack.length - 1].add(gb)
        } else {
          gb.moveChildrenTo(stack[stack.length - 1])
        }
      }
      escaping = c === '\\' && !escaping
    }
    return stack.pop()
  }

  private static isNonCapturing(source: string, i: number): boolean {
    // Regex is valid. Bounds check not required.
    if (source[i + 1] != '?') {
      // (X)
      return false
    }
    if (source[i + 2] != '<') {
      // (?:X)
      // (?=X)
      // (?!X)
      return true
    }
    // (?<=X) or (?<!X) else (?<name>X)
    return source[i + 3] == '=' || source[i + 3] == '!'
  }

  public match(s: string): Group | null {
    const match: RegexExecArray = this.regex.exec(s)
    if (!match) {
      return null
    }
    let groupIndex = 0
    const nextGroupIndex = () => groupIndex++
    return this.groupBuilder.build(match, nextGroupIndex)
  }
}
