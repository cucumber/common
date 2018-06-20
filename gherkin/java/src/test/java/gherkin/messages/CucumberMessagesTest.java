package gherkin.messages;

import org.junit.Test;

public class CucumberMessagesTest {
    @Test
    public void creates_error_message() {
        new CucumberMessages(false  , true, true);
    }

}
