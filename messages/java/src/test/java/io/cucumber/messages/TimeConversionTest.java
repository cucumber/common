package io.cucumber.messages;

import io.cucumber.messages.types.Duration;
import io.cucumber.messages.types.Timestamp;
import org.junit.jupiter.api.Test;

import static io.cucumber.messages.TimeConversion.durationToJavaDuration;
import static io.cucumber.messages.TimeConversion.javaDurationToDuration;
import static io.cucumber.messages.TimeConversion.javaInstantToTimestamp;
import static io.cucumber.messages.TimeConversion.timestampToJavaInstant;
import static org.junit.jupiter.api.Assertions.assertEquals;

class TimeConversionTest {

    @Test
    void convertsToAndFromTimestamp() {
        java.time.Instant javaInstant = java.time.Instant.now();
        Timestamp timestamp = javaInstantToTimestamp(javaInstant);
        java.time.Instant javaInstantAgain = timestampToJavaInstant(timestamp);

        assertEquals(javaInstant, javaInstantAgain);
    }

    @Test
    void convertsToAndFromDuration() {
        java.time.Duration javaDuration = java.time.Duration.ofSeconds(3, 161000);
        Duration duration = javaDurationToDuration(javaDuration);
        java.time.Duration javaDurationAgain = durationToJavaDuration(duration);

        assertEquals(javaDuration, javaDurationAgain);
    }

}
