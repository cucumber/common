package gherkin.messages;

import io.cucumber.messages.Messages;

import java.util.List;

public interface CucumberMessages {
    List<Messages.Envelope> messages();
}
