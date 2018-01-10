package io.cucumber.datatable;

import io.cucumber.datatable.DataTable.TableConverter;
import org.junit.Rule;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnit;
import org.mockito.junit.MockitoRule;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

import static io.cucumber.datatable.DataTable.emptyDataTable;
import static java.util.Arrays.asList;
import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotSame;
import static org.junit.Assert.assertSame;
import static org.junit.Assert.assertTrue;
import static org.mockito.Mockito.verify;

public class DataTableTest {

    @Rule
    public final MockitoRule mockitoRule = MockitoJUnit.rule();

    @Mock
    private TableConverter tableConverter;

    @Test
    public void emptyTableIsEmpty() {
        DataTable table = emptyDataTable();
        assertTrue(table.isEmpty());
        assertTrue(table.cells().isEmpty());
    }


    @Test
    public void rawShouldEqualRaw() {
        List<List<String>> raw = asList(asList("hundred", "100"), asList("thousand", "1000"));
        DataTable table = DataTable.create(raw);
        assertEquals(raw, table.cells());
    }

    @Test
    public void cellsShouldEqualRaw() {
        List<List<String>> raw = asList(asList("hundred", "100"), asList("thousand", "1000"));
        DataTable table = DataTable.create(raw);
        assertEquals(raw, table.cells());
    }

    @Test
    public void cellShouldGetFromRaw() {
        List<List<String>> raw = asList(asList("hundred", "100"), asList("thousand", "1000"));
        DataTable table = DataTable.create(raw);
        assertEquals(raw.get(0).get(0), table.cell(0, 0));
        assertEquals(raw.get(0).get(1), table.cell(0, 1));
        assertEquals(raw.get(1).get(0), table.cell(1, 0));
        assertEquals(raw.get(1).get(1), table.cell(1, 1));
    }


    @Test
    public void subTableShouldViewSubSetOfCells() {
        List<List<String>> raw = asList(
            asList("ten", "10", "1"),
            asList("hundred", "100", "2"),
            asList("thousand", "1000", "3"));

        DataTable table = DataTable.create(raw);

        assertEquals(
            asList(
                asList("ten", "10"),
                asList("hundred", "100")),
            table.subTable(0, 0, 2, 2).cells());

        assertEquals(
            asList(
                asList("100", "2"),
                asList("1000", "3")),
            table.subTable(1, 1, 3, 3).cells());

        assertEquals(table.cells(),
            table.subTable(0, 0, 3, 3).cells());

        assertEquals("ten", table.subTable(0, 0, 3, 3).cell(0, 0));
        assertEquals("1", table.subTable(0, 0, 3, 3).cell(0, 2));
        assertEquals("thousand", table.subTable(0, 0, 3, 3).cell(2, 0));
        assertEquals("3", table.subTable(0, 0, 3, 3).cell(2, 2));
    }

    @Test(expected = IndexOutOfBoundsException.class)
    public void subTableThrowsForNegativeFromRow() {
        DataTable table = createSimpleTable();
        table.subTable(-1, 0, 1, 1);
    }

    @Test(expected = IndexOutOfBoundsException.class)
    public void subTableThrowsForNegativeFromColumn() {
        DataTable table = createSimpleTable();
        table.subTable(0, -1, 1, 1);
    }

    @Test(expected = IndexOutOfBoundsException.class)
    public void subTableThrowsForLargeToRow() {
        DataTable table = createSimpleTable();
        table.subTable(0, 0, 4, 1);
    }

    @Test(expected = IndexOutOfBoundsException.class)
    public void subTableThrowsForLargeToColumn() {
        DataTable table = createSimpleTable();
        table.subTable(0, 0, 1, 4);
    }

    @Test(expected = IllegalArgumentException.class)
    public void subTableThrowsForInvalidFromToRow() {
        DataTable table = createSimpleTable();
        table.subTable(2, 0, 1, 1);
    }

    @Test(expected = IllegalArgumentException.class)
    public void subTableThrowsForInvalidFromToColumn() {
        DataTable table = createSimpleTable();
        table.subTable(0, 2, 1, 1);
    }

    @Test(expected = IndexOutOfBoundsException.class)
    public void subTableThrowsForNegativeRow() {
        DataTable table = createSimpleTable();
        table.subTable(0, 0, 1, 1).cell(-1,0);
    }

    @Test(expected = IndexOutOfBoundsException.class)
    public void subTableThrowsForNegativeColumn() {
        DataTable table = createSimpleTable();
        table.subTable(0, 0, 1, 1).cell(0,-1);
    }


    @Test(expected = IndexOutOfBoundsException.class)
    public void subTableThrowsForLargeRow() {
        DataTable table = createSimpleTable();
        table.subTable(0, 0, 1, 1).cell(1,0);
    }

