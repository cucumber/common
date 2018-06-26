package gherkin.messages;

import gherkin.GherkinException;
import io.cucumber.messages.Messages.Wrapper;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class ProtobufCucumberMessages implements CucumberMessages {
    private final InputStream input;
    private final boolean printSource;
    private final boolean printAst;
    private final boolean printPickles;

    public ProtobufCucumberMessages(InputStream input, boolean printSource, boolean printAst, boolean printPickles) {
        this.input = input;
        this.printSource = printSource;
        this.printAst = printAst;
        this.printPickles = printPickles;
    }

    @Override
    public List<Wrapper> messages() {
        List<Wrapper> result = new ArrayList<>();
        try {
            while (input.available() > 0) {
                Wrapper wrapper = Wrapper.parseDelimitedFrom(input);
                if ((wrapper.hasSource() && printSource) ||
                        (wrapper.hasGherkinDocument() && printAst) ||
                        (wrapper.hasPickle() && printPickles) ||
                        wrapper.hasAttachment()
                        )
                    result.add(wrapper);
            }
            return result;
        } catch (IOException e) {
            throw new GherkinException(e);
        }
    }
}
