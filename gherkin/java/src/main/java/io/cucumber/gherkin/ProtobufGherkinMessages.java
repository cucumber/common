package io.cucumber.gherkin;

import io.cucumber.messages.Messages.EventWrapper;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

class ProtobufGherkinMessages {
    private final InputStream input;

    ProtobufGherkinMessages(InputStream input) {
        Objects.requireNonNull(input);
        this.input = input;
    }

    public List<EventWrapper> messages() {
        List<EventWrapper> result = new ArrayList<>();
        try {
            while (input.available() > 0) {
                EventWrapper wrapper = EventWrapper.parseDelimitedFrom(input);
                result.add(wrapper);
            }
            return result;
        } catch (IOException e) {
            throw new GherkinException("Couldn't parse messages", e);
        }
    }
}
