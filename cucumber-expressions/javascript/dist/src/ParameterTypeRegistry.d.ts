import ParameterType from './ParameterType';
export default class ParameterTypeRegistry {
    private readonly parameterTypeByName;
    private readonly parameterTypesByRegexp;
    constructor();
    readonly parameterTypes: IterableIterator<ParameterType<any>>;
    lookupByTypeName(typeName: string): ParameterType<any>;
    lookupByRegexp(parameterTypeRegexp: string, expressionRegexp: RegExp, text: string): ParameterType<any>;
    defineParameterType(parameterType: ParameterType<any>): void;
}
