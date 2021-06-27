package io.cucumber.datatable;

import org.apiguardian.api.API;

import java.io.IOException;
import java.util.List;
import java.util.function.Function;

@API(status = API.Status.STABLE)
public final class TablePrinter {
    private int[][] cellLengths;
    private int[] maxLengths;

    private final Function<Integer, String> startIndent;
    private final boolean escapeCells;

    private TablePrinter(Function<Integer, String> startIndent, boolean escapeCells) {
        this.startIndent = startIndent;
        this.escapeCells = escapeCells;
    }

    public static TablePrinter.Builder builder() {
        return new Builder();
    }

    public void printTable(DataTable table, StringBuilder appendable) {
        try {
            printTable(table, (Appendable) appendable);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
    }

    public void printTable(DataTable table, Appendable appendable) throws IOException {
        List<List<String>> rows = table.cells();
        calculateColumnAndMaxLengths(rows);
        for (int i = 0; i < rows.size(); ++i) {
            printRow(rows.get(i), i, appendable);
            appendable.append("\n");
        }
    }

    void printStartIndent(Appendable buffer, int rowIndex) throws IOException {
        buffer.append(startIndent.apply(rowIndex));
    }

    private void calculateColumnAndMaxLengths(List<List<String>> rows) {
        // find the largest row
        int columnCount = 0;
        for (List<String> row : rows) {
            if (columnCount < row.size()) {
                columnCount = row.size();
            }
        }

        cellLengths = new int[rows.size()][columnCount];
        maxLengths = new int[columnCount];
        for (int rowIndex = 0; rowIndex < rows.size(); rowIndex++) {
            final List<String> cells = rows.get(rowIndex);
            for (int colIndex = 0; colIndex < columnCount; colIndex++) {
                final String cell = getCellSafely(cells, colIndex);
                final int length = renderCell(cell).length();
                cellLengths[rowIndex][colIndex] = length;
                maxLengths[colIndex] = Math.max(maxLengths[colIndex], length);
            }
        }
    }

    private String getCellSafely(final List<String> cells, final int colIndex) {
        return (colIndex < cells.size()) ? cells.get(colIndex) : "";
    }

    private void printRow(List<String> cells, int rowIndex, Appendable buffer) throws IOException {
        printStartIndent(buffer, rowIndex);
        buffer.append("| ");
        for (int colIndex = 0; colIndex < maxLengths.length; colIndex++) {
            String cellText = renderCell(getCellSafely(cells, colIndex));
            buffer.append(cellText);
            int padding = maxLengths[colIndex] - cellLengths[rowIndex][colIndex];
            padSpace(buffer, padding);
            if (colIndex < maxLengths.length - 1) {
                buffer.append(" | ");
            } else {
                buffer.append(" |");
            }
        }
    }

    private String renderCell(String cell) {
        if (cell == null) {
            return "";
        }

        if (cell.isEmpty()) {
            return "[empty]";
        }

        if (!escapeCells) {
            return cell;
        }

        return cell
                .replaceAll("\\\\(?!\\|)", "\\\\\\\\")
                .replaceAll("\\n", "\\\\n")
                .replaceAll("\\|", "\\\\|");
    }

    private void padSpace(Appendable buffer, int indent) throws IOException {
        for (int i = 0; i < indent; i++) {
            buffer.append(" ");
        }
    }

    public static final class Builder {
        private Function<Integer, String> startIndent = rowIndex -> "";
        private boolean escapeCells = true;

        public Builder indent(Function<Integer, String> startIndent) {
            this.startIndent = startIndent;
            return this;
        }

        public Builder indent(String startIndent) {
            return indent(rowIndex -> startIndent);
        }

        public Builder escape(boolean escapeCells) {
            this.escapeCells = escapeCells;
            return this;
        }

        public TablePrinter build() {
            return new TablePrinter(startIndent, escapeCells);
        }

    }

}
