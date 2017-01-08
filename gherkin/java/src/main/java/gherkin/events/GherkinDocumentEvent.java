package gherkin.events;

import gherkin.ast.GherkinDocument;

public class GherkinDocumentEvent implements CucumberEvent {
    private final String type = "gherkin-document";
    public final String uri;
    public final GherkinDocument document;

    public GherkinDocumentEvent(String uri, GherkinDocument document) {
        this.uri = uri;
        this.document = document;
    }
}
