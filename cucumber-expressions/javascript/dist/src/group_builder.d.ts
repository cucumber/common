import Group from "./group";
import RegexExecArray from "./RegexExecArray";
export default class GroupBuilder {
    source: string;
    capturing: boolean;
    private groupBuilders;
    add(groupBuilder: GroupBuilder): void;
    build(match: RegexExecArray, nextGroupIndex: () => number): Group;
    setNonCapturing(): void;
    readonly children: GroupBuilder[];
    moveChildrenTo(groupBuilder: GroupBuilder): void;
}
