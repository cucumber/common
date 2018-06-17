package gherkin.events;

import gherkin.AstBuilder;
import gherkin.Parser;
import gherkin.TokenMatcher;
import gherkin.ast.GherkinDocument;
import gherkin.pickles.Compiler;
import gherkin.pickles.Pickle;

import java.util.ArrayList;
import java.util.List;

public class Events {
    public static List<CucumberEvent> generate(String data, String uri) {
        return generate(data, uri, new TokenMatcher());
    }

    public static List<CucumberEvent> generate(String data, String uri, String language) {
        return generate(data, uri, new TokenMatcher(language));
    }

    private static List<CucumberEvent> generate(String data, String uri, TokenMatcher tokenMatcher) {
        Parser<GherkinDocument> parser = new Parser<>(new AstBuilder());
        Compiler compiler = new Compiler();

        List<CucumberEvent> events = new ArrayList<>();
        events.add(new SourceEvent(data, uri));
        GherkinDocument document = parser.parse(data, tokenMatcher);
        events.add(new GherkinDocumentEvent(uri, document));
        List<Pickle> pickles = compiler.compile(document);
        for (Pickle pickle : pickles) {
            events.add(new PickleEvent(uri, pickle));
        }
        return events;
    }
}
