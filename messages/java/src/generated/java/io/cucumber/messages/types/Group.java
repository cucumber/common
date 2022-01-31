package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class Group {
    private final java.util.List<Group> children;
    private final Long start;
    private final String value;

    public Group(
        java.util.List<Group> children,
        Long start,
        String value
    ) {
        this.children = unmodifiableList(new ArrayList<>(requireNonNull(children, "Group.children cannot be null")));
        this.start = start;
        this.value = value;
    }

    public java.util.List<Group> getChildren() {
        return children;
    }

    public Optional<Long> getStart() {
        return Optional.ofNullable(start);
    }

    public Optional<String> getValue() {
        return Optional.ofNullable(value);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Group that = (Group) o;
        return 
            children.equals(that.children) &&         
            Objects.equals(start, that.start) &&         
            Objects.equals(value, that.value);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            children,
            start,
            value
        );
    }

    @Override
    public String toString() {
        return "Group{" +
            "children=" + children +
            ", start=" + start +
            ", value=" + value +
            '}';
    }
}
