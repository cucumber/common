package io.cucumber.datatable;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static java.util.Collections.singletonList;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

public class TableDifferTest {

    private DataTable table() {
        String source = "" +
            "| Aslak | aslak@email.com | 123 |\n" +
            "| Joe   | joe@email.com   | 234 |\n" +
            "| Bryan | bryan@email.org | 456 |\n" +
            "| Ni    | ni@email.com    | 654 |\n";
        return TableParser.parse(source);
    }

    private DataTable tableWithDuplicate() {
        String source = "" +
            "| Aslak | aslak@email.com | 123 |\n" +
            "| Joe   | joe@email.com   | 234 |\n" +
            "| Bryan | bryan@email.org | 456 |\n" +
            "| Joe   | joe@email.com   | 234 |\n" +
            "| Ni    | ni@email.com    | 654 |\n" +
            "| Ni    | ni@email.com    | 654 |\n";
        return TableParser.parse(source);
    }

    private DataTable otherTableWithTwoConsecutiveRowsDeleted() {
        String source = "" +
            "| Aslak | aslak@email.com | 123 |\n" +
            "| Ni    | ni@email.com    | 654 |\n";
        return TableParser.parse(source);

    }

    private DataTable otherTableWithTwoConsecutiveRowsChanged() {
        String source = "" +
            "| Aslak | aslak@email.com  | 123 |\n" +
            "| Joe   | joe@NOSPAM.com   | 234 |\n" +
            "| Bryan | bryan@NOSPAM.org | 456 |\n" +
            "| Ni    | ni@email.com     | 654 |\n";
        return TableParser.parse(source);
    }

    private DataTable otherTableWithTwoConsecutiveRowsInserted() {
        String source = "" +
            "| Aslak | aslak@email.com      | 123 |\n" +
            "| Joe   | joe@email.com        | 234 |\n" +
            "| Doe   | joe@email.com        | 234 |\n" +
            "| Foo   | schnickens@email.net | 789 |\n" +
            "| Bryan | bryan@email.org      | 456 |\n" +
            "| Ni    | ni@email.com         | 654 |\n";
        return TableParser.parse(source);
    }

    private DataTable otherTableWithDeletedAndInserted() {
        String source = "" +
            "| Aslak | aslak@email.com      | 123 |\n" +
            "| Doe   | joe@email.com        | 234 |\n" +
            "| Foo   | schnickens@email.net | 789 |\n" +
            "| Bryan | bryan@email.org      | 456 |\n";
        return TableParser.parse(source);
    }

    private DataTable otherTableWithInsertedAtEnd() {
        String source = "" +
            "| Aslak | aslak@email.com      | 123 |\n" +
            "| Joe   | joe@email.com        | 234 |\n" +
            "| Bryan | bryan@email.org      | 456 |\n" +
            "| Ni    | ni@email.com         | 654 |\n" +
            "| Doe   | joe@email.com        | 234 |\n" +
            "| Foo   | schnickens@email.net | 789 |\n";
        return TableParser.parse(source);
    }

    private DataTable otherTableWithDifferentOrder() {
        String source = "" +
            "| Joe   | joe@email.com   | 234 |\n" +
            "| Aslak | aslak@email.com | 123 |\n" +
            "| Bryan | bryan@email.org | 456 |\n" +
            "| Ni    | ni@email.com    | 654 |\n";
        return TableParser.parse(source);
    }

    private DataTable otherTableWithDifferentOrderAndDuplicate() {
        String source = "" +
            "| Joe   | joe@email.com   | 234 |\n" +
            "| Aslak | aslak@email.com | 123 |\n" +
            "| Bryan | bryan@email.org | 456 |\n" +
            "| Ni    | ni@email.com    | 654 |\n" +
            "| Ni    | ni@email.com    | 654 |\n" +
            "| Joe   | joe@email.com   | 234 |\n";
        return TableParser.parse(source);
    }

    private DataTable otherTableWithDifferentOrderDuplicateAndDeleted() {
        String source = "" +
            "| Joe   | joe@email.com   | 234 |\n" +
            "| Bryan | bryan@email.org | 456 |\n" +
            "| Bryan | bryan@email.org | 456 |\n" +
            "| Ni    | ni@email.com    | 654 |\n" +
            "| Bob   | bob.email.com   | 555 |\n" +
            "| Bryan | bryan@email.org | 456 |\n" +
            "| Ni    | ni@email.com    | 654 |\n" +
            "| Joe   | joe@email.com   | 234 |\n";

        return TableParser.parse(source);
    }

    private DataTable otherTableWithDeletedAndInsertedDifferentOrder() {
        String source = "" +
            "| Doe   | joe@email.com        | 234 |\n" +
            "| Foo   | schnickens@email.net | 789 |\n" +
            "| Aslak | aslak@email.com      | 123 |\n" +
            "| Bryan | bryan@email.org      | 456 |\n";
        return TableParser.parse(source);
    }

