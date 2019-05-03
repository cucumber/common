import GeneratedExpression from "./generated_expression";
import ParameterType from "./parameter_type";
export default class CombinatorialGeneratedExpressionFactory {
    private readonly expressionTemplate;
    private readonly parameterTypeCombinations;
    constructor(expressionTemplate: string, parameterTypeCombinations: Array<Array<ParameterType<any>>>);
    generateExpressions(): GeneratedExpression[];
    _generatePermutations(generatedExpressions: GeneratedExpression[], depth: number, currentParameterTypes: Array<ParameterType<any>>): void;
}
