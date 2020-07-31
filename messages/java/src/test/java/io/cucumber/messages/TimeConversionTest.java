package io.cucumber.messages;

import org.junit.jupiter.api.Test;

import java.time.Duration;
import java.time.Instant;

import static io.cucumber.messages.TimeConversion.durationToJavaDuration;
import static io.cucumber.messages.TimeConversion.javaDurationToDuration;
import static io.cucumber.messages.TimeConversion.javaInstantToTimestamp;
import static io.cucumber.messages.TimeConversion.timestampToJavaInstant;
import static org.junit.jupiter.api.Assertions.assertEquals;

class TimeConversionTest {

    @Test
    void convertsToAndFromTimestamp() {
        Instant javaInstant = Instant.now();
        Messages.Timestamp timestamp = javaInstantToTimestamp(javaInstant);
        Instant javaInstantAgain = timestampToJavaInstant(timestamp);

        assertEquals(javaInstant, javaInstantAgain);
    }

    @Test
    void convertsToAndFromDuration() {
        Duration javaDuration = Duration.ofSeconds(3, 161000);
        Messages.Duration duration = javaDurationToDuration(javaDuration);
        Duration javaDurationAgain = durationToJavaDuration(duration);

        assertEquals(javaDuration, javaDurationAgain);
    }

}
