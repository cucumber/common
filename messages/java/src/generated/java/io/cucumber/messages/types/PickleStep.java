package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class PickleStep {
    private final PickleStepArgument argument;
    private final java.util.List<String> astNodeIds;
    private final String id;
    private final String text;

    public PickleStep(
        PickleStepArgument argument,
        java.util.List<String> astNodeIds,
        String id,
        String text
    ) {
        this.argument = argument;
        this.astNodeIds = unmodifiableList(new ArrayList<>(requireNonNull(astNodeIds, "PickleStep.astNodeIds cannot be null")));
        this.id = requireNonNull(id, "PickleStep.id cannot be null");
        this.text = requireNonNull(text, "PickleStep.text cannot be null");
    }

    public Optional<PickleStepArgument> getArgument() {
        return Optional.ofNullable(argument);
    }

    public java.util.List<String> getAstNodeIds() {
        return astNodeIds;
    }

    public String getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PickleStep that = (PickleStep) o;
        return 
            Objects.equals(argument, that.argument) &&         
            astNodeIds.equals(that.astNodeIds) &&         
            id.equals(that.id) &&         
            text.equals(that.text);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            argument,
            astNodeIds,
            id,
            text
        );
    }

    @Override
    public String toString() {
        return "PickleStep{" +
            "argument=" + argument +
            ", astNodeIds=" + astNodeIds +
            ", id=" + id +
            ", text=" + text +
            '}';
    }
}
