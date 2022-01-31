package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class TestCase {
    private final String id;
    private final String pickleId;
    private final java.util.List<TestStep> testSteps;

    public TestCase(
        String id,
        String pickleId,
        java.util.List<TestStep> testSteps
    ) {
        this.id = requireNonNull(id, "TestCase.id cannot be null");
        this.pickleId = requireNonNull(pickleId, "TestCase.pickleId cannot be null");
        this.testSteps = unmodifiableList(new ArrayList<>(requireNonNull(testSteps, "TestCase.testSteps cannot be null")));
    }

    public String getId() {
        return id;
    }

    public String getPickleId() {
        return pickleId;
    }

    public java.util.List<TestStep> getTestSteps() {
        return testSteps;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TestCase that = (TestCase) o;
        return 
            id.equals(that.id) &&         
            pickleId.equals(that.pickleId) &&         
            testSteps.equals(that.testSteps);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            pickleId,
            testSteps
        );
    }

    @Override
    public String toString() {
        return "TestCase{" +
            "id=" + id +
            ", pickleId=" + pickleId +
            ", testSteps=" + testSteps +
            '}';
    }
}
