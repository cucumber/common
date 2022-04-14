package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class TestStepFinished {
    private final String testCaseStartedId;
    private final String testStepId;
    private final TestStepResult testStepResult;
    private final Timestamp timestamp;

    public TestStepFinished(
        String testCaseStartedId,
        String testStepId,
        TestStepResult testStepResult,
        Timestamp timestamp
    ) {
        this.testCaseStartedId = requireNonNull(testCaseStartedId, "TestStepFinished.testCaseStartedId cannot be null");
        this.testStepId = requireNonNull(testStepId, "TestStepFinished.testStepId cannot be null");
        this.testStepResult = requireNonNull(testStepResult, "TestStepFinished.testStepResult cannot be null");
        this.timestamp = requireNonNull(timestamp, "TestStepFinished.timestamp cannot be null");
    }

    public String getTestCaseStartedId() {
        return testCaseStartedId;
    }

    public String getTestStepId() {
        return testStepId;
    }

    public TestStepResult getTestStepResult() {
        return testStepResult;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TestStepFinished that = (TestStepFinished) o;
        return 
            testCaseStartedId.equals(that.testCaseStartedId) &&         
            testStepId.equals(that.testStepId) &&         
            testStepResult.equals(that.testStepResult) &&         
            timestamp.equals(that.timestamp);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            testCaseStartedId,
            testStepId,
            testStepResult,
            timestamp
        );
    }

    @Override
    public String toString() {
        return "TestStepFinished{" +
            "testCaseStartedId=" + testCaseStartedId +
            ", testStepId=" + testStepId +
            ", testStepResult=" + testStepResult +
            ", timestamp=" + timestamp +
            '}';
    }
}
