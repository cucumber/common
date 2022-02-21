package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class TestCaseStarted {
    private final Long attempt;
    private final String id;
    private final String testCaseId;
    private final Timestamp timestamp;

    public TestCaseStarted(
        Long attempt,
        String id,
        String testCaseId,
        Timestamp timestamp
    ) {
        this.attempt = requireNonNull(attempt, "TestCaseStarted.attempt cannot be null");
        this.id = requireNonNull(id, "TestCaseStarted.id cannot be null");
        this.testCaseId = requireNonNull(testCaseId, "TestCaseStarted.testCaseId cannot be null");
        this.timestamp = requireNonNull(timestamp, "TestCaseStarted.timestamp cannot be null");
    }

    public Long getAttempt() {
        return attempt;
    }

    public String getId() {
        return id;
    }

    public String getTestCaseId() {
        return testCaseId;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TestCaseStarted that = (TestCaseStarted) o;
        return 
            attempt.equals(that.attempt) &&         
            id.equals(that.id) &&         
            testCaseId.equals(that.testCaseId) &&         
            timestamp.equals(that.timestamp);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            attempt,
            id,
            testCaseId,
            timestamp
        );
    }

    @Override
    public String toString() {
        return "TestCaseStarted{" +
            "attempt=" + attempt +
            ", id=" + id +
            ", testCaseId=" + testCaseId +
            ", timestamp=" + timestamp +
            '}';
    }
}
