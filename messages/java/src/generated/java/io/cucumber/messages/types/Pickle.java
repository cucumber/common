package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class Pickle {
    private final String id;
    private final String uri;
    private final String name;
    private final String language;
    private final java.util.List<PickleStep> steps;
    private final java.util.List<PickleTag> tags;
    private final java.util.List<String> astNodeIds;

    public Pickle(
        String id,
        String uri,
        String name,
        String language,
        java.util.List<PickleStep> steps,
        java.util.List<PickleTag> tags,
        java.util.List<String> astNodeIds
    ) {
        this.id = requireNonNull(id, "Pickle.id cannot be null");
        this.uri = requireNonNull(uri, "Pickle.uri cannot be null");
        this.name = requireNonNull(name, "Pickle.name cannot be null");
        this.language = requireNonNull(language, "Pickle.language cannot be null");
        this.steps = unmodifiableList(new ArrayList<>(requireNonNull(steps, "Pickle.steps cannot be null")));
        this.tags = unmodifiableList(new ArrayList<>(requireNonNull(tags, "Pickle.tags cannot be null")));
        this.astNodeIds = unmodifiableList(new ArrayList<>(requireNonNull(astNodeIds, "Pickle.astNodeIds cannot be null")));
    }

    public String getId() {
        return id;
    }

    public String getUri() {
        return uri;
    }

    public String getName() {
        return name;
    }

    public String getLanguage() {
        return language;
    }

    public java.util.List<PickleStep> getSteps() {
        return steps;
    }

    public java.util.List<PickleTag> getTags() {
        return tags;
    }

    public java.util.List<String> getAstNodeIds() {
        return astNodeIds;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Pickle that = (Pickle) o;
        return 
            id.equals(that.id) &&         
            uri.equals(that.uri) &&         
            name.equals(that.name) &&         
            language.equals(that.language) &&         
            steps.equals(that.steps) &&         
            tags.equals(that.tags) &&         
            astNodeIds.equals(that.astNodeIds);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            id,
            uri,
            name,
            language,
            steps,
            tags,
            astNodeIds
        );
    }

    @Override
    public String toString() {
        return "Pickle{" +
            "id=" + id +
            ", uri=" + uri +
            ", name=" + name +
            ", language=" + language +
            ", steps=" + steps +
            ", tags=" + tags +
            ", astNodeIds=" + astNodeIds +
            '}';
    }
}
