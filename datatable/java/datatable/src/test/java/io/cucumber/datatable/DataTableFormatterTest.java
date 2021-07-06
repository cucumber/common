package io.cucumber.datatable;

import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.util.List;

import static io.cucumber.datatable.DataTableFormatter.builder;
import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static org.junit.jupiter.api.Assertions.assertEquals;

class DataTableFormatterTest {

    final DataTableFormatter formatter = builder().build();

    @Test
    void should_print() {
        DataTable table = tableOf("hello");
        assertEquals("| hello |\n", formatter.format(table));
    }

    @Test
    void should_print_to_string_builder() {
        DataTable table = tableOf("hello");
        StringBuilder stringBuilder = new StringBuilder();
        formatter.formatTo(table, stringBuilder);
        assertEquals("| hello |\n", stringBuilder.toString());
    }

    @Test
    void should_print_to_appendable() throws IOException {
        DataTable table = tableOf("hello");
        Appendable appendable = new StringBuilder();
        formatter.formatTo(table, appendable);
        assertEquals("| hello |\n", appendable.toString());
    }

    @Test
    void should_print_multiple_rows_and_columns() {
        DataTable table = DataTable.create(asList(
                asList("1", "1", "1"),
                asList("4", "5", "6"),
                asList("7", "8", "9")
        ));
        assertEquals("" +
                "| 1 | 1 | 1 |\n" +
                "| 4 | 5 | 6 |\n" +
                "| 7 | 8 | 9 |\n", formatter.format(table));
    }

    @Test
    void should_print_null_as_empty_string() {
        DataTable table = tableOf(null);
        assertEquals("|  |\n", formatter.format(table));
    }

    @Test
    void should_print_empty_string_as_empty() {
        DataTable table = tableOf("");
        assertEquals("| [empty] |\n", formatter.format(table));
    }

    @Test
    void should_escape_table_delimiters() {
        DataTable table = DataTable.create(asList(
                singletonList("|"),
                singletonList("\\"),
                singletonList("\n")
        ));
        ;
        assertEquals("" +
                "| \\| |\n" +
                "| \\\\ |\n" +
                "| \\n |\n", formatter.format(table));
    }

    @Test
    void should_add_indent() {
        DataTable table = tableOf("Hello");
        DataTableFormatter formatter = builder()
                .prefixRow("    ")
                .build();
        assertEquals("    | Hello |\n", formatter.format(table));
    }

    @Test
    void should_add_row_based_indent() {
        DataTable table = DataTable.create(asList(
                asList("1", "1", "1"),
                asList("4", "5", "6"),
                asList("7", "8", "9")
        ));
        String[] prefix = new String[] { "+ ", "- ", "  " };
        DataTableFormatter formatter = builder()
                .prefixRow(rowIndex -> prefix[rowIndex])
                .build();
        assertEquals("" +
                "+ | 1 | 1 | 1 |\n" +
                "- | 4 | 5 | 6 |\n" +
                "  | 7 | 8 | 9 |\n", formatter.format(table));
    }

    @Test
    void should_disable_escape_of_table_delimiter() {
        DataTable table = tableOf("|");
        DataTableFormatter formatter = builder()
                .escapeDelimiters(false)
                .build();
        assertEquals("| | |\n", formatter.format(table));
    }

    private DataTable tableOf(String hello) {
        List<List<String>> cells = singletonList(singletonList(hello));
        return DataTable.create(cells);
    }

}
