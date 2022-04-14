package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class TestRunStarted {
    private final Timestamp timestamp;

    public TestRunStarted(
        Timestamp timestamp
    ) {
        this.timestamp = requireNonNull(timestamp, "TestRunStarted.timestamp cannot be null");
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TestRunStarted that = (TestRunStarted) o;
        return 
            timestamp.equals(that.timestamp);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            timestamp
        );
    }

    @Override
    public String toString() {
        return "TestRunStarted{" +
            "timestamp=" + timestamp +
            '}';
    }
}
