package io.cucumber.gherkin.utils;

import io.cucumber.gherkin.Gherkin;
import io.cucumber.messages.IdGenerator;
import io.cucumber.messages.Messages;
import io.cucumber.messages.Messages.GherkinDocument;

import java.util.List;
import java.util.stream.Collectors;

import static java.util.Collections.singletonList;

public class GherkinParser {
    public static GherkinDocument parse(String source) {
        Messages.Envelope envelope = Gherkin.makeSourceEnvelope(source, "");
        List<Messages.Envelope> envelopes = Gherkin
                .fromSources(singletonList(envelope), false, true, false, new IdGenerator.Incrementing())
                .collect(Collectors.toList());

        GherkinDocument gherkinDocument = envelopes.get(0).getGherkinDocument();

        return gherkinDocument;
    }
}
