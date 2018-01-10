package io.cucumber.datatable;

import io.cucumber.datatable.DataTable.TableConverter;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static io.cucumber.datatable.DataTable.emptyDataTable;
import static java.util.Arrays.asList;
import static java.util.Collections.emptyList;
import static java.util.Collections.emptyMap;
import static java.util.Collections.singletonList;
import static java.util.Locale.ENGLISH;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertSame;

public class DataTableTypeRegistryTableConverterTest {

    private static final Type LIST_OF_ANIMAL_TYPE = new TypeReference<List<Animal>>() {
    }.getType();
    private static final Type LIST_OF_INT_TYPE = new TypeReference<List<Integer>>() {
    }.getType();
    private static final Type MAP_OF_INT_INT_TYPE = new TypeReference<Map<Integer, Integer>>() {
    }.getType();
    private static final Type LIST_OF_MAP = new TypeReference<List<Map>>() {
    }.getType();
    private static final Type LIST_OF_LIST = new TypeReference<List<List>>() {
    }.getType();
    private static final Type MAP_OF_INT_STRING_TYPE = new TypeReference<Map<Integer, String>>() {
    }.getType();
    private static final Type MAP_OF_INT_TO_LIST_OF_STRING_TYPE = new TypeReference<Map<Integer, List<String>>>() {
    }.getType();
    private static final Type MAP_OF_INT_TO_MAP_OF_STRING_INT_TYPE = new TypeReference<Map<Integer, Map<String, Integer>>>() {
    }.getType();
    private static final Type LIST_OF_MAP_OF_INT_INT_TYPE = new TypeReference<List<Map<Integer, Integer>>>() {
    }.getType();
    private static final Type LIST_OF_LIST_OF_ANIMAL_TYPE = new TypeReference<List<List<Animal>>>() {
    }.getType();
    private static final Type LIST_OF_LIST_OF_INT_TYPE = new TypeReference<List<List<Integer>>>() {
    }.getType();
    private static final Type BARN_ANIMAL_TYPE = new TypeReference<Barn<Animal>>() {
    }.getType();
    private static final Type LIST_OF_BARN_ANIMAL_TYPE = new TypeReference<List<Barn<Animal>>>() {
    }.getType();
    private static final Type MAP_OF_INT_ANIMAL = new TypeReference<Map<Integer, Animal>>() {
    }.getType();
    private static final Type MAP_OF_ID_ANIMAL = new TypeReference<Map<Id, Animal>>() {
    }.getType();

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    private final DataTableTypeRegistry registry = new DataTableTypeRegistry(ENGLISH);
    private final TableConverter converter = new DataTableTypeRegistryTableConverter(registry);

    @Test
    public void converts_datatable_to_datatable() {
        DataTable table = emptyDataTable();
        assertSame(table, converter.convert(table, DataTable.class, false));
    }

    @Test
    public void converts_and_transposes_datatable() {
        DataTable table = DataTable.create(
            asList(
                singletonList("3"),
                singletonList("5"),
                singletonList("6"),
                singletonList("7")
            ));

        assertEquals(table.transpose(), converter.convert(table, DataTable.class, true));
    }

    @Test
    public void converts_empty_table_to_empty_list() {
        DataTable table = emptyDataTable();
        assertEquals(emptyList(), converter.toList(table, Integer.class));
        assertEquals(emptyList(), converter.convert(table, LIST_OF_INT_TYPE, false));
    }

    @Test
    public void converts_table_with_empty_row_to_empty_list() {
        DataTable table = DataTable.create(singletonList(Collections.<String>emptyList()));
        assertEquals(emptyList(), converter.toList(table, Integer.class));
        assertEquals(emptyList(), converter.convert(table, LIST_OF_INT_TYPE, false));
    }

    @Test
    public void to_list_cant_convert_single_column_to_list_of_unknown_type() {
        expectedException.expectMessage(String.format("Can't convert DataTable to List<%s>", Animal.class));
        DataTable table = DataTable.create(
            singletonList(
                singletonList("42")
            ));
        converter.toList(table, Animal.class);
    }

