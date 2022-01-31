package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class StepMatchArgumentsList {
    private final java.util.List<StepMatchArgument> stepMatchArguments;

    public StepMatchArgumentsList(
        java.util.List<StepMatchArgument> stepMatchArguments
    ) {
        this.stepMatchArguments = unmodifiableList(new ArrayList<>(requireNonNull(stepMatchArguments, "StepMatchArgumentsList.stepMatchArguments cannot be null")));
    }

    public java.util.List<StepMatchArgument> getStepMatchArguments() {
        return stepMatchArguments;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        StepMatchArgumentsList that = (StepMatchArgumentsList) o;
        return 
            stepMatchArguments.equals(that.stepMatchArguments);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            stepMatchArguments
        );
    }

    @Override
    public String toString() {
        return "StepMatchArgumentsList{" +
            "stepMatchArguments=" + stepMatchArguments +
            '}';
    }
}
