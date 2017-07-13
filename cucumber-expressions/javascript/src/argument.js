const Regex = require('becke-ch--regex--s0-0-v1--base--pl--lib')
const Group = require('./group')
const { CucumberExpressionError } = require('./errors')

class Argument {
  static build(regexp, text, parameterTypes) {
    if (/\?\)(?!(\\))/.exec(regexp.source.split('').reverse().join(''))) {
      throw new Error(`Optional groups not allowed: ${regexp.source}`)
    }
    const m = new Regex(regexp).exec(text)
    if (!m) return null

    const matchGroup = new Group(m)
    const argGroups = matchGroup.children

    if (argGroups.length !== parameterTypes.length) {
      throw new CucumberExpressionError(
        `Expression ${regexp} has ${argGroups.length} arguments (${argGroups.map(
          g => g.value
        )}), but there were ${parameterTypes.length} parameter types (${parameterTypes.map(
          p => p.name
        )})`
      )
    }

    return parameterTypes.map(
      (parameterType, i) => new Argument(argGroups[i], parameterType)
    )
  }

  constructor(group, parameterType) {
    this._group = group
    this._parameterType = parameterType
  }

  get value() {
    return this._parameterType.transform(
      this._group ? this._group.values : null
    )
  }
}

module.exports = Argument
