package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class Feature {
    private final Location location;
    private final java.util.List<Tag> tags;
    private final String language;
    private final String keyword;
    private final String name;
    private final String description;
    private final java.util.List<FeatureChild> children;

    public Feature(
        Location location,
        java.util.List<Tag> tags,
        String language,
        String keyword,
        String name,
        String description,
        java.util.List<FeatureChild> children
    ) {
        this.location = requireNonNull(location, "Feature.location cannot be null");
        this.tags = unmodifiableList(new ArrayList<>(requireNonNull(tags, "Feature.tags cannot be null")));
        this.language = requireNonNull(language, "Feature.language cannot be null");
        this.keyword = requireNonNull(keyword, "Feature.keyword cannot be null");
        this.name = requireNonNull(name, "Feature.name cannot be null");
        this.description = requireNonNull(description, "Feature.description cannot be null");
        this.children = unmodifiableList(new ArrayList<>(requireNonNull(children, "Feature.children cannot be null")));
    }

    public Location getLocation() {
        return location;
    }

    public java.util.List<Tag> getTags() {
        return tags;
    }

    public String getLanguage() {
        return language;
    }

    public String getKeyword() {
        return keyword;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public java.util.List<FeatureChild> getChildren() {
        return children;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Feature that = (Feature) o;
        return 
            location.equals(that.location) &&         
            tags.equals(that.tags) &&         
            language.equals(that.language) &&         
            keyword.equals(that.keyword) &&         
            name.equals(that.name) &&         
            description.equals(that.description) &&         
            children.equals(that.children);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            location,
            tags,
            language,
            keyword,
            name,
            description,
            children
        );
    }

    @Override
    public String toString() {
        return "Feature{" +
            "location=" + location +
            ", tags=" + tags +
            ", language=" + language +
            ", keyword=" + keyword +
            ", name=" + name +
            ", description=" + description +
            ", children=" + children +
            '}';
    }
}
