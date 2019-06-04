import Argument from './Argument';
import ParameterTypeRegistry from './ParameterTypeRegistry';
export default class RegularExpression {
    readonly regexp: RegExp;
    private readonly parameterTypeRegistry;
    private readonly treeRegexp;
    constructor(regexp: RegExp, parameterTypeRegistry: ParameterTypeRegistry);
    match(text: string): Argument<any>[];
    readonly source: string;
}
