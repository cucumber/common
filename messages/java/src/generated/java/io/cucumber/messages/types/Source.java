package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class Source {
    private final String uri;
    private final String data;
    private final SourceMediaType mediaType;

    public Source(
        String uri,
        String data,
        SourceMediaType mediaType
    ) {
        this.uri = requireNonNull(uri, "Source.uri cannot be null");
        this.data = requireNonNull(data, "Source.data cannot be null");
        this.mediaType = requireNonNull(mediaType, "Source.mediaType cannot be null");
    }

    public String getUri() {
        return uri;
    }

    public String getData() {
        return data;
    }

    public SourceMediaType getMediaType() {
        return mediaType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Source that = (Source) o;
        return 
            uri.equals(that.uri) &&         
            data.equals(that.data) &&         
            mediaType.equals(that.mediaType);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            uri,
            data,
            mediaType
        );
    }

    @Override
    public String toString() {
        return "Source{" +
            "uri=" + uri +
            ", data=" + data +
            ", mediaType=" + mediaType +
            '}';
    }
}
