import GroupBuilder from "./GroupBuilder";
export default class TreeRegexp {
    regexp: RegExp;
    private regex;
    groupBuilder: GroupBuilder;
    constructor(regexp: RegExp | string);
    match(s: string): import("./Group").default;
}