    @Test(expected = IndexOutOfBoundsException.class)
    public void subTableThrowsForLargeColumn() {
        DataTable table = createSimpleTable();
        table.subTable(0, 0, 1, 1).cell(0,1);
    }

    @Test
    public void emptySubTableIsEmpty() {
        List<List<String>> raw = asList(
            asList("ten", "10", "1"),
            asList("hundred", "100", "2"),
            asList("thousand", "1000", "3"));
        DataTable table = DataTable.create(raw);

        DataTable subTable = table.subTable(0, 3, 1, 3);

        assertEquals(emptyDataTable(), subTable);
        assertTrue(subTable.isEmpty());
        assertEquals(0, subTable.height());
        assertEquals(0, subTable.width());
        assertEquals(emptyList(), subTable.cells());
    }


    @Test
    public void rowsShouldViewSubSetOfRows() {
        List<List<String>> raw = asList(
            asList("ten", "10"),
            asList("hundred", "100"),
            asList("thousand", "1000")
        );

        DataTable table = DataTable.create(raw);

        assertEquals(
            asList(
                asList("hundred", "100"),
                asList("thousand", "1000")),
            table.rows(1).cells());

        assertEquals(
            DataTable.create(
                singletonList(
                    asList("hundred", "100"))),
            table.rows(1, 2));
    }


    @Test
    public void columnShouldViewSingleColumn() {
        List<List<String>> raw = asList(
            asList("hundred", "100", "2"),
            asList("thousand", "1000", "3"));

        DataTable table = DataTable.create(raw);

        assertEquals(
            asList("100", "1000"),
            table.column(1));
    }

    @Test(expected = IndexOutOfBoundsException.class)
    public void columnShouldThrowForNegativeColumnValue() {
        createSimpleTable().column(-1);
    }


    @Test(expected = IndexOutOfBoundsException.class)
    public void columnShouldThrowForNegativeRowValue() {
        createSimpleTable().column(0).get(-1);
    }

    @Test(expected = IndexOutOfBoundsException.class)
    public void columnShouldThrowForLargeColumnValue() {
        createSimpleTable().column(4);
    }

    @Test(expected = IndexOutOfBoundsException.class)
    public void columnShouldThrowForLargeRowValue() {
        createSimpleTable().column(0).get(4);
    }


    @Test
    public void transposedColumnShouldViewSingleRow() {
        List<List<String>> raw = asList(
            asList("hundred", "100", "2"),
            asList("thousand", "1000", "3"));

        DataTable table = DataTable.create(raw).transpose();

        assertEquals(
            asList("thousand", "1000", "3"),
            table.column(1));
    }

    @Test
    public void columnsShouldViewSubTable() {
        List<List<String>> raw = asList(
            asList("hundred", "100", "2"),
            asList("thousand", "1000", "3"));

        DataTable table = DataTable.create(raw);

        assertEquals(
            asList(
                asList("100", "2"),
                asList("1000", "3")),
            table.columns(1).cells());

        assertEquals(
            DataTable.create(
                asList(
                    singletonList("100"),
                    singletonList("1000"))),
            table.columns(1, 2));
    }

    @Test
    public void asListsShouldEqualRaw() {
        List<List<String>> raw = asList(asList("hundred", "100"), asList("thousand", "1000"));
        DataTable table = DataTable.create(raw);
        assertEquals(raw, table.asLists());
    }

    @Test
    public void emptyRowsAreIgnored() {
        DataTable table = createTable(Collections.<String>emptyList(), Collections.<String>emptyList());
        assertTrue(table.isEmpty());
        assertTrue(table.cells().isEmpty());
    }

    @Test
    public void cellsShouldHaveThreeColumnsAndTwoRows() {
        List<List<String>> raw = createSimpleTable().cells();
        assertEquals("Rows size", 2, raw.size());
        for (List<String> list : raw) {
            assertEquals("Cols size: " + list, 3, list.size());
        }
    }

    @Test
    public void transposedRawShouldHaveTwoColumnsAndThreeRows() {
        List<List<String>> raw = createSimpleTable().transpose().cells();
        assertEquals("Rows size", 3, raw.size());
        for (List<String> list : raw) {
            assertEquals("Cols size: " + list, 2, list.size());
        }
    }

    @Test(expected = IllegalArgumentException.class)
    public void canNotSupportNonRectangularTablesMissingColumn() {
        createTable(asList("one", "four", "seven"),
            asList("a1", "a4444"),
            asList("b1"));
    }

    @Test(expected = IllegalArgumentException.class)
    public void canNotSupportNonRectangularTablesExceedingColumn() {
        createTable(asList("one", "four", "seven"),
            asList("a1", "a4444", "b7777777", "zero"));
    }

