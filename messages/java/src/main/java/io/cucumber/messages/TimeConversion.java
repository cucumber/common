package io.cucumber.messages;

import io.cucumber.messages.types.Duration;
import io.cucumber.messages.types.Timestamp;

public final class TimeConversion {

    private TimeConversion(){

    }

    public static Timestamp javaInstantToTimestamp(java.time.Instant instant) {
        return new Timestamp(instant.getEpochSecond(), (long) instant.getNano());
    }

    public static Duration javaDurationToDuration(java.time.Duration duration) {
        return new Duration(duration.getSeconds(), (long) duration.getNano());
    }

    public static java.time.Instant timestampToJavaInstant(Timestamp timestamp) {
        return java.time.Instant.ofEpochSecond(timestamp.getSeconds(), timestamp.getNanos());
    }

    public static java.time.Duration durationToJavaDuration(Duration duration) {
        return java.time.Duration.ofSeconds(duration.getSeconds(), duration.getNanos());
    }
}
