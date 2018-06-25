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
import io.cucumber.messages.Messages.Wrapper;

import java.util.ArrayList;
import java.util.List;

public class ParserCucumberMessages implements CucumberMessages {
    private final Parser<GherkinDocument.Builder> parser = new Parser<>(new GherkinDocumentBuilder());
    private final TokenMatcher matcher = new TokenMatcher();
    private final PickleCompiler pickleCompiler = new PickleCompiler();

    private final Source source;
    private final boolean includeSource;
    private final boolean includeGherkinDocument;
    private final boolean includePickles;

    public ParserCucumberMessages(Source source, boolean includeSource, boolean includeGherkinDocument, boolean includePickles) {
        this.source = source;
        this.includeSource = includeSource;
        this.includeGherkinDocument = includeGherkinDocument;
        this.includePickles = includePickles;
    }

    @Override
    public List<Wrapper> messages() {
        List<Wrapper> messages = new ArrayList<>();

        if (includeSource) {
            messages.add(Wrapper.newBuilder().setSource(source).build());
        }
        try {
            GherkinDocument gherkinDocument = null;

            if (includeGherkinDocument) {
                gherkinDocument = buildGherkinDocument(source);
                messages.add(Wrapper.newBuilder().setGherkinDocument(gherkinDocument).build());
            }
            if (includePickles) {
                if (gherkinDocument == null) {
                    gherkinDocument = buildGherkinDocument(source);
                }
                List<Pickle> pickles = pickleCompiler.compile(gherkinDocument, source.getUri());
                for (Pickle pickle : pickles) {
                    messages.add(Wrapper.newBuilder().setPickle(pickle).build());
                }
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

    private void addErrorAttachment(List<Wrapper> messages, ParserException e, String uri) {
        Attachment attachment = Attachment.newBuilder()
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
        messages.add(Wrapper.newBuilder().setAttachment(attachment).build());
    }
}
