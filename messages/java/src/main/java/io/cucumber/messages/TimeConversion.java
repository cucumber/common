package io.cucumber.messages;

import static io.cucumber.messages.Messages.*;

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
