package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class PickleDocString {
    private final String mediaType;
    private final String content;

    public PickleDocString(
        String mediaType,
        String content
    ) {
        this.mediaType = mediaType;
        this.content = requireNonNull(content, "PickleDocString.content cannot be null");
    }

    public Optional<String> getMediaType() {
        return Optional.ofNullable(mediaType);
    }

    public String getContent() {
        return content;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PickleDocString that = (PickleDocString) o;
        return 
            Objects.equals(mediaType, that.mediaType) &&         
            content.equals(that.content);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            mediaType,
            content
        );
    }

    @Override
    public String toString() {
        return "PickleDocString{" +
            "mediaType=" + mediaType +
            ", content=" + content +
            '}';
    }
}
