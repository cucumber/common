package gherkin.events;

import gherkin.AstBuilder;
import gherkin.Parser;
import gherkin.pickles.Compiler;
import gherkin.ast.GherkinDocument;
import gherkin.pickles.Pickle;

import java.util.ArrayList;
import java.util.List;

public class Events {
    private static final Parser<GherkinDocument> parser = new Parser<>(new AstBuilder());
    private static final Compiler compiler = new Compiler();

    public static List<CucumberEvent> generate(String data, String uri) {
        List<CucumberEvent> events = new ArrayList<>();
        events.add(new SourceEvent(data, uri));
        GherkinDocument document = parser.parse(data);
        events.add(new GherkinDocumentEvent(uri, document));
        List<Pickle> pickles = compiler.compile(document);
        for (Pickle pickle : pickles) {
            events.add(new PickleEvent(uri, pickle));
        }
        return events;
    }
}
