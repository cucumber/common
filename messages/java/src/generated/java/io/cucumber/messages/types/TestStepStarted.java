package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class TestStepStarted {
    private final String testCaseStartedId;
    private final String testStepId;
    private final Timestamp timestamp;

    public TestStepStarted(
        String testCaseStartedId,
        String testStepId,
        Timestamp timestamp
    ) {
        this.testCaseStartedId = requireNonNull(testCaseStartedId, "TestStepStarted.testCaseStartedId cannot be null");
        this.testStepId = requireNonNull(testStepId, "TestStepStarted.testStepId cannot be null");
        this.timestamp = requireNonNull(timestamp, "TestStepStarted.timestamp cannot be null");
    }

    public String getTestCaseStartedId() {
        return testCaseStartedId;
    }

    public String getTestStepId() {
        return testStepId;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TestStepStarted that = (TestStepStarted) o;
        return 
            testCaseStartedId.equals(that.testCaseStartedId) &&         
            testStepId.equals(that.testStepId) &&         
            timestamp.equals(that.timestamp);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            testCaseStartedId,
            testStepId,
            timestamp
        );
    }

    @Override
    public String toString() {
        return "TestStepStarted{" +
            "testCaseStartedId=" + testCaseStartedId +
            ", testStepId=" + testStepId +
            ", timestamp=" + timestamp +
            '}';
    }
}
