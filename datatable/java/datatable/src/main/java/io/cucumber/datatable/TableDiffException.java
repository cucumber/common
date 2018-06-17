package io.cucumber.datatable;

public class TableDiffException extends RuntimeException {
    private TableDiffException(String message) {
        super(message);
    }

    public static TableDiffException diff(DataTableDiff dataTableDiff) {
        return new TableDiffException("tables were different:\n" + dataTableDiff.toString());
    }
}
