package io.cucumber.cucumberexpressions;

import org.apiguardian.api.API;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.Collections.singletonList;

@API(status = API.Status.STABLE)
public class Group {
    private final List<Group> children;
    private final String value;
    private final int start;
    private final int end;

    Group(String value, int start, int end, List<Group> children) {
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
        List<Group> groups = getChildren().isEmpty() ? singletonList(this) : getChildren();
        return groups.stream()
                .map(Group::getValue)
                .collect(Collectors.toList());
    }
}
