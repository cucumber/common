package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class DataTable {
    private final Location location;
    private final java.util.List<TableRow> rows;

    public DataTable(
        Location location,
        java.util.List<TableRow> rows
    ) {
        this.location = requireNonNull(location, "DataTable.location cannot be null");
        this.rows = unmodifiableList(new ArrayList<>(requireNonNull(rows, "DataTable.rows cannot be null")));
    }

    public Location getLocation() {
        return location;
    }

    public java.util.List<TableRow> getRows() {
        return rows;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DataTable that = (DataTable) o;
        return 
            location.equals(that.location) &&         
            rows.equals(that.rows);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            location,
            rows
        );
    }

    @Override
    public String toString() {
        return "DataTable{" +
            "location=" + location +
            ", rows=" + rows +
            '}';
    }
}
