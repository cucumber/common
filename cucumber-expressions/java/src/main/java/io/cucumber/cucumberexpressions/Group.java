package io.cucumber.cucumberexpressions;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.Collections.singletonList;

public class Group {
    private final List<Group> children;
    private final String value;
    private final int start;
    private final int end;

    public Group(String value, int start, int end, List<Group> children) {
        this.value = value;
        this.start = start;
        this.end = end;
        this.children = children;
    }

    public String getValue() {
        return value;
    }

    public int getStart() {
        return start;
    }

    public int getEnd() {
        return end;
    }

    public List<Group> getChildren() {
        return children;
    }

    public List<String> getValues() {
        return (getChildren().isEmpty() ? singletonList(this) : getChildren())
                .stream().map(Group::getValue).collect(Collectors.toList());
    }
}
