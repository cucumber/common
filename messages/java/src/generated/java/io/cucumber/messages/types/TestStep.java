package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class TestStep {
    private final String hookId;
    private final String id;
    private final String pickleStepId;
    private final java.util.List<String> stepDefinitionIds;
    private final java.util.List<StepMatchArgumentsList> stepMatchArgumentsLists;

    public TestStep(
        String hookId,
        String id,
        String pickleStepId,
        java.util.List<String> stepDefinitionIds,
        java.util.List<StepMatchArgumentsList> stepMatchArgumentsLists
    ) {
        this.hookId = hookId;
        this.id = requireNonNull(id, "TestStep.id cannot be null");
        this.pickleStepId = pickleStepId;
        this.stepDefinitionIds = stepDefinitionIds == null ? null : unmodifiableList(new ArrayList<>(stepDefinitionIds));
        this.stepMatchArgumentsLists = stepMatchArgumentsLists == null ? null : unmodifiableList(new ArrayList<>(stepMatchArgumentsLists));
    }

    public Optional<String> getHookId() {
        return Optional.ofNullable(hookId);
    }

    public String getId() {
        return id;
    }

    public Optional<String> getPickleStepId() {
        return Optional.ofNullable(pickleStepId);
    }

    public Optional<java.util.List<String>> getStepDefinitionIds() {
        return Optional.ofNullable(stepDefinitionIds);
    }

    public Optional<java.util.List<StepMatchArgumentsList>> getStepMatchArgumentsLists() {
        return Optional.ofNullable(stepMatchArgumentsLists);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TestStep that = (TestStep) o;
        return 
            Objects.equals(hookId, that.hookId) &&         
            id.equals(that.id) &&         
            Objects.equals(pickleStepId, that.pickleStepId) &&         
            Objects.equals(stepDefinitionIds, that.stepDefinitionIds) &&         
            Objects.equals(stepMatchArgumentsLists, that.stepMatchArgumentsLists);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            hookId,
            id,
            pickleStepId,
            stepDefinitionIds,
            stepMatchArgumentsLists
        );
    }

    @Override
    public String toString() {
        return "TestStep{" +
            "hookId=" + hookId +
            ", id=" + id +
            ", pickleStepId=" + pickleStepId +
            ", stepDefinitionIds=" + stepDefinitionIds +
            ", stepMatchArgumentsLists=" + stepMatchArgumentsLists +
            '}';
    }
}
