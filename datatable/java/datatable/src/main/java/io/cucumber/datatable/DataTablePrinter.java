package io.cucumber.datatable;

import org.apiguardian.api.API;

import java.io.IOException;
import java.util.function.Function;

@API(status = API.Status.STABLE)
public final class DataTablePrinter {

    private final Function<Integer, String> startIndent;
    private final boolean escapeCells;

    private DataTablePrinter(Function<Integer, String> startIndent, boolean escapeCells) {
        this.startIndent = startIndent;
        this.escapeCells = escapeCells;
    }

    public static DataTablePrinter.Builder builder() {
        return new Builder();
    }

    public void print(DataTable table, StringBuilder appendable) {
        try {
            print(table, (Appendable) appendable);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
    }

    public void print(DataTable table, Appendable appendable) throws IOException {
        if (table.isEmpty()) {
            return;
        }
        // datatables are always square and non-sparse.
        int height = table.height();
        int width = table.width();

        // render the individual cells
        String[][] renderedCells = new String[height][width];
        for (int i = 0; i < height; i++) {
            for (int j = 0; j < width; j++) {
                renderedCells[i][j] = renderCell(table.cell(i, j));
            }
        }

        // find the longest rendered cell in each column
        int[] longestCellInColumnLength = new int[width];
        for (String[] row : renderedCells) {
            for (int colIndex = 0; colIndex < width; colIndex++) {
                int current = longestCellInColumnLength[colIndex];
                int candidate = row[colIndex].length();
                longestCellInColumnLength[colIndex] = Math.max(current, candidate);
            }
        }

        // print the rendered cells with padding
        for (int rowIndex = 0; rowIndex < height; rowIndex++) {
            printStartIndent(appendable, rowIndex);
            appendable.append("| ");
            for (int colIndex = 0; colIndex < width; colIndex++) {
                String cellText = renderedCells[rowIndex][colIndex];
                appendable.append(cellText);
                int padding = longestCellInColumnLength[colIndex] - cellText.length();
                padSpace(appendable, padding);
                if (colIndex < width - 1) {
                    appendable.append(" | ");
                } else {
                    appendable.append(" |");
                }
            }
            appendable.append("\n");
        }
    }

    void printStartIndent(Appendable buffer, int rowIndex) throws IOException {
        buffer.append(startIndent.apply(rowIndex));
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

        public DataTablePrinter build() {
            return new DataTablePrinter(startIndent, escapeCells);
        }

    }

}