    @Test
    public void to_list_cant_convert_two_column_table_to_list_of_unknown_type() {
        expectedException.expectMessage(String.format("Can't convert DataTable to List<%s>", Animal.class));
        DataTable table = DataTable.create(
            singletonList(
                asList("42", "31")
            ));
        converter.toList(table, Animal.class);
    }

    @Test
    public void convert_cant_convert_to_list_of_unknown_type() {
        expectedException.expectMessage(String.format("Can't convert DataTable to List<%s>", Animal.class));
        DataTable table = DataTable.create(
            singletonList(
                singletonList("42")
            ));
        converter.convert(table, LIST_OF_ANIMAL_TYPE, false);
    }

    @Test
    public void convert_cant_convert_to_unknown_type() {
        expectedException.expectMessage(String.format("Can't convert DataTable to %s", Animal.class));
        DataTable table = DataTable.create(
            singletonList(
                singletonList("42")
            ));
        converter.convert(table, Animal.class, false);
    }


    @Test
    public void converts_empty_table_to_null() {
        DataTable table = emptyDataTable();
        assertNull(converter.convert(table, Integer.class, false));
    }



    @Test
    public void converts_table_of_single_cell_to_single_item() {
        DataTable table = DataTable.create(
            asList(
                singletonList("3")
            ));

        assertEquals(3, converter.convert(table, Integer.class, false));
    }


    @Test
    public void converts_table_to_single_item() {
        DataTable table = DataTable.create(asList(
            asList("name", "life expectancy"),
            asList("Muffalo", "15")
        ));

        registry.defineDataTableType(new DataTableType("animal", Animal.class, new TableEntryTransformer<Animal>() {
            @Override
            public Animal transform(Map<String, String> tableEntry) {
                return new Animal(tableEntry.get("name"), Integer.valueOf(tableEntry.get("life expectancy")));
            }
        }));

        assertEquals(new Animal("Muffalo", 15), converter.convert(table, Animal.class, false));
    }

    @Test
    public void converts_table_of_single_column_to_list() {
        DataTable table = DataTable.create(
            asList(
                singletonList("3"),
                singletonList("5"),
                singletonList("6"),
                singletonList("7")
            ));
        assertEquals(asList(3, 5, 6, 7), converter.toList(table, Integer.class));
        assertEquals(asList(3, 5, 6, 7), converter.convert(table, LIST_OF_INT_TYPE, false));
    }


    @Test
    public void converts_table_of_several_columns_to_list() {
        DataTable table = DataTable.create(
            asList(
                asList("3", "5"),
                asList("6", "7")
            ));
        assertEquals(asList(3, 5, 6, 7), converter.toList(table, Integer.class));
        assertEquals(asList(3, 5, 6, 7), converter.convert(table, LIST_OF_INT_TYPE, false));

    }

    @Test
    public void when_converting_to_data_table_table_type_takes_precedence_over_item_type() {
        final DataTable expected = emptyDataTable();

        registry.defineDataTableType(new DataTableType("table", DataTable.class, new TableTransformer<DataTable>() {
            @Override
            public DataTable transform(DataTable raw) {
                return expected;
            }
        }));

        DataTable table = DataTable.create(asList(
            asList("name", "life expectancy"),
            asList("Muffalo", "15")
        ));

        assertSame(expected, converter.convert(table, DataTable.class, false));
    }

    @Test
    public void converts_table_to_list_of_generic_item_type() {
        final TableTransformer<List<Barn<Animal>>> transformer = new TableTransformer<List<Barn<Animal>>>() {
            @Override
            public List<Barn<Animal>> transform(DataTable table) {
                List<Barn<Animal>> ret = new ArrayList<Barn<Animal>>();
                for (Map<String, String> row : table.asMaps()) {
                    ret.add(new Barn<Animal>(new Animal(row.get("name"), Integer.parseInt(row.get("life expectancy")))));
                }
                return ret;
            }
        };

        registry.defineDataTableType(new DataTableType("muffalo-barn", LIST_OF_BARN_ANIMAL_TYPE, transformer));

        DataTable table = DataTable.create(asList(
            asList("name", "life expectancy"),
            asList("Muffalo", "15")
        ));

        assertEquals(singletonList(new Barn<Animal>(new Animal("Muffalo", 15))), converter.toList(table, BARN_ANIMAL_TYPE));
        assertEquals(singletonList(new Barn<Animal>(new Animal("Muffalo", 15))), converter.convert(table, LIST_OF_BARN_ANIMAL_TYPE, false));
    }

