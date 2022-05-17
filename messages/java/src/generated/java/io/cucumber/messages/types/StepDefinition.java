package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class StepDefinition {
    private final String id;
    private final StepDefinitionPattern pattern;
    private final SourceReference sourceReference;

    public StepDefinition(
        String id,
        StepDefinitionPattern pattern,
        SourceReference sourceReference
    ) {
        this.id = requireNonNull(id, "StepDefinition.id cannot be null");
        this.pattern = requireNonNull(pattern, "StepDefinition.pattern cannot be null");
        this.sourceReference = requireNonNull(sourceReference, "StepDefinition.sourceReference cannot be null");
    }

    public String getId() {
        return id;
    }

    public StepDefinitionPattern getPattern() {
        return pattern;
    }

    public SourceReference getSourceReference() {
        return sourceReference;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StepDefinition that = (StepDefinition) o;
        return 
            id.equals(that.id) &&         
            pattern.equals(that.pattern) &&         
            sourceReference.equals(that.sourceReference);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            pattern,
            sourceReference
        );
    }

    @Override
    public String toString() {
        return "StepDefinition{" +
            "id=" + id +
            ", pattern=" + pattern +
            ", sourceReference=" + sourceReference +
            '}';
    }
}
