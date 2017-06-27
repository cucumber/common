const Group = require('./group')
const { CucumberExpressionException } = require('./errors')

class Argument {
  static build(regexp, text, parameterTypes) {
    const m = regexp.exec(text)
    if (!m) return null

    const matchGroup = new Group(m, text)
    const argGroups = matchGroup.children

    if (argGroups.length !== parameterTypes.length) {
      throw new CucumberExpressionException(
        `Expression has ${argGroups.length} arguments, but there were ${parameterTypes.length} parameter types`
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
