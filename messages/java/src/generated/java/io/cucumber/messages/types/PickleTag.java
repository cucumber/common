package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class PickleTag {
    private final String name;
    private final String astNodeId;

    public PickleTag(
        String name,
        String astNodeId
    ) {
        this.name = requireNonNull(name, "PickleTag.name cannot be null");
        this.astNodeId = requireNonNull(astNodeId, "PickleTag.astNodeId cannot be null");
    }

    public String getName() {
        return name;
    }

    public String getAstNodeId() {
        return astNodeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PickleTag that = (PickleTag) o;
        return 
            name.equals(that.name) &&         
            astNodeId.equals(that.astNodeId);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            name,
            astNodeId
        );
    }

    @Override
    public String toString() {
        return "PickleTag{" +
            "name=" + name +
            ", astNodeId=" + astNodeId +
            '}';
    }
}
