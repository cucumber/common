package io.cucumber.messages;

import org.junit.Test;

import java.time.Duration;
import java.time.Instant;

import static io.cucumber.messages.TimeConversion.durationToJavaDuration;
import static io.cucumber.messages.TimeConversion.javaDurationToDuration;
import static io.cucumber.messages.TimeConversion.javaInstantToTimestamp;
import static io.cucumber.messages.TimeConversion.timestampToJavaInstant;
import static org.junit.Assert.assertEquals;

public class TimeConversionTest {
    @Test
    public void convertsToAndFromTimestamp() {
        Instant javaInstant = Instant.now();
        Messages.Timestamp timestamp = javaInstantToTimestamp(javaInstant);
        Instant javaInstantAgain = timestampToJavaInstant(timestamp);

        assertEquals(javaInstant, javaInstantAgain);
    }

    @Test
    public void convertsToAndFromDuration() {
        Duration javaDuration = Duration.ofSeconds(3, 161000);
        Messages.Duration duration = javaDurationToDuration(javaDuration);
        Duration javaDurationAgain = durationToJavaDuration(duration);

        assertEquals(javaDuration, javaDurationAgain);
    }
}
