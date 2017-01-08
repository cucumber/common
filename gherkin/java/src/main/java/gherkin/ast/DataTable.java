package gherkin.ast;

import java.util.Collections;
import java.util.List;

public class DataTable extends Node {
    private final List<TableRow> rows;

    public DataTable(List<TableRow> rows) {
        super(rows.get(0).getLocation());
        this.rows = Collections.unmodifiableList(rows);
    }

    public List<TableRow> getRows() {
        return rows;
    }
}