    @Test
    public void converts_empty_table_to_empty_lists() {
        DataTable table = emptyDataTable();
        assertEquals(emptyList(), converter.toLists(table, Integer.class));
        assertEquals(emptyList(), converter.convert(table, LIST_OF_LIST_OF_INT_TYPE, false));
    }

    @Test
    public void converts_table_with_empty_row_to_empty_lists() {
        DataTable table = DataTable.create(Collections.<List<String>>emptyList());
        assertEquals(emptyList(), converter.toLists(table, Integer.class));
        assertEquals(emptyList(), converter.convert(table, LIST_OF_LIST_OF_INT_TYPE, false));
    }

    @Test
    public void converts_table_with_empty_column_to_empty_lists() {
        DataTable table = DataTable.create(singletonList(Collections.<String>emptyList()));
        assertEquals(emptyList(), converter.toLists(table, Integer.class));
        assertEquals(emptyList(), converter.convert(table, LIST_OF_LIST_OF_INT_TYPE, false));
    }


    @Test
    public void converts_table_of_single_column_to_lists() {
        DataTable table = DataTable.create(
            asList(
                singletonList("3"),
                singletonList("5"),
                singletonList("6"),
                singletonList("7")
            ));

        List<List<Integer>> expected = asList(
            singletonList(3),
            singletonList(5),
            singletonList(6),
            singletonList(7));

        assertEquals(expected, converter.toLists(table, Integer.class));
        assertEquals(expected, converter.convert(table, LIST_OF_LIST_OF_INT_TYPE, false));
    }

    @Test
    public void converts_table_of_several_columns_to_lists() {
        DataTable table = DataTable.create(
            asList(
                asList("3", "5"),
                asList("6", "7")
            ));

        List<List<Integer>> expected = asList(
            asList(3, 5),
            asList(6, 7));

        assertEquals(expected, converter.toLists(table, Integer.class));
        assertEquals(expected, converter.convert(table, LIST_OF_LIST_OF_INT_TYPE, false));
    }

    @Test
    public void converts_table_of_several_columns_to_non_generic_lists() {
        DataTable table = DataTable.create(
            asList(
                asList("3", "5"),
                asList("6", "7")
            ));

        List<List<String>> expected = asList(
            asList("3", "5"),
            asList("6", "7"));

        assertEquals(expected, converter.convert(table, LIST_OF_LIST, false));
    }

    @Test
    public void to_lists_cant_convert_to_lists_of_unknown_type() {
        DataTable table = DataTable.create(
            singletonList(
                singletonList("42")
            ));


        expectedException.expectMessage(String.format("Can't convert DataTable to List<List<%s>>", Animal.class));
        converter.toLists(table, Animal.class);
    }

    @Test
    public void convert_cant_convert_to_lists_of_unknown_type() {
        DataTable table = DataTable.create(
            singletonList(
                singletonList("42")
            ));


        expectedException.expectMessage(String.format("Can't convert DataTable to List<List<%s>>", Animal.class));
        converter.convert(table, LIST_OF_LIST_OF_ANIMAL_TYPE, false);
    }


    @Test
    public void converts_empty_table_to_empty_map() {
        DataTable table = emptyDataTable();
        assertEquals(emptyMap(), converter.toMap(table, Integer.class, Integer.class));
        assertEquals(emptyMap(), converter.convert(table, MAP_OF_INT_INT_TYPE, false));
    }

    @Test
    public void convert_table_with_single_column_to_map() {
        DataTable table = DataTable.create(singletonList(singletonList("1")));

        Map<Integer, String> expected = new HashMap<Integer, String>() {{
            put(1, null);
        }};

        assertEquals(expected, converter.toMap(table, Integer.class, Integer.class));
        assertEquals(expected, converter.convert(table, MAP_OF_INT_INT_TYPE, false));
    }


