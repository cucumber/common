package io.cucumber.datatable;

import org.apiguardian.api.API;

@API(status = API.Status.INTERNAL)
public final class TableDiffException extends RuntimeException {
    private TableDiffException(String message) {
        super(message);
    }

    public static TableDiffException diff(DataTableDiff dataTableDiff) {
        return new TableDiffException("tables were different:\n" + dataTableDiff.toString());
    }
}
