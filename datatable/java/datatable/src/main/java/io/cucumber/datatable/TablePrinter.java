package io.cucumber.datatable;

import java.io.IOException;
import java.util.List;
import org.apiguardian.api.API;

@API(status = API.Status.STABLE)
public class TablePrinter {
    private int[][] cellLengths;
    private int[] maxLengths;

    private String startIndent = "      ";
    private Boolean escapeCells = true;


    public TablePrinter withIndent(String startIndent) {
        this.startIndent = startIndent;
        return this;
    }

    public TablePrinter escapeCells(Boolean escapeCells) {
        this.escapeCells = escapeCells;
        return this;
    }

    public void printTable(DataTable table, StringBuilder appendable) {
        try {
            printTable(table, (Appendable) appendable);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }
    }

    public void printTable(DataTable table, Appendable appendable) throws IOException {
        List<List<String>> rawTable = table.cells();
        calculateColumnAndMaxLengths(rawTable);
        for (int i = 0; i < rawTable.size(); ++i) {
            printRow(rawTable.get(i), i, appendable);
            appendable.append("\n");
        }
    }

    protected void printStartIndent(Appendable buffer, int rowIndex) throws IOException {
        buffer.append(startIndent);
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
                final int length = escapeCell(cell).length();
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
            String cellText = escapeCell(getCellSafely(cells, colIndex));
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

    private String escapeCell(String cell) {
        if (escapeCells == false) {
            return cell;
        }

        if (cell == null) {
            return "";
        }

        if (cell.isEmpty()) {
            return "[empty]";
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
}
