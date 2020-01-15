import ParameterTypeRegistry from './ParameterTypeRegistry';
import GeneratedExpression from './GeneratedExpression';
export default class CucumberExpressionGenerator {
    private readonly parameterTypeRegistry;
    constructor(parameterTypeRegistry: ParameterTypeRegistry);
    generateExpressions(text: string): GeneratedExpression[];
    /**
     * @deprecated
     */
    generateExpression(text: string): GeneratedExpression;
    private createParameterTypeMatchers;
    private static createParameterTypeMatchers2;
}
