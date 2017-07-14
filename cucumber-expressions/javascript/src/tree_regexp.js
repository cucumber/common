const Regex = require('becke-ch--regex--s0-0-v1--base--pl--lib')
const GroupBuilder = require('./group_builder')

class TreeRegexp {
  constructor(regexp) {
    this._re = 'string' === typeof regexp ? new RegExp(regexp) : regexp
    this._regex = new Regex(this._re)

    const stack = [new GroupBuilder()]
    let last = null
    let nonCapturingMaybe = false
    this._re.source.split('').forEach(c => {
      if (c === '(' && last !== '\\') {
        stack.push(new GroupBuilder())
        nonCapturingMaybe = false
      } else if (c === ')' && last !== '\\') {
        const gb = stack.pop()
        if (gb.capturing) {
          stack[stack.length - 1].add(gb)
        } else {
          gb.moveChildrenTo(stack[stack.length - 1])
        }
        nonCapturingMaybe = false
      } else if (c === '?' && last === '(') {
        nonCapturingMaybe = true
      } else if (c === ':' && nonCapturingMaybe) {
        stack[stack.length - 1].setNonCapturing()
        nonCapturingMaybe = false
      }
      last = c
    })
    this._groupBuilder = stack.pop()
  }

  get regexp() {
    return this._re
  }

  match(s) {
    const match = this._regex.exec(s)
    if (!match) return null
    let groupIndex = 0
    const nextGroupIndex = () => groupIndex++
    return this._groupBuilder.build(match, nextGroupIndex)
  }
}

module.exports = TreeRegexp
