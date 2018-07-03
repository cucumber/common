package io.cucumber.gherkin;

import io.cucumber.messages.Messages;

import java.util.List;

public interface CucumberMessages {
    List<Messages.Wrapper> messages();
}
