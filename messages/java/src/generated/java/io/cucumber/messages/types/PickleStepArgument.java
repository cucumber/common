package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class PickleStepArgument {
    private final PickleDocString docString;
    private final PickleTable dataTable;

    public static PickleStepArgument of(PickleDocString docString) {
        return new PickleStepArgument(
            requireNonNull(docString, "PickleStepArgument.docString cannot be null"),
            null
        );
    }

    public static PickleStepArgument of(PickleTable dataTable) {
        return new PickleStepArgument(
            null,
            requireNonNull(dataTable, "PickleStepArgument.dataTable cannot be null")
        );
    }

    public PickleStepArgument(
        PickleDocString docString,
        PickleTable dataTable
    ) {
        this.docString = docString;
        this.dataTable = dataTable;
    }

    public Optional<PickleDocString> getDocString() {
        return Optional.ofNullable(docString);
    }

    public Optional<PickleTable> getDataTable() {
        return Optional.ofNullable(dataTable);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PickleStepArgument that = (PickleStepArgument) o;
        return 
            Objects.equals(docString, that.docString) &&         
            Objects.equals(dataTable, that.dataTable);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            docString,
            dataTable
        );
    }

    @Override
    public String toString() {
        return "PickleStepArgument{" +
            "docString=" + docString +
            ", dataTable=" + dataTable +
            '}';
    }
}
