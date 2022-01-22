package io.cucumber.messages;

import com.fasterxml.jackson.core.JsonProcessingException;
import io.cucumber.messages.Messages.Envelope;
import io.cucumber.messages.Messages.TestRunStarted;
import io.cucumber.messages.Messages.Timestamp;
import org.junit.jupiter.api.Test;

import static io.cucumber.messages.Jackson.OBJECT_MAPPER;
import static io.cucumber.messages.Messages.SourceMediaType.TEXT_X_CUCUMBER_GHERKIN_PLAIN;
import static org.junit.jupiter.api.Assertions.assertEquals;

class JacksonTest {
    @Test
    void can_deserialize_enum() throws JsonProcessingException {
        Messages.Source source = new Messages.Source("hello.feature", "Feature: Hello", TEXT_X_CUCUMBER_GHERKIN_PLAIN);
        String json = OBJECT_MAPPER.writeValueAsString(source);
        assertEquals(source, OBJECT_MAPPER.readValue(json, Messages.Source.class));
    }

    @Test
    void serialize_enums_using_value() throws JsonProcessingException {
        assertEquals("\"text/x.cucumber.gherkin+plain\"",
                OBJECT_MAPPER.writeValueAsString(TEXT_X_CUCUMBER_GHERKIN_PLAIN));
    }

    @Test
    void can_deserialize_envelope() throws JsonProcessingException {
        Messages.Envelope source = Envelope.of(new TestRunStarted(new Timestamp(3L,14L)));
        String json = OBJECT_MAPPER.writeValueAsString(source);
        assertEquals(source, OBJECT_MAPPER.readValue(json, Messages.Envelope.class));
    }
}
