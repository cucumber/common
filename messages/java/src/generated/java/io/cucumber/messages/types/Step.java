package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class Step {
    private final Location location;
    private final String keyword;
    private final StepKeywordType keywordType;
    private final String text;
    private final DocString docString;
    private final DataTable dataTable;
    private final String id;

    public Step(
        Location location,
        String keyword,
        StepKeywordType keywordType,
        String text,
        DocString docString,
        DataTable dataTable,
        String id
    ) {
        this.location = requireNonNull(location, "Step.location cannot be null");
        this.keyword = requireNonNull(keyword, "Step.keyword cannot be null");
        this.keywordType = keywordType;
        this.text = requireNonNull(text, "Step.text cannot be null");
        this.docString = docString;
        this.dataTable = dataTable;
        this.id = requireNonNull(id, "Step.id cannot be null");
    }

    public Location getLocation() {
        return location;
    }

    public String getKeyword() {
        return keyword;
    }

    public Optional<StepKeywordType> getKeywordType() {
        return Optional.ofNullable(keywordType);
    }

    public String getText() {
        return text;
    }

    public Optional<DocString> getDocString() {
        return Optional.ofNullable(docString);
    }

    public Optional<DataTable> getDataTable() {
        return Optional.ofNullable(dataTable);
    }

    public String getId() {
        return id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Step that = (Step) o;
        return 
            location.equals(that.location) &&         
            keyword.equals(that.keyword) &&         
            Objects.equals(keywordType, that.keywordType) &&         
            text.equals(that.text) &&         
            Objects.equals(docString, that.docString) &&         
            Objects.equals(dataTable, that.dataTable) &&         
            id.equals(that.id);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            location,
            keyword,
            keywordType,
            text,
            docString,
            dataTable,
            id
        );
    }

    @Override
    public String toString() {
        return "Step{" +
            "location=" + location +
            ", keyword=" + keyword +
            ", keywordType=" + keywordType +
            ", text=" + text +
            ", docString=" + docString +
            ", dataTable=" + dataTable +
            ", id=" + id +
            '}';
    }
}
