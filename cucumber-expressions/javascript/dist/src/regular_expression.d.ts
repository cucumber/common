import Argument from "./argument";
import ParameterTypeRegistry from "./parameter_type_registry";
export default class RegularExpression {
    readonly regexp: RegExp;
    private readonly parameterTypeRegistry;
    private readonly treeRegexp;
    constructor(regexp: RegExp, parameterTypeRegistry: ParameterTypeRegistry);
    match(text: string): Argument<any>[];
    readonly source: string;
}
