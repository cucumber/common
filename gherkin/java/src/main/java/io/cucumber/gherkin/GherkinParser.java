package io.cucumber.gherkin;

import io.cucumber.messages.IdGenerator;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;

import static io.cucumber.messages.Messages.Envelope;
import static io.cucumber.messages.Messages.GherkinDocument;
import static io.cucumber.messages.Messages.ParseError;
import static io.cucumber.messages.Messages.Pickle;
import static io.cucumber.messages.Messages.Source;
import static io.cucumber.messages.Messages.SourceReference;
import static java.util.Objects.requireNonNull;

/**
 * Main entry point for the Gherkin library
 */
public final class GherkinParser {

    public final static class Builder {
        private boolean includeSource = true;
        private boolean includeGherkinDocument = true;
        private boolean includePickles = true;
        private IdGenerator idGenerator = () -> UUID.randomUUID().toString();

        private Builder(){

        }

        public Builder includeSource(boolean includeSource) {
            this.includeSource = includeSource;
            return this;
        }

        public Builder includeGherkinDocument(boolean includeGherkinDocument) {
            this.includeGherkinDocument = includeGherkinDocument;
            return this;
        }

        public Builder includePickles(boolean includePickles) {
            this.includePickles = includePickles;
            return this;
        }

        public Builder idGenerator(IdGenerator idGenerator) {
            this.idGenerator = requireNonNull(idGenerator);
            return this;
        }

        public GherkinParser build(){
            return new GherkinParser(includeSource, includeGherkinDocument, includePickles, idGenerator);
        }
    }

    private final boolean includeSource;
    private final boolean includeGherkinDocument;
    private final boolean includePickles;
    private final IdGenerator idGenerator;

    private GherkinParser(boolean includeSource, boolean includeGherkinDocument, boolean includePickles, IdGenerator idGenerator) {
        this.includeSource = includeSource;
        this.includeGherkinDocument = includeGherkinDocument;
        this.includePickles = includePickles;
        this.idGenerator = requireNonNull(idGenerator);
    }

    public static Builder builder(){
        return new Builder();
    }

    public Stream<Envelope> parse(Envelope envelope) {
        List<Envelope> messages = new ArrayList<>();

        if (includeSource) {
            messages.add(envelope);
        }

        envelope.getSource()
            .map(this::parseSource)
            .ifPresent(messages::addAll);

        return messages.stream();
    }

    private List<Envelope> parseSource(Source source) {
        String uri = source.getUri();
        String data = source.getData();
        List<Envelope> messages = new ArrayList<>();

        Parser<GherkinDocument> parser = new Parser<>(new GherkinDocumentBuilder(idGenerator, uri));

        try {
            GherkinDocument gherkinDocument = null;

            if (includeGherkinDocument) {
                gherkinDocument = parser.parse(data, uri);
                messages.add(Envelope.of(gherkinDocument));
            }
            if (includePickles) {
                if (gherkinDocument == null) {
                    gherkinDocument = parser.parse(data, uri);
                }
                PickleCompiler pickleCompiler = new PickleCompiler(idGenerator);
                List<Pickle> pickles = pickleCompiler.compile(gherkinDocument, uri);
                for (Pickle pickle : pickles) {
                    messages.add(Envelope.of(pickle));
                }
            }
        } catch (ParserException.CompositeParserException e) {
            for (ParserException error : e.errors) {
                addParseError(messages, error, uri);
            }
        } catch (ParserException e) {
            addParseError(messages, e, uri);
        }

        return messages;
    }

    private void addParseError(List<Envelope> messages, ParserException e, String uri) {
        long line = e.location.getLine();
        long column = e.location.getColumn();
        ParseError parseError = new ParseError(
                new SourceReference(
                        uri,
                        null, null,
                        // We want 0 values not to be serialised, which is why we set them to null
                        // This is a legacy requirement brought over from old protobuf behaviour
                        new io.cucumber.messages.Messages.Location(
                                line,
                                column == 0 ? null : column
                        )
                ),
                e.getMessage()
        );
        messages.add(Envelope.of(parseError));
    }
}
