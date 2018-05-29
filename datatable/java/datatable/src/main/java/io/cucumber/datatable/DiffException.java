package io.cucumber.datatable;

public class DiffException extends RuntimeException {
    public DiffException(String message) {
        super(message);
    }

    public static DiffException diff(DataTableDiff dataTableDiff) {
        return new DiffException(dataTableDiff.toString());
    }
}
