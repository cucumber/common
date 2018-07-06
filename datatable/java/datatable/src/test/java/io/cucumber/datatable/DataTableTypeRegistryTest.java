package io.cucumber.datatable;

import io.cucumber.datatable.dependency.com.fasterxml.jackson.databind.JavaType;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import java.util.Arrays;
import java.util.List;
import java.util.Locale;

import static io.cucumber.datatable.TypeFactory.aListOf;
import static io.cucumber.datatable.TypeFactory.constructType;
import static java.util.Collections.singletonList;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertSame;

public class DataTableTypeRegistryTest {

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
                "There is already a data table type registered for class io.cucumber.datatable.DataTableTypeRegistryTest$Place.\n" +
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
    public void returns_null_data_table_type_for_cell_if_no_default_registered() throws Exception {

        registerDefaultEntryTransformer();

        DataTableType lookupTableTypeByType = registry.lookupTableTypeByType(constructTypeForCell());

        assertNull(lookupTableTypeByType);
    }

    @Test
    public void returns_null_data_table_type_for_entry_if_no_default_registered() throws Exception {

        registerDefaultCellTransformer();

        DataTableType lookupTableTypeByType = registry.lookupTableTypeByType(constructTypeForEntry());

        assertNull(lookupTableTypeByType);
    }



    @SuppressWarnings({"unchecked", "ConstantConditions"})
    @Test
    public void returns_default_data_table_type_for_cell_if_none_match_and_default_registered() {

        registerCellEntryAndDefaults();

        String here="here";
        DataTableType lookupTableTypeByTypeForCell = registry.lookupTableTypeByType(constructTypeForCell());
        List<List<Place>> transformedCells = (List<List<Place>>) lookupTableTypeByTypeForCell.transform(singletonList(singletonList(here)));

        assertEquals(1,transformedCells.size());
        assertEquals(1,transformedCells.get(0).size());
        assertEquals(here,transformedCells.get(0).get(0).name);
    }

    @SuppressWarnings({"unchecked", "ConstantConditions"})
    @Test
    public void returns_default_data_table_type_for_entry_if_none_match_and_default_registered() {

        registerCellEntryAndDefaults();

        DataTableType lookupTableTypeByTypeForEntry = registry.lookupTableTypeByType(aListOf(Place.class));

        String here="here";
        List<Place> transformedEntries = (List<Place>) lookupTableTypeByTypeForEntry.transform(Arrays.asList(Arrays.asList("name","index of place"), Arrays.asList(here,"20")));
        assertEquals(1,transformedEntries.size());
        assertEquals(here,transformedEntries.get(0).name);
        assertEquals(20,transformedEntries.get(0).indexOfPlace);
    }

    @Test
    public void returns_cell_data_table_type() {

        DataTableType cell = DataTableType.cell(Place.class);
        registry.defineDataTableType(cell);
        registry.defineDataTableType(DataTableType.entry(Place.class));

        DataTableType lookupTableTypeByType = registry.lookupTableTypeByType(constructTypeForCell());

        assertSame(cell,lookupTableTypeByType);
    }

    @Test
    public void returns_entry_data_table_type() {

        registry.defineDataTableType(DataTableType.cell(Place.class));
        DataTableType entry = DataTableType.entry(Place.class);
        registry.defineDataTableType(entry);

        DataTableType lookupTableTypeByType = registry.lookupTableTypeByType(aListOf(Place.class));

        assertSame(entry, lookupTableTypeByType);
    }

    private JavaType constructTypeForCell() {
        return aListOf(aListOf(Place.class));
    }

    private JavaType constructTypeForEntry() {
        return aListOf(Place.class);
    }

    private void registerCellEntryAndDefaults()  {
        registry.defineDataTableType(DataTableType.cell(DataTableTypeRegistryTest.class));
        registry.defineDataTableType(DataTableType.entry(DataTableTypeRegistryTest.class));
        registerDefaultCellTransformer();
        registerDefaultEntryTransformer();
    }

    private void registerDefaultCellTransformer() {
        registry.setDefaultDataTableCellTransformer(new TableCellByTypeTransformer() {
            @Override
            public <T> T transform(String value, Class<T> cellType) throws Throwable {
                return (T) new Place(value);
            }
        });
    }

    private void registerDefaultEntryTransformer() {
        registry.setDefaultDataTableEntryTransformer(new SimpleDefaultDataTableEntryTransformer(new SimpleDefaultDataTableEntryTransformer.DefaultInstanceCreator()));
    }


    static class Place {

        String name;
        int indexOfPlace;

        Place(String name) {
            this.name = name;
        }

        Place() {
        }
    }
}
