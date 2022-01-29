package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class Background {
    private final Location location;
    private final String keyword;
    private final String name;
    private final String description;
    private final java.util.List<Step> steps;
    private final String id;

    public Background(
        Location location,
        String keyword,
        String name,
        String description,
        java.util.List<Step> steps,
        String id
    ) {
        this.location = requireNonNull(location, "Background.location cannot be null");
        this.keyword = requireNonNull(keyword, "Background.keyword cannot be null");
        this.name = requireNonNull(name, "Background.name cannot be null");
        this.description = requireNonNull(description, "Background.description cannot be null");
        this.steps = unmodifiableList(new ArrayList<>(requireNonNull(steps, "Background.steps cannot be null")));
        this.id = requireNonNull(id, "Background.id cannot be null");
    }

    public Location getLocation() {
        return location;
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

    public java.util.List<Step> getSteps() {
        return steps;
    }

    public String getId() {
        return id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Background that = (Background) o;
        return 
            location.equals(that.location) &&         
            keyword.equals(that.keyword) &&         
            name.equals(that.name) &&         
            description.equals(that.description) &&         
            steps.equals(that.steps) &&         
            id.equals(that.id);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            location,
            keyword,
            name,
            description,
            steps,
            id
        );
    }

    @Override
    public String toString() {
        return "Background{" +
            "location=" + location +
            ", keyword=" + keyword +
            ", name=" + name +
            ", description=" + description +
            ", steps=" + steps +
            ", id=" + id +
            '}';
    }
}
