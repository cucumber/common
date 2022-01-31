package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class StepDefinitionPattern {
    private final String source;
    private final StepDefinitionPatternType type;

    public StepDefinitionPattern(
        String source,
        StepDefinitionPatternType type
    ) {
        this.source = requireNonNull(source, "StepDefinitionPattern.source cannot be null");
        this.type = requireNonNull(type, "StepDefinitionPattern.type cannot be null");
    }

    public String getSource() {
        return source;
    }

    public StepDefinitionPatternType getType() {
        return type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StepDefinitionPattern that = (StepDefinitionPattern) o;
        return 
            source.equals(that.source) &&         
            type.equals(that.type);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            source,
            type
        );
    }

    @Override
    public String toString() {
        return "StepDefinitionPattern{" +
            "source=" + source +
            ", type=" + type +
            '}';
    }
}
