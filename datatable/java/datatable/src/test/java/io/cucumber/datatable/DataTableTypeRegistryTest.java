package io.cucumber.datatable;

import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Locale;
import java.util.Map;

import static io.cucumber.datatable.TypeFactory.aListOf;
import static io.cucumber.datatable.TypeFactory.constructType;
import static java.util.Collections.singletonList;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertSame;

public class DataTableTypeRegistryTest {

    private static final Type LIST_OF_LIST_OF_PLACE = aListOf(aListOf(Place.class));
    private static final Type LIST_OF_PLACE = aListOf(Place.class);
    private static final Type LIST_OF_LIST_OF_BIG_DECIMAL = aListOf(aListOf(BigDecimal.class));
    private static final Type LIST_OF_LIST_OF_BIG_INTEGER = aListOf(aListOf(BigInteger.class));
    private static final Type LIST_OF_LIST_OF_BYTE = aListOf(aListOf(Byte.class));
    private static final Type LIST_OF_LIST_OF_SHORT = aListOf(aListOf(Short.class));
    private static final Type LIST_OF_LIST_OF_INTEGER = aListOf(aListOf(Integer.class));
    private static final Type LIST_OF_LIST_OF_LONG = aListOf(aListOf(Long.class));
    private static final Type LIST_OF_LIST_OF_FLOAT = aListOf(aListOf(Float.class));
    private static final Type LIST_OF_LIST_OF_DOUBLE = aListOf(aListOf(Double.class));
    private static final Type LIST_OF_LIST_OF_STRING = aListOf(aListOf(String.class));
    
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

    @Test
    public void parse_decimal_with_english_locale() {
        DataTableTypeRegistry registry = new DataTableTypeRegistry(Locale.ENGLISH);
        DataTableType dataTableType = registry.lookupTableTypeByType(LIST_OF_LIST_OF_BIG_DECIMAL);
        assertEquals(
                singletonList(singletonList(new BigDecimal("2105.88"))),
                dataTableType.transform(singletonList(singletonList("2,105.88")))
        );
    }

    @Test
    public void parse_decimal_with_german_locale() {
        DataTableTypeRegistry registry = new DataTableTypeRegistry(Locale.GERMAN);
        DataTableType dataTableType = registry.lookupTableTypeByType(LIST_OF_LIST_OF_BIG_DECIMAL);
        assertEquals(
                singletonList(singletonList(new BigDecimal("2105.88"))),
                dataTableType.transform(singletonList(singletonList("2.105,88")))
        );

    }
    
    @Test
    public void empty_big_integer_transformed_to_null() {
        DataTableTypeRegistry registry = new DataTableTypeRegistry(Locale.ENGLISH);
        DataTableType dataTableType = registry.lookupTableTypeByType(LIST_OF_LIST_OF_BIG_INTEGER);
        assertEquals(
                singletonList(singletonList(null)),
                dataTableType.transform(singletonList(singletonList("")))
        );
        
    }
    
    @Test
    public void empty_big_decimal_transformed_to_null() {
        DataTableTypeRegistry registry = new DataTableTypeRegistry(Locale.ENGLISH);
        DataTableType dataTableType = registry.lookupTableTypeByType(LIST_OF_LIST_OF_BIG_DECIMAL);
        assertEquals(
                singletonList(singletonList(null)),
                dataTableType.transform(singletonList(singletonList("")))
        );
        
    }
    
    @Test
    public void empty_byte_transformed_to_null() {
        DataTableTypeRegistry registry = new DataTableTypeRegistry(Locale.ENGLISH);
        DataTableType dataTableType = registry.lookupTableTypeByType(LIST_OF_LIST_OF_BYTE);
        assertEquals(
                singletonList(singletonList(null)),
                dataTableType.transform(singletonList(singletonList("")))
        );
        
    }
    
    @Test
    public void empty_short_transformed_to_null() {
        DataTableTypeRegistry registry = new DataTableTypeRegistry(Locale.ENGLISH);
        DataTableType dataTableType = registry.lookupTableTypeByType(LIST_OF_LIST_OF_SHORT);
        assertEquals(
                singletonList(singletonList(null)),
                dataTableType.transform(singletonList(singletonList("")))
        );
        
    }
    
    @Test
    public void empty_integer_transformed_to_null() {
        DataTableTypeRegistry registry = new DataTableTypeRegistry(Locale.ENGLISH);
        DataTableType dataTableType = registry.lookupTableTypeByType(LIST_OF_LIST_OF_INTEGER);
        assertEquals(
                singletonList(singletonList(null)),
                dataTableType.transform(singletonList(singletonList("")))
        );
        
    }
    
    @Test
    public void empty_long_transformed_to_null() {
        DataTableTypeRegistry registry = new DataTableTypeRegistry(Locale.ENGLISH);
        DataTableType dataTableType = registry.lookupTableTypeByType(LIST_OF_LIST_OF_LONG);
        assertEquals(
                singletonList(singletonList(null)),
                dataTableType.transform(singletonList(singletonList("")))
        );
        
    }
    
    @Test
    public void empty_float_transformed_to_null() {
        DataTableTypeRegistry registry = new DataTableTypeRegistry(Locale.ENGLISH);
        DataTableType dataTableType = registry.lookupTableTypeByType(LIST_OF_LIST_OF_FLOAT);
        assertEquals(
                singletonList(singletonList(null)),
                dataTableType.transform(singletonList(singletonList("")))
        );
        
    }
    
    @Test
    public void empty_double_transformed_to_null() {
        DataTableTypeRegistry registry = new DataTableTypeRegistry(Locale.ENGLISH);
        DataTableType dataTableType = registry.lookupTableTypeByType(LIST_OF_LIST_OF_DOUBLE);
        assertEquals(
                singletonList(singletonList(null)),
                dataTableType.transform(singletonList(singletonList("")))
        );
        
    }
    
    /**
     * TODO in v5
     * To remain consistent the empty string should always be converted to null (so also for strings)
     * and doing this would be a breaking change.
     * Should be picked up with v5.
     */
    @Test
    public void empty_string_transformed_to_empty() {
        DataTableTypeRegistry registry = new DataTableTypeRegistry(Locale.ENGLISH);
        DataTableType dataTableType = registry.lookupTableTypeByType(LIST_OF_LIST_OF_STRING);
        assertEquals(
                singletonList(singletonList("")),
                dataTableType.transform(singletonList(singletonList("")))
        );
        
    }
}
