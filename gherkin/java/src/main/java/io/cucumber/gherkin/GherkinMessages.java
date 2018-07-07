package io.cucumber.gherkin;

import io.cucumber.messages.Messages.Wrapper;

import java.util.List;

public interface GherkinMessages {
    /**
     * @return a list of messages. Each message has one of:
     *
     * <ul>
     * <li>{@link io.cucumber.messages.Messages.Source}</li>
     * <li>{@link io.cucumber.messages.Messages.GherkinDocument}</li>
     * <li>{@link io.cucumber.messages.Messages.Pickle}</li>
     * <li>{@link io.cucumber.messages.Messages.Attachment} (representing parse error)</li>
     * </ul>
     *
     * 
     */
    List<Wrapper> messages();
}
