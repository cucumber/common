import GroupBuilder from './GroupBuilder'
// @ts-ignore
import Regex from 'becke-ch--regex--s0-0-v1--base--pl--lib'
import RegexExecArray from './RegexExecArray'

export default class TreeRegexp {
  public regexp: RegExp
  private regex: any
  public groupBuilder: GroupBuilder
  constructor(regexp: RegExp | string) {
    this.regexp = 'string' === typeof regexp ? new RegExp(regexp) : regexp
    this.regex = new Regex(this.regexp.source, this.regexp.flags)

    const stack: GroupBuilder[] = [new GroupBuilder()]
    const groupStartStack: number[] = []
    let last: string = null
    let escaping = false
    let nonCapturingMaybe = false
    let charClass = false
    this.regexp.source.split('').forEach((c, n) => {
      if (c === '[' && !escaping) {
        charClass = true
      } else if (c === ']' && !escaping) {
        charClass = false
      } else if (c === '(' && !escaping && !charClass) {
        stack.push(new GroupBuilder())
        groupStartStack.push(n + 1)
        nonCapturingMaybe = false
      } else if (c === ')' && !escaping && !charClass) {
        const gb = stack.pop()
        const groupStart = groupStartStack.pop()
        if (gb.capturing) {
          gb.source = this.regexp.source.substring(groupStart, n)
          stack[stack.length - 1].add(gb)
        } else {
          gb.moveChildrenTo(stack[stack.length - 1])
        }
        nonCapturingMaybe = false
      } else if (c === '?' && last === '(') {
        nonCapturingMaybe = true
      } else if ((c === ':' || c === '!' || c === '=') && nonCapturingMaybe) {
        stack[stack.length - 1].setNonCapturing()
        nonCapturingMaybe = false
      }
      escaping = c === '\\' && !escaping
      last = c
    })
    this.groupBuilder = stack.pop()
  }

  public match(s: string) {
    const match: RegexExecArray = this.regex.exec(s)
    if (!match) {
      return null
    }
    let groupIndex = 0
    const nextGroupIndex = () => groupIndex++
    return this.groupBuilder.build(match, nextGroupIndex)
  }
}