    @Test
    public void convert_table_with_empty_first_cell_to_map() {
        DataTable table = DataTable.create(singletonList(singletonList("")));

        assertEquals(emptyMap(), converter.toMap(table, Integer.class, Integer.class));
        assertEquals(emptyMap(), converter.convert(table, MAP_OF_INT_INT_TYPE, false));
    }

    @Test
    public void convert_empty_table_to_empty_map() {
        DataTable table = emptyDataTable();

        assertEquals(emptyMap(), converter.toMap(table, Integer.class, Integer.class));
        assertEquals(emptyMap(), converter.convert(table, MAP_OF_INT_INT_TYPE, false));
    }

    @Test
    public void converts_table_of_two_columns_without_header_to_map() {
        DataTable table = DataTable.create(
            asList(
                asList("3", "c"),
                asList("5", "e"),
                asList("6", "f")));


        Map<Integer, String> expected = new HashMap<Integer, String>() {{
            put(3, "c");
            put(5, "e");
            put(6, "f");
        }};

        assertEquals(expected, converter.toMap(table, Integer.class, String.class));
        assertEquals(expected, converter.convert(table, MAP_OF_INT_STRING_TYPE, false));
    }

    @Test
    public void converts_table_of_three_columns_without_header_to_map_of_list_values() {
        DataTable table = DataTable.create(
            asList(
                asList("3", "c", "x"),
                asList("5", "e", "y"),
                asList("6", "f", "z")));


        Map<Integer, List<String>> expected = new HashMap<Integer, List<String>>() {{
            put(3, asList("c", "x"));
            put(5, asList("e", "y"));
            put(6, asList("f", "z"));
        }};

        assertEquals(expected, converter.convert(table, MAP_OF_INT_TO_LIST_OF_STRING_TYPE, false));
    }

    @Test
    public void converts_table_of_three_columns_with_header_to_map_of_map_values() {
        DataTable table = DataTable.create(
            asList(
                asList("", "c", "x"),
                asList("5", "42", "12"),
                asList("6", "1", "13")));

        Map<Integer, Map<String, Integer>> expected = new HashMap<Integer, Map<String, Integer>>() {{
            put(5, new HashMap<String, Integer>() {{
                put("c", 42);
                put("x", 12);
            }});
            put(6, new HashMap<String, Integer>() {{
                put("c", 1);
                put("x", 13);
            }});
        }};

        assertEquals(expected, converter.convert(table, MAP_OF_INT_TO_MAP_OF_STRING_INT_TYPE, false));
    }

    @Test
    public void to_map_cant_convert_table_without_header_with_blank_first_header_cell_to_map() {
        expectedException.expectMessage(String.format("Can't convert DataTable to Map<%s,%s>", Id.class, Animal.class));

        DataTable table = DataTable.create(
            asList(
                asList("", "Megasloth", "31"),
                asList("6", "Spelopede", "3")));

        registry.defineDataTableType(new DataTableType("animal", Animal.class, new TableRowTransformer<Animal>() {
            @Override
            public Animal transform(List<String> tableRow) {
                return new Animal(tableRow.get(0), Integer.valueOf(tableRow.get(1)));
            }

        }));
        registry.defineDataTableType(new DataTableType("id", Id.class, new TableCellTransformer<Id>() {
            @Override
            public Id transform(String cell) {
                return new Id(Integer.valueOf(cell));
            }
        }));
        converter.toMap(table, Id.class, Animal.class);
    }


    @Test
    public void to_map_cant_convert_table_with_unknown_key_type_to_map() {
        expectedException.expectMessage(String.format("Can't convert DataTable to Map<%s,%s>", Id.class, Animal.class));

        DataTable table = DataTable.create(
            asList(
                asList("", "Megasloth", "31"),
                asList("6", "Spelopede", "3")));

        registry.defineDataTableType(new DataTableType("animal", Animal.class, new TableRowTransformer<Animal>() {
            @Override
            public Animal transform(List<String> tableRow) {
                return new Animal(tableRow.get(0), Integer.valueOf(tableRow.get(1)));
            }

        }));

        converter.toMap(table, Id.class, Animal.class);
    }

