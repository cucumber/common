package io.cucumber.datatable;

import io.cucumber.datatable.DataTable.TableConverter;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static io.cucumber.datatable.DataTable.emptyDataTable;
import static io.cucumber.datatable.TableParser.parse;
import static io.cucumber.datatable.TypeFactory.typeName;
import static java.lang.String.format;
import static java.util.Arrays.asList;
import static java.util.Collections.emptyList;
import static java.util.Collections.singletonList;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class DataTableTest {

    @Mock
    private TableConverter tableConverter;

    @Test
    void empty_table_is_empty() {
        DataTable table = emptyDataTable();
        assertTrue(table.isEmpty());
        assertTrue(table.cells().isEmpty());
    }

    @Test
    void can_modify_data_tables() {
        List<List<String>> raw = singletonList(emptyList());
        DataTable table = DataTable.create(raw, tableConverter);
        DataTable lowerCaseTable = DataTable.create(
                raw.stream()
                        .map(row -> row.stream()
                                .map(String::toLowerCase)
                                .collect(Collectors.toList()))
                        .collect(Collectors.toList()),
                table.getTableConverter()
        );
        assertSame(tableConverter, lowerCaseTable.getTableConverter());
    }

    @Test
    void raw_should_equal_raw() {
        List<List<String>> raw = asList(asList("hundred", "100"), asList("thousand", "1000"));
        DataTable table = DataTable.create(raw);
        assertEquals(raw, table.cells());
    }

    @Test
    void raw_may_contain_nulls() {
        List<List<String>> raw = asList(asList(null, null), asList(null, null));
        DataTable table = DataTable.create(raw);
        assertEquals(raw, table.cells());
    }

    @Test
    void cells_should_equal_raw() {
        List<List<String>> raw = asList(asList("hundred", "100"), asList("thousand", "1000"));
        DataTable table = DataTable.create(raw);
        assertEquals(raw, table.cells());
    }

    @Test
    void cell_should_get_from__raw() {
        List<List<String>> raw = asList(asList("hundred", "100"), asList("thousand", "1000"));
        DataTable table = DataTable.create(raw);
        assertEquals(raw.get(0).get(0), table.cell(0, 0));
        assertEquals(raw.get(0).get(1), table.cell(0, 1));
        assertEquals(raw.get(1).get(0), table.cell(1, 0));
        assertEquals(raw.get(1).get(1), table.cell(1, 1));
    }


    @Test
    void subTable_should_view_sub_set_of_cells() {
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
                table.subTable(1, 1).cells());

        assertEquals(table.cells(),
                table.subTable(0, 0).cells());

        assertEquals("ten", table.subTable(0, 0, 3, 3).cell(0, 0));
        assertEquals("1", table.subTable(0, 0).cell(0, 2));
        assertEquals("thousand", table.subTable(0, 0, 3, 3).cell(2, 0));
        assertEquals("3", table.subTable(0, 0).cell(2, 2));
    }

    @Test
    void subTable_throws_for_negative_from_row() {
        DataTable table = createSimpleTable();
        assertThrows(IndexOutOfBoundsException.class, () -> table.subTable(-1, 0, 1, 1));
    }

    @Test
    void subTable_throws_for_negative_from_column() {
        DataTable table = createSimpleTable();
        assertThrows(IndexOutOfBoundsException.class, () -> table.subTable(0, -1, 1, 1));
    }

    @Test
    void subTable_throws_for_large_to_row() {
        DataTable table = createSimpleTable();
        assertThrows(IndexOutOfBoundsException.class, () -> table.subTable(0, 0, 4, 1));
    }

    @Test
    void subTable_throws_for_large_to_column() {
        DataTable table = createSimpleTable();
        assertThrows(IndexOutOfBoundsException.class, () -> table.subTable(0, 0, 1, 4));
    }

    @Test
    void subTable_throws_for_invalid_from_to_row() {
        DataTable table = createSimpleTable();
        assertThrows(IllegalArgumentException.class, () -> table.subTable(2, 0, 1, 1));
    }

    @Test
    void subTable_throws_for_invalid_from_to_column() {
        DataTable table = createSimpleTable();
        assertThrows(IllegalArgumentException.class, () -> table.subTable(0, 2, 1, 1));
    }

    @Test
    void subTable_throws_for_negative_row() {
        DataTable table = createSimpleTable();
        assertThrows(IndexOutOfBoundsException.class, () -> table.subTable(0, 0, 1, 1).cell(-1, 0));

    }

    @Test
    void subTable_throws_for_negative_column() {
        DataTable table = createSimpleTable();
        assertThrows(IndexOutOfBoundsException.class, () -> table.subTable(0, 0, 1, 1).cell(0, -1));

    }


    @Test
    void subTable_throws_for_large_row() {
        DataTable table = createSimpleTable();
        assertThrows(IndexOutOfBoundsException.class, () -> table.subTable(0, 0, 1, 1).cell(1, 0));

    }

    @Test
    void subTable_throws_for_large_column() {
        DataTable table = createSimpleTable();
        assertThrows(IndexOutOfBoundsException.class, () -> table.subTable(0, 0, 1, 1).cell(0, 1));

    }

    @Test
    void empty_subTable_is_empty() {
        DataTable table = getSimpleTable();

        DataTable subTable = table.subTable(0, 3, 1, 3);

        assertEquals(emptyDataTable(), subTable);
        assertTrue(subTable.isEmpty());
        assertEquals(0, subTable.height());
        assertEquals(0, subTable.width());
        assertEquals(emptyList(), subTable.cells());
    }

    private DataTable getSimpleTable() {
        List<List<String>> raw = asList(
                asList("ten", "10", "1"),
                asList("hundred", "100", "2"),
                asList("thousand", "1000", "3"));
        return DataTable.create(raw);
    }

    @Test
    void row_gets_a_row() {
        List<List<String>> raw = asList(
                asList("ten", "10", "1"),
                asList("hundred", "100", "2"),
                asList("thousand", "1000", "3"));
        DataTable table = DataTable.create(raw);
        assertEquals(raw.get(2), table.row(2));
    }


    @Test
    void rows_should_view_sub_set_of_rows() {
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
    void column_should_view_single_column() {
        List<List<String>> raw = asList(
                asList("hundred", "100", "2"),
                asList("thousand", "1000", "3"));

        DataTable table = DataTable.create(raw);

        assertEquals(
                asList("100", "1000"),
                table.column(1));
    }

    @Test
    void column_should_throw_for_negative_column_value() {
        assertThrows(IndexOutOfBoundsException.class, () -> createSimpleTable().column(-1));
    }


    @Test
    void column_should_throw_for_negative_row_value() {
        assertThrows(IndexOutOfBoundsException.class, () -> createSimpleTable().column(0).get(-1));
    }

    @Test
    void column_should_throw_for_large_column_value() {
        assertThrows(IndexOutOfBoundsException.class, () -> createSimpleTable().column(4));
    }

    @Test
    void column_should_throw_for_large_row_value() {
        assertThrows(IndexOutOfBoundsException.class, () -> createSimpleTable().column(0).get(4));
    }


    @Test
    void transposedColumn_should_view_single_row() {
        List<List<String>> raw = asList(
                asList("hundred", "100", "2"),
                asList("thousand", "1000", "3"));

        DataTable table = DataTable.create(raw).transpose();

        assertEquals(
                asList("thousand", "1000", "3"),
                table.column(1));
    }

    @Test
    void columns_should_view_sub_table() {
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
    void as_lists_should_equal_raw() {
        List<List<String>> raw = asList(asList("hundred", "100"), asList("thousand", "1000"));
        DataTable table = DataTable.create(raw);
        assertEquals(raw, table.asLists());
    }

    @Test
    void empty_rows_are_ignored() {
        List<List<String>> table1 = asList(emptyList(), emptyList());
        DataTable table = DataTable.create(table1, tableConverter);
        assertTrue(table.isEmpty());
        assertTrue(table.cells().isEmpty());
    }

    @Test
    void cells_should_have_three_columns_and_two_rows() {
        List<List<String>> raw = createSimpleTable().cells();
        assertEquals(2, raw.size(), "Rows size");
        for (List<String> list : raw) {
            assertEquals(3, list.size(), "Cols size: " + list);
        }
    }

    @Test
    void transposed_raw_should_have_two_columns_and_three_rows() {
        List<List<String>> raw = createSimpleTable().transpose().cells();
        assertEquals(3, raw.size(), "Rows size");
        for (List<String> list : raw) {
            assertEquals(2, list.size(), "Cols size: " + list);
        }
    }

    @Test
    void can_not_support_non_rectangular_tables_missing_column() {
        List<List<String>> raw = asList(
                asList("one", "four", "seven"),
                asList("a1", "a4444"),
                asList("b1")
        );
        assertThrows(IllegalArgumentException.class, () -> DataTable.create(raw, tableConverter));
    }

    @Test
    void can_not_support_non_rectangular_tables_exceeding_column() {
        List<List<String>> table = asList(
                asList("one", "four", "seven"),
                asList("a1", "a4444", "b7777777", "zero")
        );
        assertThrows(IllegalArgumentException.class, () -> DataTable.create(table, tableConverter));
    }

    @Test
    void can_create_table_from_list_of_list_of_string() {
        DataTable dataTable = createSimpleTable();
        List<List<String>> listOfListOfString = dataTable.cells();
        DataTable other = DataTable.create(listOfListOfString);
        assertEquals("" +
                        "      | one  | four  | seven  |\n" +
                        "      | 4444 | 55555 | 666666 |\n",
                other.toString());
    }

    @Test
    void can_print_table_with_empty_cells() {
        DataTable dataTable = DataTable.create(singletonList(singletonList("")));
        List<List<String>> listOfListOfString = dataTable.cells();
        DataTable other = DataTable.create(listOfListOfString);
        assertEquals("      | [empty] |\n",
                other.toString());
    }

    @Test
    void can_print_table_with_null_cells() {
        DataTable dataTable = DataTable.create(singletonList(singletonList(null)));
        List<List<String>> listOfListOfString = dataTable.cells();
        DataTable other = DataTable.create(listOfListOfString);
        assertEquals("      |  |\n",
                other.toString());
    }

    @Test
    void cells_row_is_immutable() {
        assertThrows(UnsupportedOperationException.class, () -> createSimpleTable().cells().remove(0));
    }

    @Test
    void cells_col_is_immutable() {
        assertThrows(UnsupportedOperationException.class, () -> createSimpleTable().cells().get(0).remove(0));
    }

    @Test
    void convert_delegates_to_converter() {
        DataTable table = createSimpleNumberTable();
        table.convert(Long.class, false);
        verify(tableConverter).convert(table, Long.class, false);
    }

    @Test
    void asLists_returns_raw_rows_in_order() {
        List<List<String>> raw = asList(
                asList("1", "100"),
                asList("2", "1000")
        );
        DataTable table = DataTable.create(raw);
        assertEquals(asList("1", "100", "2", "1000"), table.asList());
    }

    @Test
    void asLists_throws_for_large_index() {
        List<List<String>> raw = asList(
                asList("1", "100"),
                asList("2", "1000")
        );
        DataTable table = DataTable.create(raw);
        assertThrows(IndexOutOfBoundsException.class, () -> table.asList().get(5));
    }

    @Test
    void asLists_throws_for_negative_index() {
        List<List<String>> raw = asList(
                asList("1", "100"),
                asList("2", "1000")
        );
        DataTable table = DataTable.create(raw);
        assertThrows(IndexOutOfBoundsException.class, () -> table.asList().get(-1));
    }

    @Test
    void asList_delegates_to_converter() {
        DataTable table = createSimpleNumberTable();
        table.asList(Long.class);
        verify(tableConverter).toList(table, Long.class);
    }

    @Test
    void asLists_delegates_to_converter() {
        DataTable table = createSimpleNumberTable();
        table.asLists(Long.class);
        verify(tableConverter).toLists(table, Long.class);
    }

    @Test
    void asLists_returns_raw() {
        List<List<String>> raw = asList(
                asList("1", "100"),
                asList("2", "1000")
        );
        DataTable table = DataTable.create(raw);
        assertEquals(raw, table.asLists());
    }

    @Test
    void asMaps_delegates_to_converter() {
        List<List<String>> table1 = asList(asList("hundred", "100"), asList("thousand", "1000"));
        DataTable table = DataTable.create(table1, tableConverter);
        table.asMaps(String.class, Long.class);
        verify(tableConverter).toMaps(table, String.class, Long.class);
    }

    @Test
    void asMaps_returns_maps_of_raw() {
        DataTable table = createSimpleNumberTable();
        Map<String, String> expected = new HashMap<String, String>() {{
            put("1", "2");
            put("100", "1000");
        }};

        assertEquals(singletonList(expected), table.asMaps());
    }

    @Test
    void asMaps_can_convert_table_with_null_values() {
        DataTable table = DataTable.create(asList(
                asList("1", "2"),
                asList(null, null)
        ));

        Map<String, String> expected = new HashMap<String, String>() {{
            put("1", null);
            put("2", null);
        }};

        assertEquals(singletonList(expected), table.asMaps());
    }

    @Test
    void asMaps_cant_convert_table_with_duplicate_keys() {
        DataTable table = parse("",
                "| 1 | 1 | 1 |",
                "| 4 | 5 | 6 |",
                "| 7 | 8 | 9 |"
        );

        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                table::asMaps
        );

        assertThat(exception.getMessage(), is(format("" +
                        "Can't convert DataTable to Map<%s, %s>. " +
                        "Encountered duplicate key 1 with values 4 and 5",
                typeName(String.class), typeName(String.class))));
    }

    @Test
    void asMaps_cant_convert_table_with_duplicate_null_keys() {
        DataTable table = DataTable.create(asList(
                asList(null, null),
                asList("1", "2")
        ));

        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                table::asMaps
        );
        assertThat(exception.getMessage(), is(format("" +
                        "Can't convert DataTable to Map<%s, %s>. " +
                        "Encountered duplicate key null with values 1 and 2",
                typeName(String.class), typeName(String.class))));
    }

    @Test
    void asMaps_with_nulls_returns_maps_of_raw() {
        DataTable table = DataTable.create(asList(singletonList(null), singletonList(null)));
        Map<String, String> expected = new HashMap<String, String>() {{
            put(null, null);
        }};

        assertEquals(singletonList(expected), table.asMaps());
    }

    @Test
    void asMap_delegates_to_converter() {
        List<List<String>> table1 = asList(asList("hundred", "100"), asList("thousand", "1000"));
        DataTable table = DataTable.create(table1, tableConverter);
        table.asMap(String.class, Long.class);
        verify(tableConverter).toMap(table, String.class, Long.class);
    }

    @Test
    void two_identical_tables_are_considered_equal() {
        assertEquals(createSimpleTable(), createSimpleTable());
        assertEquals(createSimpleTable().hashCode(), createSimpleTable().hashCode());
    }

    @Test
    void two_identical_transposed_tables_are_considered_equal() {
        assertEquals(createSimpleTable().transpose(), createSimpleTable().transpose());
        assertEquals(createSimpleTable().transpose().hashCode(), createSimpleTable().transpose().hashCode());
    }

    @Test
    void two_different_tables_are_considered_non_equal() {
        assertNotEquals(createSimpleTable(), createSimpleNumberTable());
        assertNotEquals(createSimpleTable().hashCode(), createSimpleNumberTable().hashCode());
    }

    @Test
    void two_different_transposed_tables_are_considered_non_equal() {
        assertNotEquals(createSimpleTable().transpose(), createSimpleNumberTable().transpose());
        assertNotEquals(createSimpleTable().transpose().hashCode(), createSimpleNumberTable().transpose().hashCode());
    }

    @Test
    void can_print_table_to_appendable() throws IOException {
        DataTable table = createSimpleTable();
        Appendable appendable = new StringBuilder();
        table.print(appendable);
        String expected = "" +
                "      | one  | four  | seven  |\n" +
                "      | 4444 | 55555 | 666666 |\n";
        assertEquals(expected, appendable.toString());
    }

    @Test
    void can_print_table_to_string_builder() {
        DataTable table = createSimpleTable();
        StringBuilder appendable = new StringBuilder();
        table.print(appendable);
        String expected = "" +
                "      | one  | four  | seven  |\n" +
                "      | 4444 | 55555 | 666666 |\n";
        assertEquals(expected, appendable.toString());
    }

    @Test
    void repeated_transposition_yields_original_table() {
        DataTable table = createSimpleTable();
        assertSame(table, table.transpose().transpose());
    }

    private DataTable createSimpleTable() {
        List<List<String>> raw = asList(
                asList("one", "four", "seven"),
                asList("4444", "55555", "666666")
        );
        return DataTable.create(raw, tableConverter);
    }

    private DataTable createSimpleNumberTable() {
        List<List<String>> raw = asList(
                asList("1", "100"),
                asList("2", "1000")
        );
        return DataTable.create(raw, tableConverter);
    }


}
