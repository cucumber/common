package gherkin.messages;

import io.cucumber.messages.Messages;
import org.junit.Ignore;
import org.junit.Test;

import java.util.List;

import static java.util.Collections.singletonList;
import static org.junit.Assert.assertEquals;

public class SubprocessCucumberMessagesTest {
    @Ignore
    @Test
    public void executes_child_and_processes_its_stdout() {
        SubprocessCucumberMessages cucumberMessages = new SubprocessCucumberMessages("../javascript/bin/gherkin", singletonList("testdata/good/minimal.feature"), true, true, true);
        List<Messages.Envelope> messages = cucumberMessages.messages();
        assertEquals(3, messages.size());
    }

}
