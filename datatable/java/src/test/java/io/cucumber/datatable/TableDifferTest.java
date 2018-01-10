package io.cucumber.datatable;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static java.util.Arrays.asList;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

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
        DataTable otherTable = otherTableWithDeletedAndInserted();
        String expected = "" +
            
            "      | Aslak | aslak@email.com      | 123 |\n" +
            "    - | Joe   | joe@email.com        | 234 |\n" +
            "    + | Doe   | joe@email.com        | 234 |\n" +
            "    + | Foo   | schnickens@email.net | 789 |\n" +
            "      | Bryan | bryan@email.org      | 456 |\n" +
            "    - | Ni    | ni@email.com         | 654 |\n";
        assertEquals(expected, diff(table(), otherTable).toString());
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
        assertEquals(expected, diff(table(), otherTableWithInsertedAtEnd()).toString());
    }

    @Test
    public void considers_same_table_as_equal() {
        assertTrue(diff(table(), table()).isEmpty());
    }

    @Test
    public void should_find_new_lines_at_end_when_using_diff() {
        DataTable other = otherTableWithInsertedAtEnd();
        String expected = "" +
            
            "      | Aslak | aslak@email.com      | 123 |\n" +
            "      | Joe   | joe@email.com        | 234 |\n" +
            "      | Bryan | bryan@email.org      | 456 |\n" +
            "      | Ni    | ni@email.com         | 654 |\n" +
            "    + | Doe   | joe@email.com        | 234 |\n" +
            "    + | Foo   | schnickens@email.net | 789 |\n";
        assertEquals(expected, diff(table(), other).toString());
    }

    @Test
    public void should_not_fail_with_out_of_memory() {
        DataTable expected = TableParser.parse("" +
            "| I'm going to work |\n");
        List<List<String>> actual = new ArrayList<List<String>>();
        actual.add(asList("I just woke up"));
        actual.add(asList("I'm going to work"));
        diff(expected, DataTable.create(actual));
    }

    @Test
    public void should_diff_when_consecutive_deleted_lines() {
        DataTable other = otherTableWithTwoConsecutiveRowsDeleted();
        String expected = "" +
            
            "      | Aslak | aslak@email.com | 123 |\n" +
            "    - | Joe   | joe@email.com   | 234 |\n" +
            "    - | Bryan | bryan@email.org | 456 |\n" +
            "      | Ni    | ni@email.com    | 654 |\n";
        assertEquals(expected, diff(table(), other).toString());
    }

    @Test
    public void should_diff_with_empty_list() {
        List<List<String>> other = new ArrayList<List<String>>();
        String expected = "" +
            
            "    - | Aslak | aslak@email.com | 123 |\n" +
            "    - | Joe   | joe@email.com   | 234 |\n" +
            "    - | Bryan | bryan@email.org | 456 |\n" +
            "    - | Ni    | ni@email.com    | 654 |\n";
        assertEquals(expected, diff(table(), DataTable.create(other)).toString());
    }

    @Test
    public void should_diff_with_empty_table() {
        DataTable emptyTable = DataTable.emptyDataTable();
        String expected = "" +
            
            "    - | Aslak | aslak@email.com | 123 |\n" +
            "    - | Joe   | joe@email.com   | 234 |\n" +
            "    - | Bryan | bryan@email.org | 456 |\n" +
            "    - | Ni    | ni@email.com    | 654 |\n";
        assertEquals(expected, diff(table(), emptyTable).toString());
    }

    @Test
    public void empty_list_should_not_diff_with_empty_table() {
        List<List<String>> emptyList = new ArrayList<List<String>>();
        DataTable emptyTable = DataTable.emptyDataTable();
        assertEquals(emptyTable.cells(), emptyList);
    }

    @Test
    public void should_diff_when_consecutive_changed_lines() {
        DataTable other = otherTableWithTwoConsecutiveRowsChanged();
        String expected = "" +
            
            "      | Aslak | aslak@email.com  | 123 |\n" +
            "    - | Joe   | joe@email.com    | 234 |\n" +
            "    - | Bryan | bryan@email.org  | 456 |\n" +
            "    + | Joe   | joe@NOSPAM.com   | 234 |\n" +
            "    + | Bryan | bryan@NOSPAM.org | 456 |\n" +
            "      | Ni    | ni@email.com     | 654 |\n";
        assertEquals(expected, diff(table(), other).toString());
    }

    @Test
    public void should_diff_when_consecutive_inserted_lines() {
        DataTable other = otherTableWithTwoConsecutiveRowsInserted();
        String expected = "" +
            
            "      | Aslak | aslak@email.com      | 123 |\n" +
            "      | Joe   | joe@email.com        | 234 |\n" +
            "    + | Doe   | joe@email.com        | 234 |\n" +
            "    + | Foo   | schnickens@email.net | 789 |\n" +
            "      | Bryan | bryan@email.org      | 456 |\n" +
            "      | Ni    | ni@email.com         | 654 |\n";
        assertEquals(expected, diff(table(), other).toString());
    }

    @Test
    public void should_return_tables() {
        DataTable table = table();
        DataTable other = otherTableWithTwoConsecutiveRowsInserted();
        String expected = "" +
            "      | Aslak | aslak@email.com      | 123 |\n" +
            "      | Joe   | joe@email.com        | 234 |\n" +
            "    + | Doe   | joe@email.com        | 234 |\n" +
            "    + | Foo   | schnickens@email.net | 789 |\n" +
            "      | Bryan | bryan@email.org      | 456 |\n" +
            "      | Ni    | ni@email.com         | 654 |\n";
        assertEquals(expected, diff(table, other).toString());
    }

    @Test
    public void diff_set_with_itself() {
        assertTrue(unorderedDiff(table(), table()).isEmpty());
    }

    @Test
    public void diff_set_with_itself_in_different_order() {
        DataTable other = otherTableWithDifferentOrder();
        assertTrue(unorderedDiff(table(), other).isEmpty());
    }

    @Test
    public void diff_set_with_less_lines_in_other() {
        DataTable other = otherTableWithTwoConsecutiveRowsDeleted();
        String expected = "" +
            
            "      | Aslak | aslak@email.com | 123 |\n" +
            "    - | Joe   | joe@email.com   | 234 |\n" +
            "    - | Bryan | bryan@email.org | 456 |\n" +
            "      | Ni    | ni@email.com    | 654 |\n";
        assertEquals(expected, unorderedDiff(table(), other).toString());
    }

    @Test
    public void unordered_diff_with_more_lines_in_other() {
        DataTable other = otherTableWithTwoConsecutiveRowsInserted();
        String expected = "" +
            
            "      | Aslak | aslak@email.com      | 123 |\n" +
            "      | Joe   | joe@email.com        | 234 |\n" +
            "      | Bryan | bryan@email.org      | 456 |\n" +
            "      | Ni    | ni@email.com         | 654 |\n" +
            "    + | Doe   | joe@email.com        | 234 |\n" +
            "    + | Foo   | schnickens@email.net | 789 |\n";
        assertEquals(expected, unorderedDiff(table(), other).toString());
    }

    @Test
    public void unordered_diff_with_added_and_deleted_rows_in_other() {
        DataTable other = otherTableWithDeletedAndInsertedDifferentOrder();
        String expected = "" +
            
            "      | Aslak | aslak@email.com      | 123 |\n" +
            "    - | Joe   | joe@email.com        | 234 |\n" +
            "      | Bryan | bryan@email.org      | 456 |\n" +
            "    - | Ni    | ni@email.com         | 654 |\n" +
            "    + | Doe   | joe@email.com        | 234 |\n" +
            "    + | Foo   | schnickens@email.net | 789 |\n";
        assertEquals(expected, unorderedDiff(table(), other).toString());
    }

    @Test
    public void unordered_diff_with_added_duplicate_in_other() {
        DataTable other = otherTableWithDifferentOrderAndDuplicate();
        unorderedDiff(table(), other);
        String expected = "" +
            
            "      | Aslak | aslak@email.com | 123 |\n" +
            "      | Joe   | joe@email.com   | 234 |\n" +
            "      | Bryan | bryan@email.org | 456 |\n" +
            "      | Ni    | ni@email.com    | 654 |\n" +
            "    + | Ni    | ni@email.com    | 654 |\n" +
            "    + | Joe   | joe@email.com   | 234 |\n";
        assertEquals(expected, unorderedDiff(table(), other).toString());
    }

    @Test
    public void unordered_diff_with_added_duplicate_and_deleted_in_other() {
        DataTable other = otherTableWithDifferentOrderDuplicateAndDeleted();
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
        assertEquals(expected, unorderedDiff(tableWithDuplicate(), other).toString());
    }

    private DataTableDiff unorderedDiff(DataTable table, DataTable other) {
        return new TableDiffer(table, other).calculateUnorderedDiffs();
    }

    private static DataTableDiff diff(DataTable table, DataTable other) {
        return new TableDiffer(table, other).calculateDiffs();
    }

}