    @Test
    public void to_map_cant_convert_table_with_unknown_value_type_to_map() {
        expectedException.expectMessage(String.format("Can't convert DataTable to Map<%s,%s>", Id.class, Animal.class));

        DataTable table = DataTable.create(
            asList(
                asList("", "Megasloth", "31"),
                asList("6", "Spelopede", "3")));

        registry.defineDataTableType(new DataTableType("id", Id.class, new TableCellTransformer<Id>() {
            @Override
            public Id transform(String cell) {
                return new Id(Integer.valueOf(cell));
            }
        }));

        converter.toMap(table, Id.class, Animal.class);
    }

    @Test
    public void to_map_cant_convert_table_with_more_keys_then_values_to_map() {
        expectedException.expectMessage(String.format("Can't convert DataTable to Map<%s,%s>", Id.class, Animal.class));

        DataTable table = DataTable.create(
            asList(
                asList("1", "name", "life expectancy"),
                asList("5", "Megasloth", "31"),
                asList("6", "Spelopede", "3")));


        registry.defineDataTableType(new DataTableType("animal", Animal.class, new TableEntryTransformer<Animal>() {
            @Override
            public Animal transform(Map<String, String> tableEntry) {
                return new Animal(tableEntry.get("name"), Integer.valueOf(tableEntry.get("life expectancy")));
            }
        }));


        registry.defineDataTableType(new DataTableType("id", Id.class, new TableCellTransformer<Id>() {
            @Override
            public Id transform(String cell) {
                return new Id(Integer.valueOf(cell));
            }
        }));

        converter.toMap(table, Id.class, Animal.class);
    }

    @Test
    public void to_map_cant_convert_table_with_more_values_then_keys_to_map() {
        expectedException.expectMessage(String.format("Can't convert DataTable to Map<%s,%s>", Id.class, Animal.class));

        DataTable table = DataTable.create(
            asList(
                asList("id", "Cassowary", "108"),
                asList("5", "Megasloth", "31"),
                asList("6", "Spelopede", "3")));

        registry.defineDataTableType(new DataTableType("animal", Animal.class, new TableRowTransformer<Animal>() {
            @Override
            public Animal transform(List<String> tableRow) {
                return new Animal(tableRow.get(0), Integer.valueOf(tableRow.get(1)));
            }
        }));

        registry.defineDataTableType(new DataTableType("id", Id.class, new TableEntryTransformer<Id>() {
            @Override
            public Id transform(Map<String, String> tableEntry) {
                return new Id(Integer.valueOf(tableEntry.get("id")));
            }
        }));

        converter.toMap(table, Id.class, Animal.class);
    }

    @Test
    public void to_map_cant_convert_table_with_duplicate_keys_to_map() {
        expectedException.expectMessage(String.format("Can't convert DataTable to Map<%s,%s>", Id.class, Animal.class));

        DataTable table = DataTable.create(
            asList(
                asList("5", "Megasloth", "31"),
                asList("5", "Spelopede", "3")));


        registry.defineDataTableType(new DataTableType("animal", Animal.class, new TableRowTransformer<Animal>() {
            @Override
            public Animal transform(List<String> tableRow) {
                return new Animal(tableRow.get(0), Integer.valueOf(tableRow.get(1)));
            }

        }));
        registry.defineDataTableType(new DataTableType("id", Id.class, new TableRowTransformer<Id>() {
            @Override
            public Id transform(List<String> tableRow) {
                return new Id(Integer.valueOf(tableRow.get(0)));
            }

        }));

        converter.toMap(table, Id.class, Animal.class);
    }

    @Test
    public void converts_table_of_three_columns_without_header_to_map() {
        DataTable table = DataTable.create(
            asList(
                asList("5", "Megasloth", "31"),
                asList("6", "Spelopede", "3")));


        Map<Id, Animal> expected = new HashMap<Id, Animal>() {{
            put(new Id(5), new Animal("Megasloth", 31));
            put(new Id(6), new Animal("Spelopede", 3));
        }};

        registry.defineDataTableType(new DataTableType("animal", Animal.class, new TableRowTransformer<Animal>() {
            @Override
            public Animal transform(List<String> tableRow) {
                return new Animal(tableRow.get(0), Integer.valueOf(tableRow.get(1)));
            }

        }));
        registry.defineDataTableType(new DataTableType("id", Id.class, new TableRowTransformer<Id>() {
            @Override
            public Id transform(List<String> tableRow) {
                return new Id(Integer.valueOf(tableRow.get(0)));
            }

        }));

        assertEquals(expected, converter.toMap(table, Id.class, Animal.class));
        assertEquals(expected, converter.convert(table, MAP_OF_ID_ANIMAL, false));
    }

