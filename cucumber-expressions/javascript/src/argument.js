const { CucumberExpressionError } = require('./errors')

class Argument {
  static build(treeRegexp, text, parameterTypes) {
    const group = treeRegexp.match(text)
    if (!group) return null

    const argGroups = group.children

    if (argGroups.length !== parameterTypes.length) {
      throw new CucumberExpressionError(
        `Expression ${treeRegexp.regexp} has ${argGroups.length} capture groups (${argGroups.map(
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

  get group() {
    return this._group
  }

  /**
   * Get the value returned by the parameter type's transformer function.
   *
   * @param thisObj the object in which the transformer function is applied.
   */
  getValue(thisObj) {
    let groupValues = this._group ? this._group.values : null
    return this._parameterType.transform(thisObj, groupValues)
  }
}

module.exports = Argument
