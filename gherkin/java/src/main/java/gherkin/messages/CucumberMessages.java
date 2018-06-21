package gherkin.messages;

import com.google.protobuf.Message;
import io.cucumber.messages.Gherkin.GherkinDocument;
import io.cucumber.messages.Pickles.Pickle;
import io.cucumber.messages.Sources;
import io.cucumber.messages.Sources.Attachment;
import io.cucumber.messages.Sources.Source;
import gherkin.GherkinDocumentBuilder;
import gherkin.Parser;
import gherkin.ParserException;
import gherkin.TokenMatcher;
import gherkin.pickles.PickleCompiler;

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
public class CucumberMessages {
    private final Parser<GherkinDocument.Builder> parser = new Parser<>(new GherkinDocumentBuilder());
    private final TokenMatcher matcher = new TokenMatcher();
    private final PickleCompiler pickleCompiler = new PickleCompiler();

    private final boolean includeSource;
    private final boolean includeGherkinDocument;
    private final boolean includePickles;

    public CucumberMessages(boolean includeSource, boolean includeGherkinDocument, boolean includePickles) {
        this.includeSource = includeSource;
        this.includeGherkinDocument = includeGherkinDocument;
        this.includePickles = includePickles;
    }

    public List<Message> messages(Source source) {
        List<Message> messages = new ArrayList<>();

        if (includeSource) {
            messages.add(source);
        }
        try {
            GherkinDocument gherkinDocument = null;

            if (includeGherkinDocument) {
                gherkinDocument = buildGherkinDocument(source);
                messages.add(gherkinDocument);
            }
            if (includePickles) {
                if (gherkinDocument == null) {
                    gherkinDocument = buildGherkinDocument(source);
                }
                List<Pickle> pickles = pickleCompiler.compile(gherkinDocument, source.getUri());
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

    private GherkinDocument buildGherkinDocument(Source source) {
        return parser.parse(source.getData(), matcher).setUri(source.getUri()).build();
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