    @Test
    public void canCreateTableFromListOfListOfString() {
        DataTable dataTable = createSimpleTable();
        List<List<String>> listOfListOfString = dataTable.cells();
        DataTable other = DataTable.create(listOfListOfString);
        assertEquals("" +
                "      | one  | four  | seven  |\n" +
                "      | 4444 | 55555 | 666666 |\n",
            other.toString());
    }

    @Test(expected = UnsupportedOperationException.class)
    public void cells_row_is_immutable() {
        createSimpleTable().cells().remove(0);
    }

    @Test(expected = UnsupportedOperationException.class)
    public void cells_col_is_immutable() {
        createSimpleTable().cells().get(0).remove(0);
    }


    @Test
    public void convert_delegates_to_converter() {
        DataTable table = createTable(asList("1", "100"), asList("2", "1000"));
        table.convert(Long.class, false);
        verify(tableConverter).convert(table, Long.class, false);
    }

    @Test
    public void asList_delegates_to_converter() {
        DataTable table = createTable(asList("1", "100"), asList("2", "1000"));
        table.asList(Long.class);
        verify(tableConverter).toList(table, Long.class);
    }

    @Test
    public void asLists_delegates_to_converter() {
        DataTable table = createTable(asList("1", "100"), asList("2", "1000"));
        table.asLists(Long.class);
        verify(tableConverter).toLists(table, Long.class);
    }

    @Test
    public void asLists_returns_raw() {
        List<List<String>> raw = asList(asList("1", "100"), asList("2", "1000"));
        DataTable table = DataTable.create(raw);
        assertEquals(raw, table.asLists());
    }

    @Test
    public void asMaps_delegates_to_converter() {
        DataTable table = createTable(asList("hundred", "100"), asList("thousand", "1000"));
        table.asMaps(String.class, Long.class);
        verify(tableConverter).toMaps(table, String.class, Long.class);
    }

    @Test
    public void asMaps_returns_maps_of_raw() {
        List<List<String>> raw = asList(asList("1", "100"), asList("2", "1000"));
        DataTable table = DataTable.create(raw);
        assertEquals(
            singletonList(
                new HashMap<String, String>() {{
                    put("1", "2");
                    put("100", "1000");
                }}
            ), table.asMaps());
    }

    @Test
    public void asMap_delegates_to_converter() {
        DataTable table = createTable(asList("hundred", "100"), asList("thousand", "1000"));
        table.asMap(String.class, Long.class);
        verify(tableConverter).toMap(table, String.class, Long.class);
    }

    @Test
    public void two_identical_tables_are_considered_equal() {
        assertEquals(createSimpleTable(), createSimpleTable());
        assertEquals(createSimpleTable().hashCode(), createSimpleTable().hashCode());
    }

    @Test
    public void two_identical_transposed_tables_are_considered_equal() {
        assertEquals(createSimpleTable().transpose(), createSimpleTable().transpose());
        assertEquals(createSimpleTable().transpose().hashCode(), createSimpleTable().transpose().hashCode());
    }

    @Test
    public void two_different_tables_are_considered_non_equal() {
        assertFalse(createSimpleTable().equals(createTable(asList("one"))));
        assertNotSame(createSimpleTable().hashCode(), createTable(asList("one")).hashCode());
    }

    @Test
    public void two_different_transposed_tables_are_considered_non_equal() {
        assertFalse(createSimpleTable().transpose().equals(createTable(asList("one")).transpose()));
        assertNotSame(createSimpleTable().transpose().hashCode(), createTable(asList("one")).transpose().hashCode());
    }

    @Test
    public void can_print_table_to_appendable() throws IOException {
        DataTable table = createSimpleTable();
        Appendable appendable = new StringBuilder();
        table.print(appendable);
        String expected = "" +
            "      | one  | four  | seven  |\n" +
            "      | 4444 | 55555 | 666666 |\n";
        assertEquals(expected, appendable.toString());
    }

    @Test
    public void can_print_table_to_string_builder() {
        DataTable table = createSimpleTable();
        StringBuilder appendable = new StringBuilder();
        table.print(appendable);
        String expected = "" +
            "      | one  | four  | seven  |\n" +
            "      | 4444 | 55555 | 666666 |\n";
        assertEquals(expected, appendable.toString());
    }

    @Test
    public void repeated_transposition_yields_original_table() {
        DataTable table = createSimpleTable();
        assertSame(table, table.transpose().transpose());
    }

    private DataTable createSimpleTable() {
        return createTable(asList("one", "four", "seven"), asList("4444", "55555", "666666"));
    }

    private DataTable createTable(List<String>... rows) {
        List<List<String>> table = asList(rows);
        return DataTable.create(table, tableConverter);
    }
}
