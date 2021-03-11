import TreeRegexp from './TreeRegexp'
import ParameterType from './ParameterType'
import Group from './Group'
import CucumberExpressionError from './CucumberExpressionError'

export default class Argument<T> {
  public static build(
    treeRegexp: TreeRegexp,
    text: string,
    parameterTypes: ReadonlyArray<ParameterType<any>>
  ): ReadonlyArray<Argument<any>> {
    const group = treeRegexp.match(text)
    if (!group) {
      return null
    }

    const argGroups = group.children

    if (argGroups.length !== parameterTypes.length) {
      throw new CucumberExpressionError(
        `Expression ${treeRegexp.regexp} has ${argGroups.length} capture groups (${argGroups.map(
          (g) => g.value
        )}), but there were ${parameterTypes.length} parameter types (${parameterTypes.map(
          (p) => p.name
        )})`
      )
    }

    return parameterTypes.map((parameterType, i) => new Argument(argGroups[i], parameterType))
  }

  constructor(public readonly group: Group, public readonly parameterType: ParameterType<T>) {
    this.group = group
    this.parameterType = parameterType
  }

  /**
   * Get the value returned by the parameter type's transformer function.
   *
   * @param thisObj the object in which the transformer function is applied.
   */
  public getValue(thisObj: any): T {
    const groupValues = this.group ? this.group.values : null
    return this.parameterType.transform(thisObj, groupValues)
  }

  public getParameterType() {
    return this.parameterType
  }
}

module.exports = Argument
