package gherkin.messages;

import com.google.protobuf.Message;
import cucumber.messages.Gherkin.GherkinDocument;
import cucumber.messages.Pickles.Pickle;
import cucumber.messages.Sources;
import cucumber.messages.Sources.Attachment;
import cucumber.messages.Sources.Source;
import gherkin.GherkinDocumentBuilder;
import gherkin.Parser;
import gherkin.ParserException;
import gherkin.TokenMatcher;
import gherkin.pickles.Compiler;

import java.util.ArrayList;
import java.util.List;

/**
 * Iterates over a {@link Source}, producing the following messages:
 * <ul>
 * <li>{@link Source}</li>
 * <li>{@link GherkinDocument}</li>
 * <li>{@link Pickle}</li>
 * </ul>
 */
public class GherkinMessages {
    private final Parser<GherkinDocument> parser = new Parser<>(new GherkinDocumentBuilder());
    private final TokenMatcher matcher = new TokenMatcher();
    private final Compiler compiler = new Compiler();

    private final boolean includeSource;
    private final boolean includeGherkinDocument;
    private final boolean includePickles;

    public GherkinMessages(boolean includeSource, boolean includeGherkinDocument, boolean includePickles) {
        this.includeSource = includeSource;
        this.includeGherkinDocument = includeGherkinDocument;
        this.includePickles = includePickles;
    }

    public List<Message> messages(Source source) {
        List<Message> messages = new ArrayList<>();

        try {
            GherkinDocument gherkinDocument = null;

            if (includeSource) {
                messages.add(source);
            }
            if (includeGherkinDocument) {
                gherkinDocument = parser.parse(source.getData(), matcher);
                messages.add(gherkinDocument);
            }
            if (includePickles) {
                if (gherkinDocument == null) {
                    gherkinDocument = parser.parse(source.getData(), matcher);
                }
                List<Pickle> pickles = compiler.compile(gherkinDocument, source.getUri());
                messages.addAll(pickles);
            }
        } catch (ParserException.CompositeParserException e) {
            for (ParserException error : e.errors) {
                addErrorAttachment(messages, error, source.getUri());
            }
        } catch (ParserException e) {
            addErrorAttachment(messages, e, source.getUri());
        }
        return messages;
    }

    private void addErrorAttachment(List<Message> cucumberEvents, ParserException e, String uri) {
        Attachment attachment = Attachment.newBuilder()
                .setSource(Sources.SourceReference.newBuilder()
                        .setUri(uri)
                        .setLocation(
                                Sources.Location.newBuilder()
                                        .setLine(e.location.getLine())
                                        .setColumn(e.location.getColumn())
                                        .build()
                        )
                        .build())
                .setData(e.getMessage())
                .build();
        cucumberEvents.add(attachment);

    }
}
