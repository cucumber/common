package io.cucumber.cucumberexpressions;

import java.util.ArrayList;
import java.util.List;

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
        List<String> list = new ArrayList<>();
        for (Group group : (getChildren().isEmpty() ? singletonList(this) : getChildren())) {
            String groupValue = group.getValue();
            list.add(groupValue);
        }
        return list;
    }
}
