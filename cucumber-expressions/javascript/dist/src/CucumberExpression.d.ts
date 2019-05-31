import ParameterTypeRegistry from "./ParameterTypeRegistry";
import Argument from "./Argument";
export default class CucumberExpression {
    private readonly expression;
    private readonly parameterTypeRegistry;
    private parameterTypes;
    private treeRegexp;
    /**
     * @param expression
     * @param parameterTypeRegistry
     */
    constructor(expression: string, parameterTypeRegistry: ParameterTypeRegistry);
    processEscapes(expression: string): string;
    processOptional(expression: string): string;
    processAlternation(expression: string): string;
    processParameters(expression: string, parameterTypeRegistry: ParameterTypeRegistry): string;
    match(text: string): Array<Argument<any>>;
    readonly regexp: RegExp;
    readonly source: string;
    _checkNoParameterType(s: string, message: string): void;
}
