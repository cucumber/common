package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class Duration {
    private final Long seconds;
    private final Long nanos;

    public Duration(
        Long seconds,
        Long nanos
    ) {
        this.seconds = requireNonNull(seconds, "Duration.seconds cannot be null");
        this.nanos = requireNonNull(nanos, "Duration.nanos cannot be null");
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
        Duration that = (Duration) o;
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
        return "Duration{" +
            "seconds=" + seconds +
            ", nanos=" + nanos +
            '}';
    }
}