    @Test
    public void shouldFindDifferences() {
        String expected = "" +

            "      | Aslak | aslak@email.com      | 123 |\n" +
            "    - | Joe   | joe@email.com        | 234 |\n" +
            "    + | Doe   | joe@email.com        | 234 |\n" +
            "    + | Foo   | schnickens@email.net | 789 |\n" +
            "      | Bryan | bryan@email.org      | 456 |\n" +
            "    - | Ni    | ni@email.com         | 654 |\n";
        assertDiff(table(), otherTableWithDeletedAndInserted(), expected);
    }

    @Test
    public void shouldFindNewLinesAtEnd() {
        String expected = "" +

            "      | Aslak | aslak@email.com      | 123 |\n" +
            "      | Joe   | joe@email.com        | 234 |\n" +
            "      | Bryan | bryan@email.org      | 456 |\n" +
            "      | Ni    | ni@email.com         | 654 |\n" +
            "    + | Doe   | joe@email.com        | 234 |\n" +
            "    + | Foo   | schnickens@email.net | 789 |\n";

        assertDiff(table(), otherTableWithInsertedAtEnd(), expected);
    }

    @Test
    public void considers_same_table_as_equal() {
        assertTrue(new TableDiffer(table(), table()).calculateDiffs().isEmpty());
    }

    @Test
    public void should_find_new_lines_at_end_when_using_diff() {
        String expected = "" +

            "      | Aslak | aslak@email.com      | 123 |\n" +
            "      | Joe   | joe@email.com        | 234 |\n" +
            "      | Bryan | bryan@email.org      | 456 |\n" +
            "      | Ni    | ni@email.com         | 654 |\n" +
            "    + | Doe   | joe@email.com        | 234 |\n" +
            "    + | Foo   | schnickens@email.net | 789 |\n";

        assertDiff(table(), otherTableWithInsertedAtEnd(), expected);
    }

    @Test
    public void should_not_fail_with_out_of_memory() {
        DataTable expected = TableParser.parse("" +
            "| I'm going to work |\n");
        List<List<String>> actual = new ArrayList<>();
        actual.add(singletonList("I just woke up"));
        actual.add(singletonList("I'm going to work"));

        new TableDiffer(expected, DataTable.create(actual)).calculateDiffs();
    }

    @Test
    public void should_diff_when_consecutive_deleted_lines() {
        String expected = "" +

            "      | Aslak | aslak@email.com | 123 |\n" +
            "    - | Joe   | joe@email.com   | 234 |\n" +
            "    - | Bryan | bryan@email.org | 456 |\n" +
            "      | Ni    | ni@email.com    | 654 |\n";
        assertDiff(table(), otherTableWithTwoConsecutiveRowsDeleted(), expected);
    }

    @Test
    public void should_diff_with_empty_list() {
        String expected = "" +

            "    - | Aslak | aslak@email.com | 123 |\n" +
            "    - | Joe   | joe@email.com   | 234 |\n" +
            "    - | Bryan | bryan@email.org | 456 |\n" +
            "    - | Ni    | ni@email.com    | 654 |\n";
        assertDiff(table(), DataTable.create(new ArrayList<List<String>>()), expected);
    }

    @Test
    public void should_diff_with_empty_table() {
        String expected = "" +

            "    - | Aslak | aslak@email.com | 123 |\n" +
            "    - | Joe   | joe@email.com   | 234 |\n" +
            "    - | Bryan | bryan@email.org | 456 |\n" +
            "    - | Ni    | ni@email.com    | 654 |\n";

        assertDiff(table(), DataTable.emptyDataTable(), expected);
    }

    @Test
    public void empty_list_should_not_diff_with_empty_table() {
        List<List<String>> emptyList = new ArrayList<>();
        DataTable emptyTable = DataTable.emptyDataTable();
        assertEquals(emptyTable.cells(), emptyList);
    }

    @Test
    public void should_diff_when_consecutive_changed_lines() {
        String expected = "" +

            "      | Aslak | aslak@email.com  | 123 |\n" +
            "    - | Joe   | joe@email.com    | 234 |\n" +
            "    - | Bryan | bryan@email.org  | 456 |\n" +
            "    + | Joe   | joe@NOSPAM.com   | 234 |\n" +
            "    + | Bryan | bryan@NOSPAM.org | 456 |\n" +
            "      | Ni    | ni@email.com     | 654 |\n";

        assertDiff(table(), otherTableWithTwoConsecutiveRowsChanged(), expected);
    }

    @Test
    public void should_diff_when_consecutive_inserted_lines() {
        String expected = "" +

            "      | Aslak | aslak@email.com      | 123 |\n" +
            "      | Joe   | joe@email.com        | 234 |\n" +
            "    + | Doe   | joe@email.com        | 234 |\n" +
            "    + | Foo   | schnickens@email.net | 789 |\n" +
            "      | Bryan | bryan@email.org      | 456 |\n" +
            "      | Ni    | ni@email.com         | 654 |\n";
        assertDiff(table(), otherTableWithTwoConsecutiveRowsInserted(), expected);
    }

