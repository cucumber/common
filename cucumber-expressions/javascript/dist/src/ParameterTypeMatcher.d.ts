import ParameterType from "./ParameterType";
export default class ParameterTypeMatcher {
    readonly parameterType: ParameterType<any>;
    private readonly regexpString;
    private readonly text;
    private matchPosition;
    private readonly match;
    constructor(parameterType: ParameterType<any>, regexpString: string, text: string, matchPosition?: number);
    advanceTo(newMatchPosition: number): ParameterTypeMatcher;
    readonly find: boolean;
    readonly start: number;
    readonly group: string;
    static compare(a: ParameterTypeMatcher, b: ParameterTypeMatcher): number;
}
