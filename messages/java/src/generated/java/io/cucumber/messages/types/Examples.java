package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class Examples {
    private final Location location;
    private final java.util.List<Tag> tags;
    private final String keyword;
    private final String name;
    private final String description;
    private final TableRow tableHeader;
    private final java.util.List<TableRow> tableBody;
    private final String id;

    public Examples(
        Location location,
        java.util.List<Tag> tags,
        String keyword,
        String name,
        String description,
        TableRow tableHeader,
        java.util.List<TableRow> tableBody,
        String id
    ) {
        this.location = requireNonNull(location, "Examples.location cannot be null");
        this.tags = unmodifiableList(new ArrayList<>(requireNonNull(tags, "Examples.tags cannot be null")));
        this.keyword = requireNonNull(keyword, "Examples.keyword cannot be null");
        this.name = requireNonNull(name, "Examples.name cannot be null");
        this.description = requireNonNull(description, "Examples.description cannot be null");
        this.tableHeader = tableHeader;
        this.tableBody = unmodifiableList(new ArrayList<>(requireNonNull(tableBody, "Examples.tableBody cannot be null")));
        this.id = requireNonNull(id, "Examples.id cannot be null");
    }

    public Location getLocation() {
        return location;
    }

    public java.util.List<Tag> getTags() {
        return tags;
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

    public Optional<TableRow> getTableHeader() {
        return Optional.ofNullable(tableHeader);
    }

    public java.util.List<TableRow> getTableBody() {
        return tableBody;
    }

    public String getId() {
        return id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Examples that = (Examples) o;
        return 
            location.equals(that.location) &&         
            tags.equals(that.tags) &&         
            keyword.equals(that.keyword) &&         
            name.equals(that.name) &&         
            description.equals(that.description) &&         
            Objects.equals(tableHeader, that.tableHeader) &&         
            tableBody.equals(that.tableBody) &&         
            id.equals(that.id);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            location,
            tags,
            keyword,
            name,
            description,
            tableHeader,
            tableBody,
            id
        );
    }

    @Override
    public String toString() {
        return "Examples{" +
            "location=" + location +
            ", tags=" + tags +
            ", keyword=" + keyword +
            ", name=" + name +
            ", description=" + description +
            ", tableHeader=" + tableHeader +
            ", tableBody=" + tableBody +
            ", id=" + id +
            '}';
    }
}
