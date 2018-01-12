package io.cucumber.datatable;

import difflib.Delta;
import difflib.DiffUtils;
import difflib.Patch;

import java.util.AbstractMap.SimpleEntry;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public final class TableDiffer {

    private final DataTable from;
    private final DataTable to;

    public TableDiffer(DataTable fromTable, DataTable toTable) {
        checkColumns(fromTable, toTable);
        this.from = fromTable;
        this.to = toTable;
    }

    private void checkColumns(DataTable a, DataTable b) {
        if (a.width() != b.width() && !b.isEmpty()) {
            throw new IllegalArgumentException("Tables must have equal number of columns:\n" + a + "\n" + b);
        }
    }

    public DataTableDiff calculateDiffs() {
        Map<Integer, Delta> deltasByLine = createDeltasByLine();
        return createTableDiff(deltasByLine);
    }


    private static List<DiffableRow> getDiffableRows(DataTable raw) {
        List<DiffableRow> result = new ArrayList<>();
        for (List<String> row : raw.cells()) {
            result.add(new DiffableRow(row, row));
        }
        return result;
    }

    public DataTableDiff calculateUnorderedDiffs() {
        List<SimpleEntry<List<String>, DiffType>> diffTableRows = new ArrayList<>();

        ArrayList<List<String>> extraRows = new ArrayList<>();

        // 1. add all "to" row in extra table
        // 2. iterate over "from", when a common row occurs, remove it from extraRows
        // finally, only extra rows are kept and in same order that in "to".
        extraRows.addAll(to.cells());

        for (List<String> row : from.cells()) {
            if (!to.cells().contains(row)) {
                diffTableRows.add(
                        new SimpleEntry<>(row, DiffType.DELETE));
            } else {
                diffTableRows.add(
                        new SimpleEntry<>(row, DiffType.NONE));
                extraRows.remove(row);
            }
        }

        for (List<String> cells : extraRows) {
            diffTableRows.add(
                    new SimpleEntry<>(cells, DiffType.INSERT));
        }

        return DataTableDiff.create(diffTableRows);
    }

    @SuppressWarnings("unchecked")
    private Map<Integer, Delta> createDeltasByLine() {
        Patch patch = DiffUtils.diff(getDiffableRows(from), getDiffableRows(to));
        List<Delta> deltas = patch.getDeltas();

        Map<Integer, Delta> deltasByLine = new HashMap<>();
        for (Delta delta : deltas) {
            deltasByLine.put(delta.getOriginal().getPosition(), delta);
        }
        return deltasByLine;
    }

    private DataTableDiff createTableDiff(Map<Integer, Delta> deltasByLine) {
        List<SimpleEntry<List<String>, DiffType>> diffTableRows = new ArrayList<>();
        List<List<String>> rows = from.cells();
        for (int i = 0; i < rows.size(); i++) {
            Delta delta = deltasByLine.get(i);
            if (delta == null) {
                diffTableRows.add(new SimpleEntry<>(from.row(i), DiffType.NONE));
            } else {
                addRowsToTableDiff(diffTableRows, delta);
                // skipping lines involved in a delta
                if (delta.getType() == Delta.TYPE.CHANGE || delta.getType() == Delta.TYPE.DELETE) {
                    i += delta.getOriginal().getLines().size() - 1;
                } else {
                    diffTableRows.add(new SimpleEntry<>(from.row(i), DiffType.NONE));
                }
            }
        }
        // Can have new lines at end
        Delta remainingDelta = deltasByLine.get(rows.size());
        if (remainingDelta != null) {
            addRowsToTableDiff(diffTableRows, remainingDelta);
        }
        return DataTableDiff.create(diffTableRows);
    }

    private void addRowsToTableDiff(List<SimpleEntry<List<String>, DiffType>> diffTableRows, Delta delta) {
        markChangedAndDeletedRowsInOriginalAsMissing(diffTableRows, delta);
        markChangedAndInsertedRowsInRevisedAsNew(diffTableRows, delta);
    }

    @SuppressWarnings("unchecked")
    private void markChangedAndDeletedRowsInOriginalAsMissing(List<SimpleEntry<List<String>, DiffType>> diffTableRows, Delta delta) {
        List<DiffableRow> deletedLines = (List<DiffableRow>) delta.getOriginal().getLines();
        for (DiffableRow row : deletedLines) {
            diffTableRows.add(new SimpleEntry<>(row.row, DiffType.DELETE));
        }
    }

    @SuppressWarnings("unchecked")
    private void markChangedAndInsertedRowsInRevisedAsNew(List<SimpleEntry<List<String>, DiffType>> diffTableRows, Delta delta) {
        List<DiffableRow> insertedLines = (List<DiffableRow>) delta.getRevised().getLines();
        for (DiffableRow row : insertedLines) {
            diffTableRows.add(new SimpleEntry<>(row.row, DiffType.INSERT));
        }
    }
}
