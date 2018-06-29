package gherkin.messages;

import gherkin.GherkinException;
import io.cucumber.messages.Messages.Wrapper;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class ProtobufCucumberMessages implements CucumberMessages {
    private final InputStream input;

    public ProtobufCucumberMessages(InputStream input) {
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
