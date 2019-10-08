package io.cucumber.cucumberexpressions;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Matcher;

final class GroupBuilder {
    private List<GroupBuilder> groupBuilders = new ArrayList<>();
    private boolean capturing = true;
    private String source;

    void add(GroupBuilder groupBuilder) {
        groupBuilders.add(groupBuilder);
    }

    Group build(Matcher matcher, Iterator<Integer> groupIndices) {
        int groupIndex = groupIndices.next();
        List<Group> children = new ArrayList<>(groupBuilders.size());
        for (GroupBuilder childGroupBuilder : groupBuilders) {
            children.add(childGroupBuilder.build(matcher, groupIndices));
        }
        return new Group(matcher.group(groupIndex), matcher.start(groupIndex), matcher.end(groupIndex), children);
    }

    void setNonCapturing() {
        this.capturing = false;
    }

    boolean isCapturing() {
        return capturing;
    }

    public void moveChildrenTo(GroupBuilder groupBuilder) {
        for (GroupBuilder child : groupBuilders) {
            groupBuilder.add(child);
        }
    }

    public List<GroupBuilder> getChildren() {
        return groupBuilders;
    }

    public String getSource() {
        return source;
    }

    void setSource(String source) {
        this.source = source;
    }
}
