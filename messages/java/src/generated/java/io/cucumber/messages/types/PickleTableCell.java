package io.cucumber.messages.types;

import java.util.ArrayList;
import java.util.Objects;
import java.util.Optional;

import static java.util.Collections.unmodifiableList;
import static java.util.Objects.requireNonNull;

// Generated code
@SuppressWarnings("unused")
public final class PickleTableCell {
    private final String value;

    public PickleTableCell(
        String value
    ) {
        this.value = requireNonNull(value, "PickleTableCell.value cannot be null");
    }

    public String getValue() {
        return value;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PickleTableCell that = (PickleTableCell) o;
        return 
            value.equals(that.value);        
    }

    @Override
    public int hashCode() {
        return Objects.hash(
            value
        );
    }

    @Override
    public String toString() {
        return "PickleTableCell{" +
            "value=" + value +
            '}';
    }
}
