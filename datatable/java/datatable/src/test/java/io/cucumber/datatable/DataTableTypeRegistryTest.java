package io.cucumber.datatable;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;

import java.lang.reflect.Type;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Locale;
import java.util.Map;

import static io.cucumber.datatable.TypeFactory.aListOf;
import static io.cucumber.datatable.TypeFactory.constructType;
import static java.util.Collections.singletonList;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.*;

class DataTableTypeRegistryTest {

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
    private static final Type LIST_OF_LIST_OF_OBJECT = aListOf(aListOf(Object.class));

    private static final TableCellByTypeTransformer PLACE_TABLE_CELL_TRANSFORMER =
            (value, cellType) -> new Place(value);
    private static final TableEntryByTypeTransformer PLACE_TABLE_ENTRY_TRANSFORMER =
            (entry, type, cellTransformer) -> new Place(entry.get("name"), Integer.parseInt(entry.get("index of place")));
    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();
    private static final DataTableType CELL = new DataTableType(Place.class, (String cell) ->
            OBJECT_MAPPER.convertValue(cell, Place.class));
    private static final DataTableType ENTRY = new DataTableType(Place.class, (Map<String, String> entry) ->
            OBJECT_MAPPER.convertValue(entry, Place.class));

    private final DataTableTypeRegistry registry = new DataTableTypeRegistry(Locale.ENGLISH);

    @Test
    void throws_duplicate_type_exception() {

        registry.defineDataTableType(new DataTableType(
                Place.class,
                (TableTransformer<Place>) table -> new Place(table.cell(0, 0))
        ));

        DuplicateTypeException exception = assertThrows(DuplicateTypeException.class, () ->
                registry.defineDataTableType(new DataTableType(
                        Place.class,
                        (TableTransformer<Place>) table -> new Place(table.cell(0, 0))
                )));

        assertThat(exception.getMessage(), is("" +
                "There already is a data table type registered that can supply class io.cucumber.datatable.Place.\n" +
                "You are trying to register a TableTransformer for class io.cucumber.datatable.Place.\n" +
                "The existing data table type registered a TableTransformer for class io.cucumber.datatable.Place.\n"
        ));
    }

    @Test
    void returns_null_data_table_type_if_none_match_and_no_default_registered() {

        registry.defineDataTableType(CELL);
        registry.defineDataTableType(ENTRY);

        DataTableType lookupTableTypeByType = registry.lookupTableTypeByType(constructType(Place.class));

        assertNull(lookupTableTypeByType);
    }

    @Test
    void returns_null_data_table_type_for_cell_if_no_default_registered() {

        registry.setDefaultDataTableEntryTransformer(PLACE_TABLE_ENTRY_TRANSFORMER);

        DataTableType lookupTableTypeByType = registry.lookupTableTypeByType(LIST_OF_LIST_OF_PLACE);

        assertNull(lookupTableTypeByType);
    }

    @Test
    void returns_null_data_table_type_for_entry_if_no_default_registered() {

        registry.setDefaultDataTableCellTransformer(PLACE_TABLE_CELL_TRANSFORMER);


        DataTableType lookupTableTypeByType = registry.lookupTableTypeByType(LIST_OF_PLACE);

        assertNull(lookupTableTypeByType);
    }

    @Test
    void returns_cell_data_table_type() {

        DataTableType cell = CELL;
        registry.defineDataTableType(cell);
        registry.defineDataTableType(ENTRY);

        DataTableType lookupTableTypeByType = registry.lookupTableTypeByType(LIST_OF_LIST_OF_PLACE);

        assertSame(cell, lookupTableTypeByType);
    }

    @Test
    void returns_entry_data_table_type() {

        registry.defineDataTableType(CELL);
        registry.defineDataTableType(ENTRY);

        DataTableType lookupTableTypeByType = registry.lookupTableTypeByType(LIST_OF_PLACE);

        assertSame(ENTRY, lookupTableTypeByType);
    }

    @Test
    void parse_decimal_with_english_locale() {
        DataTableTypeRegistry registry = new DataTableTypeRegistry(Locale.ENGLISH);
        DataTableType dataTableType = registry.lookupTableTypeByType(LIST_OF_LIST_OF_BIG_DECIMAL);
        assertEquals(
                singletonList(singletonList(new BigDecimal("2105.88"))),
                dataTableType.transform(singletonList(singletonList("2,105.88")))
        );
    }

    @Test
    void parse_decimal_with_german_locale() {
        DataTableTypeRegistry registry = new DataTableTypeRegistry(Locale.GERMAN);
        DataTableType dataTableType = registry.lookupTableTypeByType(LIST_OF_LIST_OF_BIG_DECIMAL);
        assertEquals(
                singletonList(singletonList(new BigDecimal("2105.88"))),
                dataTableType.transform(singletonList(singletonList("2.105,88")))
        );

    }

