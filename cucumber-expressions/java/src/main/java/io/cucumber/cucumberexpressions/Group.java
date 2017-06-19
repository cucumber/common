package io.cucumber.cucumberexpressions;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;

/**
 * Converts a {@link Matcher} into a tree of {@link Group}
 * where each node has a 0-indexed list of children.
 * <p>
 * This is particularly useful for traversing nested capture groups
 * and optional groups.
 */
class Group {
    private final int start;
    private final int end;
    private final String value;
    private final List<Group> children = new ArrayList<>();

    public Group(Matcher matcher) {
        if (matcher.groupCount() == 0) {
            start = end = 0;
            value = null;
            return;
        }
        start = matcher.start(0);
        end = matcher.end(0);
        value = matcher.group(0);

        List<Group> stack = new ArrayList<>();
        stack.add(this);

        for (int groupIndex = 1; groupIndex <= matcher.groupCount(); groupIndex++) {
            Group group = new Group(
                    matcher.start(groupIndex),
                    matcher.end(groupIndex),
                    matcher.group(groupIndex)
            );

            while (!stack.get(stack.size() - 1).contains(group)) {
                stack.remove(stack.size() - 1);
            }
            stack.get(stack.size() - 1).add(group);
            stack.add(group);
        }
    }

    public Group(int start, int end, String value) {
        this.start = start;
        this.end = end;
        this.value = value;
    }

    public boolean contains(Group group) {
        return group.isNull() ? true : group.start >= start && group.end <= end;
    }

    public void add(Group group) {
        children.add(group);
    }

    public List<Group> getChildren() {
        return children;
    }

    public String getValue() {
        return value;
    }

    public boolean isNull() {
        return value == null;
    }
}
