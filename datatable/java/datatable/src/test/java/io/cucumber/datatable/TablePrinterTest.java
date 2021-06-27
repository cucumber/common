package io.cucumber.datatable;

import org.junit.jupiter.api.Test;

import java.util.List;

import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static org.junit.jupiter.api.Assertions.assertEquals;

class TablePrinterTest {

    @Test
    void should_print() {
        DataTable table = tableOf("hello");
        TablePrinter printer = TablePrinter.builder().build();
        StringBuilder stringBuilder = new StringBuilder();
        printer.printTable(table, stringBuilder);
        assertEquals("| hello |\n", stringBuilder.toString());
    }


    @Test
    void should_print_multiple_rows_and_columns() {
        List<List<String>> raw = asList(
                asList("1", "1", "1"),
                asList("4", "5", "6"),
                asList("7", "8", "9")
        );
        DataTable table = DataTable.create(raw);

        TablePrinter printer = TablePrinter.builder()
                .escape(false)
                .build();
        StringBuilder stringBuilder = new StringBuilder();
        printer.printTable(table, stringBuilder);
        assertEquals("" +
                "| 1 | 1 | 1 |\n" +
                "| 4 | 5 | 6 |\n" +
                "| 7 | 8 | 9 |\n", stringBuilder.toString());
    }

    @Test
    void should_print_null_as_empty_string() {
        DataTable table = tableOf(null);
        TablePrinter printer = TablePrinter.builder().build();
        StringBuilder stringBuilder = new StringBuilder();
        printer.printTable(table, stringBuilder);
        assertEquals("|  |\n", stringBuilder.toString());
    }

    @Test
    void should_print_empty_string_as_empty() {
        DataTable table = tableOf("");
        TablePrinter printer = TablePrinter.builder().build();
        StringBuilder stringBuilder = new StringBuilder();
        printer.printTable(table, stringBuilder);
        assertEquals("| [empty] |\n", stringBuilder.toString());
    }

    @Test
    void should_escape_table_delimiters() {
        DataTable table = tableOf("|");
        TablePrinter printer = TablePrinter.builder().build();
        StringBuilder stringBuilder = new StringBuilder();
        printer.printTable(table, stringBuilder);
        assertEquals("| \\| |\n", stringBuilder.toString());
    }

    @Test
    void should_add_indent() {
        DataTable table = tableOf("Hello");
        TablePrinter printer = TablePrinter.builder()
                .indent("    ")
                .build();
        StringBuilder stringBuilder = new StringBuilder();
        printer.printTable(table, stringBuilder);
        assertEquals("    | Hello |\n", stringBuilder.toString());
    }

    @Test
    void should_disable_escape_of_table_delimiter() {
        DataTable table = tableOf("|");
        TablePrinter printer = TablePrinter.builder()
                .escape(false)
                .build();
        StringBuilder stringBuilder = new StringBuilder();
        printer.printTable(table, stringBuilder);
        assertEquals("| | |\n", stringBuilder.toString());
    }

    private DataTable tableOf(String hello) {
        List<List<String>> cells = singletonList(singletonList(hello));
        return DataTable.create(cells);
    }

}
