package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class PickleTable {
    private final java.util.List<PickleTableRow> rows;

    public PickleTable(
        java.util.List<PickleTableRow> rows
    ) {
        this.rows = unmodifiableList(new ArrayList<>(requireNonNull(rows, "PickleTable.rows cannot be null")));
    }

    public java.util.List<PickleTableRow> getRows() {
        return rows;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PickleTable that = (PickleTable) o;
        return 
            rows.equals(that.rows);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            rows
        );
    }

    @Override
    public String toString() {
        return "PickleTable{" +
            "rows=" + rows +
            '}';
    }
}
