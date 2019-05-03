import ParameterType from "./parameter_type";
import GeneratedExpression from "./generated_expression";

class CucumberExpressionError extends Error {}

class AmbiguousParameterTypeError extends CucumberExpressionError {
  public static forConstructor(
    keyName: string,
    keyValue: string,
    parameterTypes: Array<ParameterType<any>>,
    generatedExpressions: GeneratedExpression[]
  ) {
    return new this(
      `parameter type with ${keyName}=${keyValue} is used by several parameter types: ${parameterTypes}, ${generatedExpressions}`
    );
  }

  public static forRegExp(
    parameterTypeRegexp: string,
    expressionRegexp: RegExp,
    parameterTypes: Array<ParameterType<any>>,
    generatedExpressions: GeneratedExpression[]
  ) {
    return new this(
      `Your Regular Expression ${expressionRegexp}
matches multiple parameter types with regexp ${parameterTypeRegexp}:
   ${this._parameterTypeNames(parameterTypes)}

I couldn't decide which one to use. You have two options:

1) Use a Cucumber Expression instead of a Regular Expression. Try one of these:
   ${this._expressions(generatedExpressions)}

2) Make one of the parameter types preferential and continue to use a Regular Expression.
`
    );
  }

  public static _parameterTypeNames(parameterTypes: Array<ParameterType<any>>) {
    return parameterTypes.map(p => `{${p.name}}`).join("\n   ");
  }

  public static _expressions(generatedExpressions: GeneratedExpression[]) {
    return generatedExpressions.map(e => e.source).join("\n   ");
  }
}

class UndefinedParameterTypeError extends CucumberExpressionError {
  constructor(typeName: string) {
    super(`Undefined parameter type {${typeName}}`);
  }
}

export {
  AmbiguousParameterTypeError,
  UndefinedParameterTypeError,
  CucumberExpressionError
};
