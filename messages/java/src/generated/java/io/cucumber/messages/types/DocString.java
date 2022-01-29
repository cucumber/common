package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class DocString {
    private final Location location;
    private final String mediaType;
    private final String content;
    private final String delimiter;

    public DocString(
        Location location,
        String mediaType,
        String content,
        String delimiter
    ) {
        this.location = requireNonNull(location, "DocString.location cannot be null");
        this.mediaType = mediaType;
        this.content = requireNonNull(content, "DocString.content cannot be null");
        this.delimiter = requireNonNull(delimiter, "DocString.delimiter cannot be null");
    }

    public Location getLocation() {
        return location;
    }

    public Optional<String> getMediaType() {
        return Optional.ofNullable(mediaType);
    }

    public String getContent() {
        return content;
    }

    public String getDelimiter() {
        return delimiter;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DocString that = (DocString) o;
        return 
            location.equals(that.location) &&         
            Objects.equals(mediaType, that.mediaType) &&         
            content.equals(that.content) &&         
            delimiter.equals(that.delimiter);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            location,
            mediaType,
            content,
            delimiter
        );
    }

    @Override
    public String toString() {
        return "DocString{" +
            "location=" + location +
            ", mediaType=" + mediaType +
            ", content=" + content +
            ", delimiter=" + delimiter +
            '}';
    }
}
