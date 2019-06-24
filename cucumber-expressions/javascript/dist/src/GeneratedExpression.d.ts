import ParameterType from './ParameterType';
export default class GeneratedExpression {
    private readonly expressionTemplate;
    readonly parameterTypes: Array<ParameterType<any>>;
    constructor(expressionTemplate: string, parameterTypes: Array<ParameterType<any>>);
    readonly source: string;
    /**
     * Returns an array of parameter names to use in generated function/method signatures
     *
     * @returns {Array.<String>}
     */
    readonly parameterNames: string[];
}
