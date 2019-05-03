import GroupBuilder from "./group_builder";
export default class TreeRegexp {
    regexp: RegExp;
    private regex;
    groupBuilder: GroupBuilder;
    constructor(regexp: RegExp | string);
    match(s: string): import("./group").default;
}
