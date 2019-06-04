import ParameterTypeRegistry from './ParameterTypeRegistry';
import ParameterTypeMatcher from './ParameterTypeMatcher';
import GeneratedExpression from './GeneratedExpression';
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
