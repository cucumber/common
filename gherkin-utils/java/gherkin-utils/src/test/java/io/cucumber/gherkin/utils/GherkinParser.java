package io.cucumber.gherkin.utils;


import io.cucumber.gherkin.GherkinDocumentBuilder;
import io.cucumber.gherkin.Parser;
import io.cucumber.messages.Messages.GherkinDocument;

import java.util.UUID;

public class GherkinParser {

    public static GherkinDocument parse(String source) {
        Parser parser = new Parser(new GherkinDocumentBuilder(() -> UUID.randomUUID().toString()));
        GherkinDocument.Builder gherkinDocumentBuilder = (GherkinDocument.Builder) parser.parse(source);
        GherkinDocument gherkinDocument = gherkinDocumentBuilder.setUri("").build();

        return gherkinDocument;
    }
}
