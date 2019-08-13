package io.cucumber.datatable;

import java.util.List;

final class DiffableRow {
    final List<String> row;
    private final List<String> convertedRow;

    DiffableRow(List<String> row, List<String> convertedRow) {
        this.row = row;
        this.convertedRow = convertedRow;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        DiffableRow that = (DiffableRow) o;
        return convertedRow.equals(that.convertedRow);

    }

    @Override
    public int hashCode() {
        return convertedRow.hashCode();
    }
}
