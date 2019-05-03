import ParameterTypeRegistry from "./parameter_type_registry";
import ParameterTypeMatcher from "./parameter_type_matcher";
import GeneratedExpression from "./generated_expression";
export default class CucumberExpressionGenerator {
    private readonly parameterTypeRegistry;
    constructor(parameterTypeRegistry: ParameterTypeRegistry);
    generateExpressions(text: string): GeneratedExpression[];
    /**
     * @deprecated
     */
    generateExpression(text: string): GeneratedExpression;
    _createParameterTypeMatchers(text: string): ParameterTypeMatcher[];
    private static createParameterTypeMatchers2;
}
