package io.cucumber.gherkin;

import io.cucumber.messages.types.Envelope;
import org.junit.Test;

import static org.junit.Assert.assertNotNull;

// This tests that the message library exposes its version. This test is hard to do in the
// library itself since it requires running against a packaged version (jar).
public class MessageVersionTest {
    @Test
    public void message_library_has_version() {
        assertNotNull(Envelope.class.getPackage().getImplementationVersion());
    }
}
