package io.cucumber.cucumberexpressions;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Matcher;

final class GroupBuilder {
    private final List<GroupBuilder> groupBuilders = new ArrayList<>();
    private boolean capturing = true;
    private String source;
    private int startIndex;
    private int endIndex;

    GroupBuilder(int startIndex) {
        this.startIndex = startIndex;
    }

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

    void moveChildrenTo(GroupBuilder groupBuilder) {
        for (GroupBuilder child : groupBuilders) {
            groupBuilder.add(child);
        }
    }

    List<GroupBuilder> getChildren() {
        return groupBuilders;
    }

    String getSource() {
        return source;
    }

    void setSource(String source) {
        this.source = source;
    }

    int getStartIndex() {
        return startIndex;
    }

    int getEndIndex() {
        return endIndex;
    }

    void setEndIndex(int endIndex) {
        this.endIndex = endIndex;
    }
}
