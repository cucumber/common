package gherkin.messages;

import gherkin.GherkinDocumentBuilder;
import gherkin.Parser;
import gherkin.ParserException;
import gherkin.TokenMatcher;
import gherkin.pickles.PickleCompiler;
import io.cucumber.messages.Messages.Attachment;
import io.cucumber.messages.Messages.GherkinDocument;
import io.cucumber.messages.Messages.Location;
import io.cucumber.messages.Messages.Pickle;
import io.cucumber.messages.Messages.Source;
import io.cucumber.messages.Messages.SourceReference;
import io.cucumber.messages.Messages.Envelope;

import java.util.ArrayList;
import java.util.List;

public class ParserCucumberMessages implements CucumberMessages {
    private final Parser<GherkinDocument.Builder> parser = new Parser<>(new GherkinDocumentBuilder());
    private final TokenMatcher matcher = new TokenMatcher();
    private final PickleCompiler pickleCompiler = new PickleCompiler();

    private final List<String> paths;
    private final boolean includeSource;
    private final boolean includeGherkinDocument;
    private final boolean includePickles;

    public ParserCucumberMessages(List<String> paths, boolean includeSource, boolean includeGherkinDocument, boolean includePickles) {
        this.paths = paths;
        this.includeSource = includeSource;
        this.includeGherkinDocument = includeGherkinDocument;
        this.includePickles = includePickles;
    }

    @Override
    public List<Envelope> messages() {
        List<Envelope> messages = new ArrayList<>();

        FileSources fileSources = new FileSources(paths);
        for (Source source : fileSources) {
            if (includeSource) {
                messages.add(Envelope.newBuilder().setSource(source).build());
            }
            try {
                GherkinDocument gherkinDocument = null;

                if (includeGherkinDocument) {
                    gherkinDocument = buildGherkinDocument(source);
                    messages.add(Envelope.newBuilder().setGherkinDocument(gherkinDocument).build());
                }
                if (includePickles) {
                    if (gherkinDocument == null) {
                        gherkinDocument = buildGherkinDocument(source);
                    }
                    List<Pickle> pickles = pickleCompiler.compile(gherkinDocument, source.getUri());
                    for (Pickle pickle : pickles) {
                        messages.add(Envelope.newBuilder().setPickle(pickle).build());
                    }
                }
            } catch (ParserException.CompositeParserException e) {
                for (ParserException error : e.errors) {
                    addErrorAttachment(messages, error, source.getUri());
                }
            } catch (ParserException e) {
                addErrorAttachment(messages, e, source.getUri());
            }
        }
        return messages;
    }

    private GherkinDocument buildGherkinDocument(Source source) {
        return parser.parse(source.getData(), matcher).setUri(source.getUri()).build();
    }

    private void addErrorAttachment(List<Envelope> messages, ParserException e, String uri) {
        Attachment attachment = Attachment.newBuilder()
                // TODO: Set media here?
                .setSource(SourceReference.newBuilder()
                        .setUri(uri)
                        .setLocation(
                                Location.newBuilder()
                                        .setLine(e.location.getLine())
                                        .setColumn(e.location.getColumn())
                                        .build()
                        )
                        .build())
                .setData(e.getMessage())
                .build();
        messages.add(Envelope.newBuilder().setAttachment(attachment).build());
    }
}
