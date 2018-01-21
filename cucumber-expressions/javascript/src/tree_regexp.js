const Regex = require('becke-ch--regex--s0-0-v1--base--pl--lib')
const GroupBuilder = require('./group_builder')

class TreeRegexp {
  constructor(regexp) {
    this._re = 'string' === typeof regexp ? new RegExp(regexp) : regexp
    this._regex = new Regex(this._re.source, this._re.flags)

    const stack = [new GroupBuilder()]
    const groupStartStack = []
    let last = null
    let escaping = false
    let nonCapturingMaybe = false
    this._re.source.split('').forEach((c, n) => {
      if (c === '(' && !escaping) {
        stack.push(new GroupBuilder())
        groupStartStack.push(n + 1)
        nonCapturingMaybe = false
      } else if (c === ')' && !escaping) {
        const gb = stack.pop()
        const groupStart = groupStartStack.pop()
        if (gb.capturing) {
          gb.source = this._re.source.substring(groupStart, n)
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
      escaping = c === '\\' && !escaping
      last = c
    })
    this._groupBuilder = stack.pop()
  }

  get regexp() {
    return this._re
  }

  get groupBuilder() {
    return this._groupBuilder
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
