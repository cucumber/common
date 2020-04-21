package io.cucumber.gherkin;

import io.cucumber.messages.Messages;
import org.junit.Test;

import static org.junit.Assert.assertNotNull;

// This tests that the message library
public class MessageVersionTest {
    @Test
    public void message_library_has_version() {
        assertNotNull(Messages.Envelope.class.getPackage().getImplementationVersion());
    }
}