    @Test
    public void converts_table_of_three_columns_with_header_to_map() {
        DataTable table = DataTable.create(
            asList(
                asList("id", "name", "life expectancy"),
                asList("5", "Megasloth", "31"),
                asList("6", "Spelopede", "3")));


        Map<Id, Animal> expected = new HashMap<Id, Animal>() {{
            put(new Id(5), new Animal("Megasloth", 31));
            put(new Id(6), new Animal("Spelopede", 3));
        }};

        registry.defineDataTableType(new DataTableType("animal", Animal.class, new TableEntryTransformer<Animal>() {
            @Override
            public Animal transform(Map<String, String> tableEntry) {
                return new Animal(tableEntry.get("name"), Integer.valueOf(tableEntry.get("life expectancy")));
            }
        }));
        registry.defineDataTableType(new DataTableType("id", Id.class, new TableEntryTransformer<Id>() {
            @Override
            public Id transform(Map<String, String> tableEntry) {
                return new Id(Integer.valueOf(tableEntry.get("id")));
            }
        }));

        assertEquals(expected, converter.toMap(table, Id.class, Animal.class));
        assertEquals(expected, converter.convert(table, MAP_OF_ID_ANIMAL, false));
    }

    @Test
    public void converts_table_of_three_columns_with_empty_first_header_to_map() {
        DataTable table = DataTable.create(
            asList(
                asList("", "name", "life expectancy"),
                asList("5", "Megasloth", "31"),
                asList("6", "Spelopede", "3")));


        Map<Integer, Animal> expected = new HashMap<Integer, Animal>() {{
            put(5, new Animal("Megasloth", 31));
            put(6, new Animal("Spelopede", 3));
        }};

        registry.defineDataTableType(new DataTableType("animal", Animal.class, new TableEntryTransformer<Animal>() {
            @Override
            public Animal transform(Map<String, String> tableEntry) {
                return new Animal(tableEntry.get("name"), Integer.valueOf(tableEntry.get("life expectancy")));
            }
        }));

        assertEquals(expected, converter.toMap(table, Integer.class, Animal.class));
        assertEquals(expected, converter.convert(table, MAP_OF_INT_ANIMAL, false));
    }

    @Test
    public void cant_convert_to_map_of_unknown_key_type() {
        expectedException.expectMessage(String.format("Can't convert DataTable to Map<%s,%s>", Animal.class, String.class));

        DataTable table = DataTable.create(
            asList(
                asList("Alphabeaver", "Hare"),
                asList("Cassowary", "Husky"),
                asList("Megasloth", "Spelopede")));

        converter.toMap(table, Animal.class, String.class);
    }

    @Test
    public void cant_convert_to_map_of_unknown_value_type() {
        expectedException.expectMessage(String.format("Can't convert DataTable to Map<%s,%s>", String.class, Animal.class));

        DataTable table = DataTable.create(
            asList(
                asList("Alphabeaver", "Hare"),
                asList("Cassowary", "Husky"),
                asList("Megasloth", "Spelopede")));

        converter.toMap(table, String.class, Animal.class);
    }

    @Test
    public void converts_table_to_maps() {
        DataTable table = DataTable.create(
            asList(
                asList("1", "2", "3"),
                asList("4", "5", "6"),
                asList("7", "8", "9")));

        List<HashMap<Integer, Integer>> expected =
            asList(
                new HashMap<Integer, Integer>() {{
                    put(1, 4);
                    put(2, 5);
                    put(3, 6);
                }},
                new HashMap<Integer, Integer>() {{
                    put(1, 7);
                    put(2, 8);
                    put(3, 9);
                }}
            );

        assertEquals(expected, converter.toMaps(table, Integer.class, Integer.class));
        assertEquals(expected, converter.convert(table, LIST_OF_MAP_OF_INT_INT_TYPE, false));
    }