    @Test
    void null_big_integer_transformed_to_null() {
        DataTableTypeRegistry registry = new DataTableTypeRegistry(Locale.ENGLISH);
        DataTableType dataTableType = registry.lookupTableTypeByType(LIST_OF_LIST_OF_BIG_INTEGER);
        assertEquals(
                singletonList(singletonList(null)),
                dataTableType.transform(singletonList(singletonList(null)))
        );

    }

    @Test
    void null_big_decimal_transformed_to_null() {
        DataTableTypeRegistry registry = new DataTableTypeRegistry(Locale.ENGLISH);
        DataTableType dataTableType = registry.lookupTableTypeByType(LIST_OF_LIST_OF_BIG_DECIMAL);
        assertEquals(
                singletonList(singletonList(null)),
                dataTableType.transform(singletonList(singletonList(null)))
        );

    }

    @Test
    void null_byte_transformed_to_null() {
        DataTableTypeRegistry registry = new DataTableTypeRegistry(Locale.ENGLISH);
        DataTableType dataTableType = registry.lookupTableTypeByType(LIST_OF_LIST_OF_BYTE);
        assertEquals(
                singletonList(singletonList(null)),
                dataTableType.transform(singletonList(singletonList(null)))
        );

    }

    @Test
    void null_short_transformed_to_null() {
        DataTableTypeRegistry registry = new DataTableTypeRegistry(Locale.ENGLISH);
        DataTableType dataTableType = registry.lookupTableTypeByType(LIST_OF_LIST_OF_SHORT);
        assertEquals(
                singletonList(singletonList(null)),
                dataTableType.transform(singletonList(singletonList(null)))
        );

    }

    @Test
    void null_integer_transformed_to_null() {
        DataTableTypeRegistry registry = new DataTableTypeRegistry(Locale.ENGLISH);
        DataTableType dataTableType = registry.lookupTableTypeByType(LIST_OF_LIST_OF_INTEGER);
        assertEquals(
                singletonList(singletonList(null)),
                dataTableType.transform(singletonList(singletonList(null)))
        );

    }

    @Test
    void null_long_transformed_to_null() {
        DataTableTypeRegistry registry = new DataTableTypeRegistry(Locale.ENGLISH);
        DataTableType dataTableType = registry.lookupTableTypeByType(LIST_OF_LIST_OF_LONG);
        assertEquals(
                singletonList(singletonList(null)),
                dataTableType.transform(singletonList(singletonList(null)))
        );

    }

    @Test
    void null_float_transformed_to_null() {
        DataTableTypeRegistry registry = new DataTableTypeRegistry(Locale.ENGLISH);
        DataTableType dataTableType = registry.lookupTableTypeByType(LIST_OF_LIST_OF_FLOAT);
        assertEquals(
                singletonList(singletonList(null)),
                dataTableType.transform(singletonList(singletonList(null)))
        );

    }

    @Test
    void null_double_transformed_to_null() {
        DataTableTypeRegistry registry = new DataTableTypeRegistry(Locale.ENGLISH);
        DataTableType dataTableType = registry.lookupTableTypeByType(LIST_OF_LIST_OF_DOUBLE);
        assertEquals(
                singletonList(singletonList(null)),
                dataTableType.transform(singletonList(singletonList(null)))
        );

    }

    @Test
    void null_string_transformed_to_null() {
        DataTableTypeRegistry registry = new DataTableTypeRegistry(Locale.ENGLISH);
        DataTableType dataTableType = registry.lookupTableTypeByType(LIST_OF_LIST_OF_STRING);
        assertEquals(
                singletonList(singletonList(null)),
                dataTableType.transform(singletonList(singletonList(null)))
        );
    }

    @Test
    void string_transformer_is_replaceable() {
        DataTableTypeRegistry registry = new DataTableTypeRegistry(Locale.ENGLISH);
        registry.defineDataTableType(new DataTableType(String.class, (String cell) -> "[blank]".equals(cell) ? "" : cell));
        DataTableType dataTableType = registry.lookupTableTypeByType(LIST_OF_LIST_OF_STRING);
        assertEquals(
                singletonList(singletonList("")),
                dataTableType.transform(singletonList(singletonList("[blank]")))
        );
    }

    @Test
    void object_transformer_is_replaceable() {
        DataTableTypeRegistry registry = new DataTableTypeRegistry(Locale.ENGLISH);
        registry.defineDataTableType(new DataTableType(Object.class, (String cell) -> "[blank]".equals(cell) ? "" : cell));
        DataTableType dataTableType = registry.lookupTableTypeByType(LIST_OF_LIST_OF_OBJECT);
        assertEquals(
                singletonList(singletonList("")),
                dataTableType.transform(singletonList(singletonList("[blank]")))
        );
    }
}
