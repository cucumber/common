package gherkin.stream;

import gherkin.AstBuilder;
import gherkin.Parser;
import gherkin.ParserException;
import gherkin.TokenMatcher;
import gherkin.ast.GherkinDocument;
import gherkin.events.AttachmentEvent;
import gherkin.events.CucumberEvent;
import gherkin.events.GherkinDocumentEvent;
import gherkin.events.PickleEvent;
import gherkin.events.SourceEvent;
import gherkin.pickles.Compiler;
import gherkin.pickles.Pickle;

import java.util.ArrayList;
import java.util.List;

public class GherkinEvents {
    private final Parser<GherkinDocument> parser = new Parser<>(new AstBuilder());
    private final TokenMatcher matcher = new TokenMatcher();
    private final Compiler compiler = new Compiler();

    private final boolean printSource;
    private final boolean printAst;
    private final boolean printPickles;

    public GherkinEvents(boolean printSource, boolean printAst, boolean printPickles) {
        this.printSource = printSource;
        this.printAst = printAst;
        this.printPickles = printPickles;
    }

    public Iterable<? extends CucumberEvent> iterable(SourceEvent sourceEvent) {
        List<CucumberEvent> cucumberEvents = new ArrayList<>();

        try {
            GherkinDocument gherkinDocument = parser.parse(sourceEvent.data, matcher);

            if (printSource) {
                cucumberEvents.add(sourceEvent);
            }
            if (printAst) {
                cucumberEvents.add(new GherkinDocumentEvent(sourceEvent.uri, gherkinDocument));
            }
            if (printPickles) {
                List<Pickle> pickles = compiler.compile(gherkinDocument);
                for (Pickle pickle : pickles) {
                    cucumberEvents.add(new PickleEvent(sourceEvent.uri, pickle));
                }
            }
        } catch (ParserException.CompositeParserException e) {
            for (ParserException error : e.errors) {
                addErrorAttachment(cucumberEvents, error, sourceEvent.uri);
            }
        } catch (ParserException e) {
            addErrorAttachment(cucumberEvents, e, sourceEvent.uri);
        }
        return cucumberEvents;
    }

    private void addErrorAttachment(List<CucumberEvent> cucumberEvents, ParserException e, String uri) {
        cucumberEvents.add(new AttachmentEvent(
                new AttachmentEvent.SourceRef(
                        uri,
                        new AttachmentEvent.Location(
                                e.location.getLine(),
                                e.location.getColumn()
                        )
                ),
                e.getMessage()
        ));

    }
}
