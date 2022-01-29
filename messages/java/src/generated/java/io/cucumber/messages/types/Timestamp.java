package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class Timestamp {
    private final Long seconds;
    private final Long nanos;

    public Timestamp(
        Long seconds,
        Long nanos
    ) {
        this.seconds = requireNonNull(seconds, "Timestamp.seconds cannot be null");
        this.nanos = requireNonNull(nanos, "Timestamp.nanos cannot be null");
    }

    public Long getSeconds() {
        return seconds;
    }

    public Long getNanos() {
        return nanos;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Timestamp that = (Timestamp) o;
        return 
            seconds.equals(that.seconds) &&         
            nanos.equals(that.nanos);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            seconds,
            nanos
        );
    }

    @Override
    public String toString() {
        return "Timestamp{" +
            "seconds=" + seconds +
            ", nanos=" + nanos +
            '}';
    }
}
