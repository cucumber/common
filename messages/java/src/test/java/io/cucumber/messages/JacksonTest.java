package io.cucumber.messages;

import com.fasterxml.jackson.core.JsonProcessingException;
import io.cucumber.messages.types.Envelope;
import io.cucumber.messages.types.Source;
import io.cucumber.messages.types.TestRunStarted;
import io.cucumber.messages.types.Timestamp;
import org.junit.jupiter.api.Test;

import static io.cucumber.messages.Jackson.OBJECT_MAPPER;
import static io.cucumber.messages.types.SourceMediaType.TEXT_X_CUCUMBER_GHERKIN_PLAIN;
import static org.junit.jupiter.api.Assertions.assertEquals;

class JacksonTest {
    @Test
    void can_deserialize_enum() throws JsonProcessingException {
        Source source = new Source("hello.feature", "Feature: Hello", TEXT_X_CUCUMBER_GHERKIN_PLAIN);
        String json = OBJECT_MAPPER.writeValueAsString(source);
        assertEquals(source, OBJECT_MAPPER.readValue(json, Source.class));
    }

    @Test
    void serialize_enums_using_value() throws JsonProcessingException {
        assertEquals("\"text/x.cucumber.gherkin+plain\"",
                OBJECT_MAPPER.writeValueAsString(TEXT_X_CUCUMBER_GHERKIN_PLAIN));
    }

    @Test
    void can_deserialize_envelope() throws JsonProcessingException {
        Envelope source = Envelope.of(new TestRunStarted(new Timestamp(3L, 14L)));
        String json = OBJECT_MAPPER.writeValueAsString(source);
        assertEquals(source, OBJECT_MAPPER.readValue(json, Envelope.class));
    }
}
