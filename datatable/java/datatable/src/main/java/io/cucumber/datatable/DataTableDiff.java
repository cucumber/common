package io.cucumber.datatable;

import org.apiguardian.api.API;

import java.util.AbstractMap.SimpleEntry;
import java.util.ArrayList;
import java.util.List;

@API(status = API.Status.INTERNAL)
public final class DataTableDiff {

    private final List<List<String>> table;
    private final List<DiffType> diffTypes;

    static DataTableDiff create(List<SimpleEntry<List<String>, DiffType>> diffTableRows) {
        List<DiffType> diffTypes = new ArrayList<>(diffTableRows.size());
        List<List<String>> table = new ArrayList<>();

        for (SimpleEntry<List<String>, DiffType> row : diffTableRows) {
            table.add(row.getKey());
            diffTypes.add(row.getValue());
        }
        return new DataTableDiff(table, diffTypes);
    }

    private DataTableDiff(List<List<String>> table, List<DiffType> diffTypes) {
        this.table = table;
        this.diffTypes = diffTypes;
    }

    public boolean isEmpty() {
        return !diffTypes.contains(DiffType.DELETE) && !diffTypes.contains(DiffType.INSERT);
    }

    @Override
    public String toString() {
        StringBuilder result = new StringBuilder();
        DiffTablePrinter printer = new DiffTablePrinter(diffTypes);
        printer.printTable(table, result);
        return result.toString();
    }
}
