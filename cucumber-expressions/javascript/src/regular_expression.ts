import Argument from "./argument";
import TreeRegexp from "./tree_regexp";
import ParameterType from "./parameter_type";
import ParameterTypeRegistry from "./parameter_type_registry";

export default class RegularExpression {
  private readonly treeRegexp: TreeRegexp;

  constructor(
    public readonly regexp: RegExp,
    private readonly parameterTypeRegistry: ParameterTypeRegistry
  ) {
    this.treeRegexp = new TreeRegexp(regexp);
  }

  public match(text: string) {
    const parameterTypes = this.treeRegexp.groupBuilder.children.map(
      groupBuilder => {
        const parameterTypeRegexp = groupBuilder.source;

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
            s => (s === undefined ? null : s),
            false,
            false
          )
        );
      }
    );

    return Argument.build(this.treeRegexp, text, parameterTypes);
  }

  get source() {
    return this.regexp.source;
  }
}
