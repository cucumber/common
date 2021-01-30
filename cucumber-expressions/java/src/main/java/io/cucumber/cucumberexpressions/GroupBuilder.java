package io.cucumber.cucumberexpressions;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Matcher;

import org.apiguardian.api.API;

@API(status = API.Status.EXPERIMENTAL)
public final class GroupBuilder {
    private final List<GroupBuilder> groupBuilders = new ArrayList<>();
	private final boolean capturing;
	private final int startIndex;
    private String source;
	private int endIndex;

	GroupBuilder(int startIndex, boolean capturing) {
		this.startIndex = startIndex;
		this.capturing = capturing;
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

	public boolean isCapturing() {
        return capturing;
    }

	void moveChildrenTo(GroupBuilder groupBuilder) {
        for (GroupBuilder child : groupBuilders) {
            groupBuilder.add(child);
        }
    }

    public List<GroupBuilder> getChildren() {
		return Collections.unmodifiableList(groupBuilders);
    }

    public String getSource() {
        return source;
    }

    void setSource(String source) {
        this.source = source;
    }

	/**
	 * @return the start index of the group in the original regular expression
	 *         string
	 */
	public int getStartIndex() {
		return startIndex;
	}

	/**
	 * @return the end index of the group in the original regular expression string
	 */
	public int getEndIndex() {
		return endIndex;
	}

	void setEndIndex(int endIndex) {
		this.endIndex = endIndex;
	}
}
