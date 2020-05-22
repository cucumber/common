package io.cucumber.messages;

import java.time.Duration;
import java.time.Instant;

public class TimeConversion {
    public static Messages.Timestamp javaInstantToTimestamp(Instant instant) {
        return Messages.Timestamp.newBuilder()
                .setSeconds(instant.getEpochSecond())
                .setNanos(instant.getNano())
                .build();
    }

    public static Messages.Duration javaDurationToDuration(Duration duration) {
        return Messages.Duration.newBuilder()
                .setSeconds(duration.getSeconds())
                .setNanos(duration.getNano())
                .build();
    }

    public static Instant timestampToJavaInstant(Messages.Timestamp timestamp) {
        return Instant.ofEpochSecond(timestamp.getSeconds(), timestamp.getNanos());
    }

    public static Duration durationToJavaDuration(Messages.Duration duration) {
        return Duration.ofSeconds(duration.getSeconds(), duration.getNanos());
    }
}
