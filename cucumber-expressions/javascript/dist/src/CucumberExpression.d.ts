import ParameterTypeRegistry from './ParameterTypeRegistry';
import Argument from './Argument';
import Expression from './Expression';
export default class CucumberExpression implements Expression {
    private readonly expression;
    private readonly parameterTypeRegistry;
    private parameterTypes;
    private treeRegexp;
    /**
     * @param expression
     * @param parameterTypeRegistry
     */
    constructor(expression: string, parameterTypeRegistry: ParameterTypeRegistry);
    private processEscapes;
    private processOptional;
    private processAlternation;
    private processParameters;
    match(text: string): Array<Argument<any>>;
    readonly regexp: RegExp;
    readonly source: string;
    private checkNoParameterType;
}
