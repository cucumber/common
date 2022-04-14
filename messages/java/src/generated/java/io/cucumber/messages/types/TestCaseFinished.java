package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class TestCaseFinished {
    private final String testCaseStartedId;
    private final Timestamp timestamp;
    private final Boolean willBeRetried;

    public TestCaseFinished(
        String testCaseStartedId,
        Timestamp timestamp,
        Boolean willBeRetried
    ) {
        this.testCaseStartedId = requireNonNull(testCaseStartedId, "TestCaseFinished.testCaseStartedId cannot be null");
        this.timestamp = requireNonNull(timestamp, "TestCaseFinished.timestamp cannot be null");
        this.willBeRetried = requireNonNull(willBeRetried, "TestCaseFinished.willBeRetried cannot be null");
    }

    public String getTestCaseStartedId() {
        return testCaseStartedId;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public Boolean getWillBeRetried() {
        return willBeRetried;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TestCaseFinished that = (TestCaseFinished) o;
        return 
            testCaseStartedId.equals(that.testCaseStartedId) &&         
            timestamp.equals(that.timestamp) &&         
            willBeRetried.equals(that.willBeRetried);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            testCaseStartedId,
            timestamp,
            willBeRetried
        );
    }

    @Override
    public String toString() {
        return "TestCaseFinished{" +
            "testCaseStartedId=" + testCaseStartedId +
            ", timestamp=" + timestamp +
            ", willBeRetried=" + willBeRetried +
            '}';
    }
}
