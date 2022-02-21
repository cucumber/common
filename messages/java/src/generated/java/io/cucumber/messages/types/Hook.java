package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class Hook {
    private final String id;
    private final SourceReference sourceReference;
    private final String tagExpression;

    public Hook(
        String id,
        SourceReference sourceReference,
        String tagExpression
    ) {
        this.id = requireNonNull(id, "Hook.id cannot be null");
        this.sourceReference = requireNonNull(sourceReference, "Hook.sourceReference cannot be null");
        this.tagExpression = tagExpression;
    }

    public String getId() {
        return id;
    }

    public SourceReference getSourceReference() {
        return sourceReference;
    }

    public Optional<String> getTagExpression() {
        return Optional.ofNullable(tagExpression);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Hook that = (Hook) o;
        return 
            id.equals(that.id) &&         
            sourceReference.equals(that.sourceReference) &&         
            Objects.equals(tagExpression, that.tagExpression);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            sourceReference,
            tagExpression
        );
    }

    @Override
    public String toString() {
        return "Hook{" +
            "id=" + id +
            ", sourceReference=" + sourceReference +
            ", tagExpression=" + tagExpression +
            '}';
    }
}
