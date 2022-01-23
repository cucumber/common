package io.cucumber.gherkin;

import io.cucumber.gherkin.ParserException.CompositeParserException;
import io.cucumber.messages.IdGenerator;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Stream;

import static io.cucumber.messages.Messages.Envelope;
import static io.cucumber.messages.Messages.GherkinDocument;
import static io.cucumber.messages.Messages.ParseError;
import static io.cucumber.messages.Messages.Source;
import static io.cucumber.messages.Messages.SourceReference;
import static java.util.Objects.requireNonNull;
import static java.util.stream.Collectors.toCollection;

/**
 * Main entry point for the Gherkin library
 */
public final class GherkinParser {

    public final static class Builder {
        private boolean includeSource = true;
        private boolean includeGherkinDocument = true;
        private boolean includePickles = true;
        private IdGenerator idGenerator = () -> UUID.randomUUID().toString();

        private Builder() {

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

        public GherkinParser build() {
            return new GherkinParser(includeSource, includeGherkinDocument, includePickles, idGenerator);
        }

    }

    private final boolean includeSource;
    private final boolean includeGherkinDocument;
    private final boolean includePickles;
    private final IdGenerator idGenerator;
    private final PickleCompiler pickleCompiler;

    private GherkinParser(boolean includeSource, boolean includeGherkinDocument, boolean includePickles,
            IdGenerator idGenerator) {
        this.includeSource = includeSource;
        this.includeGherkinDocument = includeGherkinDocument;
        this.includePickles = includePickles;
        this.idGenerator = requireNonNull(idGenerator);
        this.pickleCompiler = new PickleCompiler(idGenerator);
    }

    public static Builder builder() {
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
            GherkinDocument gherkinDocument = parser.parse(data, uri);
            if (includeGherkinDocument) {
                messages.add(Envelope.of(gherkinDocument));
            }
            if (includePickles) {
                pickleCompiler.compile(gherkinDocument, uri)
                        .stream()
                        .map(Envelope::of)
                        .collect(toCollection(() -> messages));
            }
        } catch (CompositeParserException composite) {
            composite.errors.stream()
                    .map(error -> createParseError(error, uri))
                    .collect(toCollection(() -> messages));
        } catch (ParserException error) {
            messages.add(createParseError(error, uri));
        }
        return messages;
    }

    private Envelope createParseError(ParserException e, String uri) {
        long line = e.location.getLine();
        long column = e.location.getColumn();
        return Envelope.of(new ParseError(
                new SourceReference(
                        uri,
                        null,
                        null,
                        // We want 0 values not to be serialised, which is why we set them to null
                        // This is a legacy requirement brought over from old protobuf behaviour
                        new io.cucumber.messages.Messages.Location(
                                line,
                                column == 0 ? null : column
                        )
                ),
                e.getMessage()
        ));
    }

}
