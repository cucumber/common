import ParameterType from './ParameterType';
import GeneratedExpression from './GeneratedExpression';
declare class CucumberExpressionError extends Error {
}
declare class AmbiguousParameterTypeError extends CucumberExpressionError {
    static forConstructor(keyName: string, keyValue: string, parameterTypes: Array<ParameterType<any>>, generatedExpressions: GeneratedExpression[]): AmbiguousParameterTypeError;
    static forRegExp(parameterTypeRegexp: string, expressionRegexp: RegExp, parameterTypes: Array<ParameterType<any>>, generatedExpressions: GeneratedExpression[]): AmbiguousParameterTypeError;
    static _parameterTypeNames(parameterTypes: Array<ParameterType<any>>): string;
    static _expressions(generatedExpressions: GeneratedExpression[]): string;
}
declare class UndefinedParameterTypeError extends CucumberExpressionError {
    constructor(typeName: string);
}
export { AmbiguousParameterTypeError, UndefinedParameterTypeError, CucumberExpressionError, };
