package io.cucumber.datatable;

import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import java.lang.reflect.Type;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import static io.cucumber.datatable.TypeFactory.aListOf;
import static io.cucumber.datatable.TypeFactory.constructType;
import static java.util.Arrays.asList;
import static java.util.Collections.singletonList;
import static java.util.Objects.requireNonNull;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertSame;

public class DataTableTypeRegistryTest {

    private static final Type LIST_OF_LIST_OF_PLACE = aListOf(aListOf(Place.class));
    private static final Type LIST_OF_PLACE = aListOf(Place.class);
    private static final TableCellByTypeTransformer PLACE_TABLE_CELL_TRANSFORMER = new TableCellByTypeTransformer() {
        @Override
        @SuppressWarnings("unchecked")
        public <T> T transform(String value, Class<T> cellType) {
            return (T) new Place(value);
        }
    };
    private static final TableEntryByTypeTransformer PLACE_TABLE_ENTRY_TRANSFORMER = new TableEntryByTypeTransformer() {
        @Override
        @SuppressWarnings("unchecked")
        public <T> T transform(Map<String, String> entry, Class<T> type, TableCellByTypeTransformer cellTransformer) {
            return (T) new Place(entry.get("name"), Integer.valueOf(entry.get("index of place")));
        }
    };

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    private final DataTableTypeRegistry registry = new DataTableTypeRegistry(Locale.ENGLISH);


    @Test
    public void throws_duplicate_type_exception() {

        registry.defineDataTableType(new DataTableType(Place.class, new TableTransformer<Place>() {
            @Override
            public Place transform(DataTable table) {
                return new Place(table.cell(0, 0));
            }

        }));
        expectedException.expectMessage("" +
                "There is already a data table type registered for class io.cucumber.datatable.Place.\n" +
                "It registered an TableTransformer. You are trying to add a TableTransformer"
        );
        registry.defineDataTableType(new DataTableType(Place.class, new TableTransformer<Place>() {
            @Override
            public Place transform(DataTable table) {
                return new Place(table.cell(0, 0));
            }
        }));
    }

    @Test
    public void returns_null_data_table_type_if_none_match_and_no_default_registered() {

        registry.defineDataTableType(DataTableType.cell(Place.class));
        registry.defineDataTableType(DataTableType.entry(Place.class));

        DataTableType lookupTableTypeByType = registry.lookupTableTypeByType(constructType(Place.class));

        assertNull(lookupTableTypeByType);
    }

    @Test
    public void returns_null_data_table_type_for_cell_if_no_default_registered() {

        registry.setDefaultDataTableEntryTransformer(PLACE_TABLE_ENTRY_TRANSFORMER);

        DataTableType lookupTableTypeByType = registry.lookupTableTypeByType(LIST_OF_LIST_OF_PLACE);

        assertNull(lookupTableTypeByType);
    }

    @Test
    public void returns_null_data_table_type_for_entry_if_no_default_registered() {

        registry.setDefaultDataTableCellTransformer(PLACE_TABLE_CELL_TRANSFORMER);


        DataTableType lookupTableTypeByType = registry.lookupTableTypeByType(LIST_OF_PLACE);

        assertNull(lookupTableTypeByType);
    }


    @Test
    @SuppressWarnings("unchecked")
    public void returns_default_data_table_type_for_cell_if_none_match_and_default_registered() {

        registry.defineDataTableType(DataTableType.cell(DataTableTypeRegistryTest.class));
        registry.defineDataTableType(DataTableType.entry(DataTableTypeRegistryTest.class));
        registry.setDefaultDataTableCellTransformer(PLACE_TABLE_CELL_TRANSFORMER);
        registry.setDefaultDataTableEntryTransformer(PLACE_TABLE_ENTRY_TRANSFORMER);

        DataTableType dataTableType = requireNonNull(registry.lookupTableTypeByType(LIST_OF_LIST_OF_PLACE));
        List<List<Place>> transformedCells = (List<List<Place>>) dataTableType.transform(singletonList(singletonList("here")));

        assertEquals(singletonList(singletonList(new Place("here"))), transformedCells);

    }

    @Test
    @SuppressWarnings("unchecked")
    public void returns_default_data_table_type_for_entry_if_none_match_and_default_registered() {

        registry.defineDataTableType(DataTableType.cell(DataTableTypeRegistryTest.class));
        registry.defineDataTableType(DataTableType.entry(DataTableTypeRegistryTest.class));
        registry.setDefaultDataTableCellTransformer(PLACE_TABLE_CELL_TRANSFORMER);
        registry.setDefaultDataTableEntryTransformer(PLACE_TABLE_ENTRY_TRANSFORMER);

        DataTableType dataTableType = requireNonNull(registry.lookupTableTypeByType(LIST_OF_PLACE));

        List<Place> transformedEntries = (List<Place>) dataTableType.transform(asList(asList("name","index of place"), asList("here","20")));

        assertEquals(singletonList(new Place("here", 20)), transformedEntries);
    }

    @Test
    public void returns_cell_data_table_type() {

        DataTableType cell = DataTableType.cell(Place.class);
        registry.defineDataTableType(cell);
        registry.defineDataTableType(DataTableType.entry(Place.class));

        DataTableType lookupTableTypeByType = registry.lookupTableTypeByType(LIST_OF_LIST_OF_PLACE);

        assertSame(cell, lookupTableTypeByType);
    }

    @Test
    public void returns_entry_data_table_type() {

        registry.defineDataTableType(DataTableType.cell(Place.class));
        DataTableType entry = DataTableType.entry(Place.class);
        registry.defineDataTableType(entry);

        DataTableType lookupTableTypeByType = registry.lookupTableTypeByType(LIST_OF_PLACE);

        assertSame(entry, lookupTableTypeByType);
    }
}
