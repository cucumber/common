package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class SourceReference {
    private final String uri;
    private final JavaMethod javaMethod;
    private final JavaStackTraceElement javaStackTraceElement;
    private final Location location;

    public static SourceReference of(String uri) {
        return new SourceReference(
            requireNonNull(uri, "SourceReference.uri cannot be null"),
            null,
            null,
            null
        );
    }

    public static SourceReference of(JavaMethod javaMethod) {
        return new SourceReference(
            null,
            requireNonNull(javaMethod, "SourceReference.javaMethod cannot be null"),
            null,
            null
        );
    }

    public static SourceReference of(JavaStackTraceElement javaStackTraceElement) {
        return new SourceReference(
            null,
            null,
            requireNonNull(javaStackTraceElement, "SourceReference.javaStackTraceElement cannot be null"),
            null
        );
    }

    public static SourceReference of(Location location) {
        return new SourceReference(
            null,
            null,
            null,
            requireNonNull(location, "SourceReference.location cannot be null")
        );
    }

    public SourceReference(
        String uri,
        JavaMethod javaMethod,
        JavaStackTraceElement javaStackTraceElement,
        Location location
    ) {
        this.uri = uri;
        this.javaMethod = javaMethod;
        this.javaStackTraceElement = javaStackTraceElement;
        this.location = location;
    }

    public Optional<String> getUri() {
        return Optional.ofNullable(uri);
    }

    public Optional<JavaMethod> getJavaMethod() {
        return Optional.ofNullable(javaMethod);
    }

    public Optional<JavaStackTraceElement> getJavaStackTraceElement() {
        return Optional.ofNullable(javaStackTraceElement);
    }

    public Optional<Location> getLocation() {
        return Optional.ofNullable(location);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        SourceReference that = (SourceReference) o;
        return 
            Objects.equals(uri, that.uri) &&         
            Objects.equals(javaMethod, that.javaMethod) &&         
            Objects.equals(javaStackTraceElement, that.javaStackTraceElement) &&         
            Objects.equals(location, that.location);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            uri,
            javaMethod,
            javaStackTraceElement,
            location
        );
    }

    @Override
    public String toString() {
        return "SourceReference{" +
            "uri=" + uri +
            ", javaMethod=" + javaMethod +
            ", javaStackTraceElement=" + javaStackTraceElement +
            ", location=" + location +
            '}';
    }
}
