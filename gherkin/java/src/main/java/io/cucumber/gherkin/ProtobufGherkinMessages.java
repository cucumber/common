package io.cucumber.gherkin;

import io.cucumber.messages.Messages.Wrapper;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

class ProtobufGherkinMessages implements GherkinMessages {
    private final InputStream input;

    ProtobufGherkinMessages(InputStream input) {
        Objects.requireNonNull(input);
        this.input = input;
    }

    @Override
    public List<Wrapper> messages() {
        List<Wrapper> result = new ArrayList<>();
        try {
            while (input.available() > 0) {
                Wrapper wrapper = Wrapper.parseDelimitedFrom(input);
                result.add(wrapper);
            }
            return result;
        } catch (IOException e) {
            throw new GherkinException(e);
        }
    }
}
