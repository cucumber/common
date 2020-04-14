import Argument from './Argument'
import TreeRegexp from './TreeRegexp'
import ParameterType from './ParameterType'
import ParameterTypeRegistry from './ParameterTypeRegistry'
import Expression from './Expression'

export default class RegularExpression implements Expression {
  private readonly treeRegexp: TreeRegexp

  constructor(
    public readonly regexp: RegExp,
    private readonly parameterTypeRegistry: ParameterTypeRegistry
  ) {
    this.treeRegexp = new TreeRegexp(regexp)
  }

  public match(text: string): ReadonlyArray<Argument<any>> {
    const parameterTypes = this.treeRegexp.groupBuilder.children.map(
      (groupBuilder) => {
        const parameterTypeRegexp = groupBuilder.source

        return (
          this.parameterTypeRegistry.lookupByRegexp(
            parameterTypeRegexp,
            this.regexp,
            text
          ) ||
          new ParameterType(
            null,
            parameterTypeRegexp,
            String,
            (s) => (s === undefined ? null : s),
            false,
            false
          )
        )
      }
    )

    return Argument.build(this.treeRegexp, text, parameterTypes)
  }

  get source(): string {
    return this.regexp.source
  }
}