    @Test
    public void should_return_tables() {
        String expected = "" +
            "      | Aslak | aslak@email.com      | 123 |\n" +
            "      | Joe   | joe@email.com        | 234 |\n" +
            "    + | Doe   | joe@email.com        | 234 |\n" +
            "    + | Foo   | schnickens@email.net | 789 |\n" +
            "      | Bryan | bryan@email.org      | 456 |\n" +
            "      | Ni    | ni@email.com         | 654 |\n";

        assertDiff(table(), otherTableWithTwoConsecutiveRowsInserted(), expected);
    }

    @Test
    public void unordered_diff_with_itself() {
        assertTrue(new TableDiffer(table(), table()).calculateUnorderedDiffs().isEmpty());
    }

    @Test
    public void unordered_diff_with_itself_in_different_order() {
        assertTrue(new TableDiffer(table(), otherTableWithDifferentOrder()).calculateUnorderedDiffs().isEmpty());
    }

    @Test
    public void unordered_diff_with_less_lines_in_other() {
        String expected = "" +

            "      | Aslak | aslak@email.com | 123 |\n" +
            "    - | Joe   | joe@email.com   | 234 |\n" +
            "    - | Bryan | bryan@email.org | 456 |\n" +
            "      | Ni    | ni@email.com    | 654 |\n";
        assertUnorderedDiff(table(), otherTableWithTwoConsecutiveRowsDeleted(), expected);
    }

    @Test
    public void unordered_diff_with_more_lines_in_other() {
        String expected = "" +

            "      | Aslak | aslak@email.com      | 123 |\n" +
            "      | Joe   | joe@email.com        | 234 |\n" +
            "      | Bryan | bryan@email.org      | 456 |\n" +
            "      | Ni    | ni@email.com         | 654 |\n" +
            "    + | Doe   | joe@email.com        | 234 |\n" +
            "    + | Foo   | schnickens@email.net | 789 |\n";
        assertUnorderedDiff(table(), otherTableWithTwoConsecutiveRowsInserted(), expected);
    }

    @Test
    public void unordered_diff_with_added_and_deleted_rows_in_other() {
        String expected = "" +

            "      | Aslak | aslak@email.com      | 123 |\n" +
            "    - | Joe   | joe@email.com        | 234 |\n" +
            "      | Bryan | bryan@email.org      | 456 |\n" +
            "    - | Ni    | ni@email.com         | 654 |\n" +
            "    + | Doe   | joe@email.com        | 234 |\n" +
            "    + | Foo   | schnickens@email.net | 789 |\n";
        assertUnorderedDiff(table(), otherTableWithDeletedAndInsertedDifferentOrder(), expected);
    }

    @Test
    public void unordered_diff_with_added_duplicate_in_other() {
        String expected = "" +

            "      | Aslak | aslak@email.com | 123 |\n" +
            "      | Joe   | joe@email.com   | 234 |\n" +
            "      | Bryan | bryan@email.org | 456 |\n" +
            "      | Ni    | ni@email.com    | 654 |\n" +
            "    + | Ni    | ni@email.com    | 654 |\n" +
            "    + | Joe   | joe@email.com   | 234 |\n";
        assertUnorderedDiff(table(), otherTableWithDifferentOrderAndDuplicate(), expected);
    }

    @Test
    public void unordered_diff_with_added_duplicate_in_other_reversed() {
        String expected = "" +

            "      | Joe   | joe@email.com   | 234 |\n" +
            "      | Aslak | aslak@email.com | 123 |\n" +
            "      | Bryan | bryan@email.org | 456 |\n" +
            "      | Ni    | ni@email.com    | 654 |\n" +
            "    - | Ni    | ni@email.com    | 654 |\n" +
            "    - | Joe   | joe@email.com   | 234 |\n";
        assertUnorderedDiff(otherTableWithDifferentOrderAndDuplicate(), table(), expected);
    }

    @Test
    public void unordered_diff_with_added_duplicate_and_deleted_in_other() {
        String expected = "" +

            "    - | Aslak | aslak@email.com | 123 |\n" +
            "      | Joe   | joe@email.com   | 234 |\n" +
            "      | Bryan | bryan@email.org | 456 |\n" +
            "      | Joe   | joe@email.com   | 234 |\n" +
            "      | Ni    | ni@email.com    | 654 |\n" +
            "      | Ni    | ni@email.com    | 654 |\n" +
            "    + | Bryan | bryan@email.org | 456 |\n" +
            "    + | Bob   | bob.email.com   | 555 |\n" +
            "    + | Bryan | bryan@email.org | 456 |\n";

        assertUnorderedDiff(tableWithDuplicate(), otherTableWithDifferentOrderDuplicateAndDeleted(), expected);
    }

    private void assertUnorderedDiff(DataTable table, DataTable other, String expected) {
        try {
            table.unorderedDiff(other);
            fail("Expected exception");
        } catch(TableDiffException e) {
            assertEquals("tables were different:\n" + expected, e.getMessage());
        }
    }

    private void assertDiff(DataTable table, DataTable other, String expected) {
        try {
            table.diff(other);
            fail("Expected exception");
        } catch(TableDiffException e) {
            assertEquals("tables were different:\n" + expected, e.getMessage());
        }
    }
}