    @Test
    public void to_maps_cant_convert_table_with_duplicate_keys_to_maps() {
        expectedException.expectMessage(String.format("Can't convert DataTable to Map<%s,%s>", Integer.class, Integer.class));

        DataTable table = DataTable.create(
            asList(
                asList("1", "1", "1"),
                asList("4", "5", "6"),
                asList("7", "8", "9")));

        converter.toMaps(table, Integer.class, Integer.class);
    }


    @Test
    public void converts_table_to_generic_maps() {
        DataTable table = DataTable.create(
            asList(
                asList("1", "2", "3"),
                asList("4", "5", "6"),
                asList("7", "8", "9")));

        List<HashMap<String, String>> expected =
            asList(
                new HashMap<String, String>() {{
                    put("1", "4");
                    put("2", "5");
                    put("3", "6");
                }},
                new HashMap<String, String>() {{
                    put("1", "7");
                    put("2", "8");
                    put("3", "9");
                }}
            );

        assertEquals(expected, converter.convert(table, LIST_OF_MAP, false));
    }


    @Test
    public void converts_empty_table_to_empty_list_of_maps() {
        DataTable table = DataTable.create(Collections.<List<String>>emptyList());
        assertEquals(emptyList(), converter.toMaps(table, Integer.class, Integer.class));
        assertEquals(emptyList(), converter.convert(table, LIST_OF_MAP_OF_INT_INT_TYPE, false));
    }

    @Test
    public void converts_table_with_single_row_to_empty_list_of_maps() {
        DataTable table = DataTable.create(singletonList(asList("1", "2", "3")));
        assertEquals(emptyList(), converter.toMaps(table, Integer.class, Integer.class));
        assertEquals(emptyList(), converter.convert(table, LIST_OF_MAP_OF_INT_INT_TYPE, false));
    }

    @Test
    public void cant_convert_to_maps_of_unknown_key_type() {
        expectedException.expectMessage(String.format(
            "Can't convert DataTable to List<Map<%s,%s>>.",
            Animal.class, String.class));

        DataTable table = DataTable.create(
            asList(
                asList("Alphabeaver", "Hare"),
                asList("Cassowary", "Husky"),
                asList("Megasloth", "Spelopede")));

        converter.toMaps(table, Animal.class, String.class);
    }


    @Test
    public void cant_convert_to_maps_of_unknown_value_type() {
        expectedException.expectMessage(String.format(
            "Can't convert DataTable to List<Map<%s,%s>>.",
            String.class, Animal.class));

        DataTable table = DataTable.create(
            asList(
                asList("Alphabeaver", "Hare"),
                asList("Cassowary", "Husky"),
                asList("Megasloth", "Spelopede")));

        converter.toMaps(table, String.class, Animal.class);
    }

    private final class Id {
        private final Integer id;

        private Id(Integer id) {
            this.id = id;
        }

        @Override
        public String toString() {
            return String.valueOf(id);
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            Id id1 = (Id) o;

            return id.equals(id1.id);
        }

        @Override
        public int hashCode() {
            return id.hashCode();
        }
    }


    private final class Animal {
        private final String name;
        private final int lifeExpectancy;

        private Animal(String name, int lifeExpectancy) {
            this.name = name;
            this.lifeExpectancy = lifeExpectancy;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            Animal animal = (Animal) o;

            if (lifeExpectancy != animal.lifeExpectancy) return false;
            return name.equals(animal.name);
        }

        @Override
        public int hashCode() {
            int result = name.hashCode();
            result = 31 * result + lifeExpectancy;
            return result;
        }

        @Override
        public String toString() {
            return name + " " + lifeExpectancy;
        }
    }

    private final class Barn<A extends Animal> {

        final A animal;

        private Barn(A animal) {
            this.animal = animal;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            Barn<?> barn = (Barn<?>) o;

            return animal.equals(barn.animal);
        }

        @Override
        public int hashCode() {
            return animal.hashCode();
        }
    }
}
