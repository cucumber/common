package io.cucumber.messages;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertThrows;

public class MessagesTest {
    @Test
    void is_invalid_when_required_fields_are_missing() {
        Messages.Envelope envelope = new Messages.Envelope();
        envelope.setAttachment(new Messages.Attachment());
        assertThrows(NullPointerException.class, envelope::validate, "Attachment.body cannot be null");
    }

    @Test
    void is_valid_when_no_required_fields_are_missing() {
        new Messages.Envelope().validate();
    }
}
