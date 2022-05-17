package io.cucumber.messages;

import io.cucumber.messages.types.Attachment;
import io.cucumber.messages.types.Envelope;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertThrows;

public class MessagesTest {
    @Test
    void is_invalid_when_required_fields_are_missing() {
        assertThrows(NullPointerException.class, () -> {
            new Attachment(null, null, null, null, null, null, null, null);
        }, "Attachment.body cannot be null");
    }

    @Test
    void is_valid_when_no_required_fields_are_missing() {
        new Envelope(
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null
        );
    }
}
