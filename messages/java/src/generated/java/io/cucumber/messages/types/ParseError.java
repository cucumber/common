package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class ParseError {
    private final SourceReference source;
    private final String message;

    public ParseError(
        SourceReference source,
        String message
    ) {
        this.source = requireNonNull(source, "ParseError.source cannot be null");
        this.message = requireNonNull(message, "ParseError.message cannot be null");
    }

    public SourceReference getSource() {
        return source;
    }

    public String getMessage() {
        return message;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ParseError that = (ParseError) o;
        return 
            source.equals(that.source) &&         
            message.equals(that.message);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            source,
            message
        );
    }

    @Override
    public String toString() {
        return "ParseError{" +
            "source=" + source +
            ", message=" + message +
            '}';
    }
}
