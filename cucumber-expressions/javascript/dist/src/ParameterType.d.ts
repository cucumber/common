export default class ParameterType<T> {
    readonly name: string;
    private readonly type;
    readonly useForSnippets: boolean;
    readonly preferForRegexpMatch: boolean;
    private transformFn;
    static compare(pt1: ParameterType<any>, pt2: ParameterType<any>): number;
    static checkParameterTypeName(typeName: string): void;
    regexpStrings: string[];
    /**
     * @param name {String} the name of the type
     * @param regexps {Array.<RegExp>,RegExp,Array.<String>,String} that matches the type
     * @param type {Function} the prototype (constructor) of the type. May be null.
     * @param transform {Function} function transforming string to another type. May be null.
     * @param useForSnippets {boolean} true if this should be used for snippets. Defaults to true.
     * @param preferForRegexpMatch {boolean} true if this is a preferential type. Defaults to false.
     */
    constructor(name: string, regexps: RegExp[] | string[] | RegExp | string, type: any, transform: (...match: string[]) => T, useForSnippets: boolean, preferForRegexpMatch: boolean);
    transform(thisObj: any, groupValues: string[]): any;
}
