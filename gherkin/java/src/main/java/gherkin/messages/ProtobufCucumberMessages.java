package gherkin.messages;

import gherkin.GherkinException;
import io.cucumber.messages.Messages.Envelope;

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
    public List<Envelope> messages() {
        List<Envelope> result = new ArrayList<>();
        try {
            while (input.available() > 0) {
                Envelope envelope = Envelope.parseDelimitedFrom(input);
                result.add(envelope);
            }
            return result;
        } catch (IOException e) {
            throw new GherkinException(e);
        }
    }
}
