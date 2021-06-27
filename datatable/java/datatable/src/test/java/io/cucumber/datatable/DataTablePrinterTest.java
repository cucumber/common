package io.cucumber.datatable;

import org.junit.jupiter.api.Test;

import java.util.List;

import static io.cucumber.datatable.DataTablePrinter.builder;
import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static org.junit.jupiter.api.Assertions.assertEquals;

class DataTablePrinterTest {

    final DataTablePrinter printer = builder().build();

    @Test
    void should_print() {
        DataTable table = tableOf("hello");
        StringBuilder stringBuilder = new StringBuilder();
        printer.print(table, stringBuilder);
        assertEquals("| hello |\n", stringBuilder.toString());
    }

    @Test
    void should_print_multiple_rows_and_columns() {
        DataTable table = DataTable.create(asList(
                asList("1", "1", "1"),
                asList("4", "5", "6"),
                asList("7", "8", "9")
        ));
        StringBuilder stringBuilder = new StringBuilder();
        printer.print(table, stringBuilder);
        assertEquals("" +
                "| 1 | 1 | 1 |\n" +
                "| 4 | 5 | 6 |\n" +
                "| 7 | 8 | 9 |\n", stringBuilder.toString());
    }

    @Test
    void should_print_null_as_empty_string() {
        DataTable table = tableOf(null);
        StringBuilder stringBuilder = new StringBuilder();
        printer.print(table, stringBuilder);
        assertEquals("|  |\n", stringBuilder.toString());
    }

    @Test
    void should_print_empty_string_as_empty() {
        DataTable table = tableOf("");
        StringBuilder stringBuilder = new StringBuilder();
        printer.print(table, stringBuilder);
        assertEquals("| [empty] |\n", stringBuilder.toString());
    }

    @Test
    void should_escape_table_delimiters() {
        DataTable table = tableOf("|");
        StringBuilder stringBuilder = new StringBuilder();
        printer.print(table, stringBuilder);
        assertEquals("| \\| |\n", stringBuilder.toString());
    }

    @Test
    void should_add_indent() {
        DataTable table = tableOf("Hello");
        DataTablePrinter printer = builder()
                .indent("    ")
                .build();
        StringBuilder stringBuilder = new StringBuilder();
        printer.print(table, stringBuilder);
        assertEquals("    | Hello |\n", stringBuilder.toString());
    }

    @Test
    void should_add_row_based_indent() {
        DataTable table = DataTable.create(asList(
                asList("1", "1", "1"),
                asList("4", "5", "6"),
                asList("7", "8", "9")
        ));
        String[] prefix = new String[] { "+ ", "- ", "  " };
        DataTablePrinter printer = builder()
                .indent(rowIndex -> prefix[rowIndex])
                .build();
        StringBuilder stringBuilder = new StringBuilder();
        printer.print(table, stringBuilder);
        assertEquals("" +
                "+ | 1 | 1 | 1 |\n" +
                "- | 4 | 5 | 6 |\n" +
                "  | 7 | 8 | 9 |\n", stringBuilder.toString());
    }

    @Test
    void should_disable_escape_of_table_delimiter() {
        DataTable table = tableOf("|");
        DataTablePrinter printer = builder()
                .escape(false)
                .build();
        StringBuilder stringBuilder = new StringBuilder();
        printer.print(table, stringBuilder);
        assertEquals("| | |\n", stringBuilder.toString());
    }

    private DataTable tableOf(String hello) {
        List<List<String>> cells = singletonList(singletonList(hello));
        return DataTable.create(cells);
    }

}
