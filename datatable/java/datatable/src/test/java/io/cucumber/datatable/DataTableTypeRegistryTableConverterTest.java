package io.cucumber.datatable;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.collect.HashMultiset;
import com.google.common.collect.Multiset;
import io.cucumber.datatable.DataTable.TableConverter;
import org.junit.jupiter.api.Test;

import java.beans.ConstructorProperties;
import java.lang.reflect.Type;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;

import static io.cucumber.datatable.DataTable.emptyDataTable;
import static io.cucumber.datatable.TableParser.parse;
import static io.cucumber.datatable.TypeFactory.typeName;
import static java.lang.Double.parseDouble;
import static java.lang.String.format;
import static java.util.Arrays.asList;
import static java.util.Collections.emptyList;
import static java.util.Collections.emptyMap;
import static java.util.Collections.singletonList;
import static java.util.Locale.ENGLISH;
import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.startsWith;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;

class DataTableTypeRegistryTableConverterTest {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    private static final Type MAP_OF_STRING_TO_COORDINATE = new TypeReference<Map<String, Coordinate>>() {
    }.getType();
    private static final Type MAP_OF_AIR_PORT_CODE_TO_COORDINATE = new TypeReference<Map<AirPortCode, Coordinate>>() {
    }.getType();
    private static final Type MAP_OF_AIR_PORT_CODE_TO_AIR_PORT_CODE = new TypeReference<Map<AirPortCode, AirPortCode>>() {
    }.getType();
    private static final Type MAP_OF_STRING_TO_LIST_OF_DOUBLE = new TypeReference<Map<String, List<Double>>>() {
    }.getType();
    private static final Type MAP_OF_STRING_TO_LIST_OF_DATE = new TypeReference<Map<String, List<Date>>>() {
    }.getType();
    private static final Type LIST_OF_AUTHOR = new TypeReference<List<Author>>() {
    }.getType();
    private static final Type LIST_OF_MAP_OF_STRING_TO_INT = new TypeReference<List<Map<String, Integer>>>() {
    }.getType();
    private static final Type LIST_OF_INT = new TypeReference<List<Integer>>() {
    }.getType();
    private static final Type MAP_OF_INT_TO_INT = new TypeReference<Map<Integer, Integer>>() {
    }.getType();
    @SuppressWarnings("rawtypes")
    private static final Type LIST_OF_MAP = new TypeReference<List<Map>>() {
    }.getType();
    @SuppressWarnings("rawtypes")
    private static final Type LIST_OF_LIST = new TypeReference<List<List>>() {
    }.getType();
    private static final Type MAP_OF_INT_TO_STRING = new TypeReference<Map<Integer, String>>() {
    }.getType();
    private static final Type MAP_OF_STRING_TO_MAP_OF_STRING_DOUBLE = new TypeReference<Map<String, Map<String, Double>>>() {
    }.getType();
    private static final Type LIST_OF_MAP_OF_INT_TO_INT = new TypeReference<List<Map<Integer, Integer>>>() {
    }.getType();
    private static final Type LIST_OF_LIST_OF_INT = new TypeReference<List<List<Integer>>>() {
    }.getType();
    private static final Type LIST_OF_LIST_OF_DATE = new TypeReference<List<List<Date>>>() {
    }.getType();
    @SuppressWarnings("rawtypes")
    private static final Type MAP_OF_STRING_TO_MAP = new TypeReference<Map<String, Map>>() {
    }.getType();
    private static final Type MAP_OF_STRING_TO_STRING = new TypeReference<Map<String, String>>() {
    }.getType();
    private static final Type LIST_OF_DOUBLE = new TypeReference<List<Double>>() {
    }.getType();
    private static final Type LIST_OF_DATE = new TypeReference<List<Date>>() {
    }.getType();
    private static final Type MAP_OF_STRING_TO_MAP_OF_INTEGER_TO_PIECE = new TypeReference<Map<String, Map<Integer, Piece>>>() {
    }.getType();
    private static final TableTransformer<ChessBoard> CHESS_BOARD_TABLE_TRANSFORMER = table -> new ChessBoard(table.subTable(1, 1).asList());
    private static final TableCellTransformer<Piece> PIECE_TABLE_CELL_TRANSFORMER = Piece::fromString;
    private static final TableCellTransformer<AirPortCode> AIR_PORT_CODE_TABLE_CELL_TRANSFORMER = AirPortCode::new;
    private static final SimpleDateFormat SIMPLE_DATE_FORMAT = new SimpleDateFormat("yyyy-MM-dd");
    private static final TableEntryTransformer<Coordinate> COORDINATE_TABLE_ENTRY_TRANSFORMER = tableEntry -> new Coordinate(
            parseDouble(tableEntry.get("lat")),
            parseDouble(tableEntry.get("lon"))
    );
    private static final TableEntryTransformer<Author> AUTHOR_TABLE_ENTRY_TRANSFORMER =
            tableEntry -> new Author(tableEntry.get("firstName"), tableEntry.get("lastName"), tableEntry.get("birthDate"));
    private static final TableRowTransformer<Coordinate> COORDINATE_TABLE_ROW_TRANSFORMER = tableRow -> new Coordinate(
            Double.parseDouble(tableRow.get(0)),
            Double.parseDouble(tableRow.get(1))
    );
    private static final TableEntryTransformer<AirPortCode> AIR_PORT_CODE_TABLE_ENTRY_TRANSFORMER =
            tableEntry -> new AirPortCode(tableEntry.get("code"));
    private static final TableEntryByTypeTransformer TABLE_ENTRY_BY_TYPE_CONVERTER_SHOULD_NOT_BE_USED =
            (Map<String, String> entry, Type type, TableCellByTypeTransformer cellTransformer) -> {
                throw new IllegalStateException("Should not be used");
            };
    private static final TableCellByTypeTransformer TABLE_CELL_BY_TYPE_CONVERTER_SHOULD_NOT_BE_USED = (value, cellType) -> {
        throw new IllegalStateException("Should not be used");
    };
    private static final TableEntryByTypeTransformer JACKSON_TABLE_ENTRY_BY_TYPE_CONVERTER =
            (entry, type, cellTransformer) -> objectMapper.convertValue(entry, objectMapper.constructType(type));
    private static final TableCellByTypeTransformer JACKSON_TABLE_CELL_BY_TYPE_CONVERTER =
            (value, cellType) -> objectMapper.convertValue(value, objectMapper.constructType(cellType));
    private static DataTableType DATE_TABLE_CELL_TRANSFORMER = new DataTableType(Date.class, (TableCellTransformer<Date>) SIMPLE_DATE_FORMAT::parse);

    static {
        SIMPLE_DATE_FORMAT.setTimeZone(TimeZone.getTimeZone("UTC"));
    }

    private DataTableTypeRegistry registry = new DataTableTypeRegistry(ENGLISH);
    private final TableConverter converter = new DataTableTypeRegistryTableConverter(registry);

    @Test
    void convert_to_empty_list__empty_table() {
        DataTable table = emptyDataTable();
        assertEquals(emptyList(), converter.toList(table, Integer.class));
        assertEquals(emptyList(), converter.convert(table, LIST_OF_INT));
    }

    @Test
    void convert_to_empty_lists__empty_table() {
        DataTable table = emptyDataTable();
        assertEquals(emptyList(), converter.toLists(table, Integer.class));
        assertEquals(emptyList(), converter.convert(table, LIST_OF_LIST_OF_INT));
    }

    @Test
    void convert_to_empty_list__only_header() {
        DataTable table = parse("",
                " | firstName | lastName | birthDate |"
        );
        registry.defineDataTableType(new DataTableType(Author.class, AUTHOR_TABLE_ENTRY_TRANSFORMER));
        assertEquals(emptyList(), converter.convert(table, LIST_OF_AUTHOR));
    }

    @Test
    void convert_to_empty_map__blank_first_cell() {
        DataTable table = parse("|   |");
        assertEquals(emptyMap(), converter.toMap(table, Integer.class, Integer.class));
        assertEquals(emptyMap(), converter.convert(table, MAP_OF_INT_TO_INT));
    }

    @Test
    void convert_to_empty_map__empty_table() {
        DataTable table = emptyDataTable();
        assertEquals(emptyMap(), converter.toMap(table, Integer.class, Integer.class));
        assertEquals(emptyMap(), converter.convert(table, MAP_OF_INT_TO_INT));
    }

    @Test
    void convert_to_empty_maps__empty_table() {
        DataTable table = emptyDataTable();
        assertEquals(emptyList(), converter.toMaps(table, Integer.class, Integer.class));
        assertEquals(emptyList(), converter.convert(table, LIST_OF_MAP_OF_INT_TO_INT));
    }

    @Test
    void convert_to_empty_maps__only_header() {
        DataTable table = parse("",
                " | firstName | lastName | birthDate |"
        );
        assertEquals(emptyList(), converter.toMaps(table, String.class, Integer.class));
        assertEquals(emptyList(), converter.convert(table, LIST_OF_MAP_OF_STRING_TO_INT));
    }

    @Test
    void convert_to_empty_table__empty_table() {
        DataTable table = emptyDataTable();
        assertSame(table, converter.convert(table, DataTable.class));
    }


    @Test
    void convert_to_list() {
        DataTable table = parse("",
                "| 3 |",
                "| 5 |",
                "| 6 |",
                "| 7 |"
        );

        List<String> expected = asList("3", "5", "6", "7");

        assertEquals(expected, converter.toList(table, String.class));
        assertEquals(expected, converter.convert(table, List.class));
    }

    @Test
    void convert_to_list__single_column() {
        DataTable table = parse("",
                "| 3 |",
                "| 5 |",
                "| 6 |",
                "| 7 |"
        );

        List<Integer> expected = asList(3, 5, 6, 7);

        assertEquals(expected, converter.toList(table, Integer.class));
        assertEquals(expected, converter.convert(table, LIST_OF_INT));
    }

    @Test
    void convert_to_list__double_column__throws_exception() {
        DataTable table = parse("",
                "| 3 | 5 |",
                "| 6 | 7 |"
        );

        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                () -> converter.toList(table, Integer.class)
        );
        assertThat(exception.getMessage(), is("" +
                "Can't convert DataTable to List<java.lang.Integer>.\n" +
                "Please review these problems:\n" +
                "\n" +
                " - There was a table cell transformer for java.lang.Integer but the table was too wide to use it.\n" +
                "   Please reduce the table width to use this converter.\n" +
                "\n" +
                " - There was no table entry or table row transformer registered for java.lang.Integer.\n" +
                "   Please consider registering a table entry or row transformer.\n" +
                "\n" +
                " - There was no default table entry transformer registered to transform java.lang.Integer.\n" +
                "   Please consider registering a default table entry transformer.\n" +
                "\n" +
                "Note: Usually solving one is enough"
        ));
    }

    @Test
    void convert_to_list__double_column__single_row__throws_exception() {
        DataTable table = parse("",
                "| 3 | 5 |"
        );

        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                () -> converter.toList(table, Integer.class)
        );
        assertThat(exception.getMessage(), is("" +
                "Can't convert DataTable to List<java.lang.Integer>.\n" +
                "Please review these problems:\n" +
                "\n" +
                " - There was a table cell transformer for java.lang.Integer but the table was too wide to use it.\n" +
                "   Please reduce the table width to use this converter.\n" +
                "\n" +
                " - There was no table entry or table row transformer registered for java.lang.Integer.\n" +
                "   Please consider registering a table entry or row transformer.\n" +
                "\n" +
                "Note: Usually solving one is enough"
        ));
    }

    @Test
    void convert_to_list_of_map() {
        DataTable table = parse("",
                "| firstName   | lastName | birthDate  |",
                "| Annie M. G. | Schmidt  | 1911-03-20 |",
                "| Roald       | Dahl     | 1916-09-13 |",
                "| Astrid      | Lindgren | 1907-11-14 |"
        );

        List<HashMap<String, String>> expected =
                asList(
                        new HashMap<String, String>() {{
                            put("firstName", "Annie M. G.");
                            put("lastName", "Schmidt");
                            put("birthDate", "1911-03-20");
                        }},
                        new HashMap<String, String>() {{
                            put("firstName", "Roald");
                            put("lastName", "Dahl");
                            put("birthDate", "1916-09-13");
                        }},
                        new HashMap<String, String>() {{
                            put("firstName", "Astrid");
                            put("lastName", "Lindgren");
                            put("birthDate", "1907-11-14");
                        }}
                );

        assertEquals(expected, converter.convert(table, LIST_OF_MAP));
    }

    @Test
    void convert_to_list_of_object() {
        DataTable table = parse("",
                " | firstName   | lastName | birthDate  |",
                " | Annie M. G. | Schmidt  | 1911-03-20 |",
                " | Roald       | Dahl     | 1916-09-13 |",
                " | Astrid      | Lindgren | 1907-11-14 |"
        );

        List<Author> expected = asList(
                new Author("Annie M. G.", "Schmidt", "1911-03-20"),
                new Author("Roald", "Dahl", "1916-09-13"),
                new Author("Astrid", "Lindgren", "1907-11-14")
        );
        registry.defineDataTableType(new DataTableType(Author.class, AUTHOR_TABLE_ENTRY_TRANSFORMER));

        assertEquals(expected, converter.toList(table, Author.class));
        assertEquals(expected, converter.convert(table, LIST_OF_AUTHOR));
    }

    @Test
    void convert_to_empty_list_of_object() {
        DataTable table = parse("",
                " | firstName   | lastName | birthDate  |"
        );

        List<Author> expected = emptyList();
        registry.defineDataTableType(new DataTableType(Author.class, AUTHOR_TABLE_ENTRY_TRANSFORMER));

        assertEquals(expected, converter.toList(table, Author.class));
        assertEquals(expected, converter.convert(table, LIST_OF_AUTHOR));
    }


    @Test
    void convert_to_list_of_object__with_default_converters_present() {
        DataTable table = parse("",
                " | firstName   | lastName | birthDate  |",
                " | Annie M. G. | Schmidt  | 1911-03-20 |",
                " | Roald       | Dahl     | 1916-09-13 |",
                " | Astrid      | Lindgren | 1907-11-14 |"
        );

        List<Author> expected = asList(
                new Author("Annie M. G.", "Schmidt", "1911-03-20"),
                new Author("Roald", "Dahl", "1916-09-13"),
                new Author("Astrid", "Lindgren", "1907-11-14")
        );
        registry.setDefaultDataTableEntryTransformer(TABLE_ENTRY_BY_TYPE_CONVERTER_SHOULD_NOT_BE_USED);
        registry.setDefaultDataTableCellTransformer(TABLE_CELL_BY_TYPE_CONVERTER_SHOULD_NOT_BE_USED);
        registry.defineDataTableType(new DataTableType(Author.class, AUTHOR_TABLE_ENTRY_TRANSFORMER));

        assertEquals(expected, converter.toList(table, Author.class));
        assertEquals(expected, converter.convert(table, LIST_OF_AUTHOR));
    }

    @Test
    void convert_to_list_of_object__using_default_converter() {
        DataTable table = parse("",
                " | firstName   | lastName | birthDate  |",
                " | Annie M. G. | Schmidt  | 1911-03-20 |",
                " | Roald       | Dahl     | 1916-09-13 |",
                " | Astrid      | Lindgren | 1907-11-14 |"
        );

        List<Author> expected = asList(
                new Author("Annie M. G.", "Schmidt", "1911-03-20"),
                new Author("Roald", "Dahl", "1916-09-13"),
                new Author("Astrid", "Lindgren", "1907-11-14")
        );
        registry.setDefaultDataTableEntryTransformer(JACKSON_TABLE_ENTRY_BY_TYPE_CONVERTER);
        registry.setDefaultDataTableCellTransformer(TABLE_CELL_BY_TYPE_CONVERTER_SHOULD_NOT_BE_USED);

        assertEquals(expected, converter.toList(table, Author.class));
        assertEquals(expected, converter.convert(table, LIST_OF_AUTHOR));
    }

    @Test
    void convert_to_empty_list_of_object__using_default_converter__throws_exception() {
        DataTable table = parse("",
                " | firstName   | lastName | birthDate  |"
        );

        registry.setDefaultDataTableEntryTransformer(JACKSON_TABLE_ENTRY_BY_TYPE_CONVERTER);
        registry.setDefaultDataTableCellTransformer(TABLE_CELL_BY_TYPE_CONVERTER_SHOULD_NOT_BE_USED);

        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                () -> converter.convert(table, LIST_OF_AUTHOR)
        );
        assertThat(exception.getMessage(), is("" +
                "Can't convert DataTable to List<io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Author>.\n" +
                "Please review these problems:\n" +
                "\n" +
                " - There was a default table cell transformer that could be used but the table was too wide to use it.\n" +
                "   Please reduce the table width to use this converter.\n" +
                "\n" +
                " - There was no table entry or table row transformer registered for io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Author.\n" +
                "   Please consider registering a table entry or row transformer.\n" +
                "\n" +
                " - There was a default table entry transformer that could be used but the table was too short use it.\n" +
                "   Please increase the table height to use this converter.\n" +
                "\n" +
                "Note: Usually solving one is enough"
        ));
    }

    @Test
    void convert_to_list_of_primitive() {
        DataTable table = parse("",
                "| 3 |",
                "| 5 |",
                "| 6 |",
                "| 7 |"
        );

        List<Integer> expected = asList(3, 5, 6, 7);

        assertEquals(expected, converter.toList(table, Integer.class));
        assertEquals(expected, converter.convert(table, LIST_OF_INT));
    }

    @Test
    void convert_null_cells_to_null() {
        DataTable table = DataTable.create(singletonList(singletonList(null)));

        List<Integer> expected = singletonList(null);

        assertEquals(expected, converter.toList(table, Integer.class));
        assertEquals(expected, converter.convert(table, LIST_OF_INT));
    }

    @Test
    void convert_to_list_of_unknown_type__throws_exception__register_transformer() {
        DataTable table = parse("",
                " | firstName   | lastName | birthDate  |",
                " | Annie M. G. | Schmidt  | 1911-03-20 |",
                " | Roald       | Dahl     | 1916-09-13 |",
                " | Astrid      | Lindgren | 1907-11-14 |"
        );

        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                () -> converter.convert(table, LIST_OF_AUTHOR)
        );
        assertThat(exception.getMessage(), is("" +
                "Can't convert DataTable to List<io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Author>.\n" +
                "Please review these problems:\n" +
                "\n" +
                " - There was no table entry or table row transformer registered for io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Author.\n" +
                "   Please consider registering a table entry or row transformer.\n" +
                "\n" +
                " - There was no default table entry transformer registered to transform io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Author.\n" +
                "   Please consider registering a default table entry transformer.\n" +
                "\n" +
                "Note: Usually solving one is enough"
        ));
    }

    @Test
    void convert_to_lists() {
        DataTable table = parse("",
                "| 3 | 5 |",
                "| 6 | 7 |"
        );

        List<List<String>> expected = asList(
                asList("3", "5"),
                asList("6", "7"));

        assertEquals(expected, converter.convert(table, LIST_OF_LIST));
        assertEquals(expected, converter.toLists(table, String.class));
    }

    @Test
    void convert_to_lists_of_primitive() {
        DataTable table = parse("",
                "| 3 | 5 |",
                "| 6 | 7 |"
        );

        List<List<Integer>> expected = asList(
                asList(3, 5),
                asList(6, 7)
        );

        assertEquals(expected, converter.toLists(table, Integer.class));
        assertEquals(expected, converter.convert(table, LIST_OF_LIST_OF_INT));
    }

    @Test
    void convert_to_lists_of_unknown_type__throws_exception__register_transformer() {
        DataTable table = parse("",
                " | 1911-03-20 |",
                " | 1916-09-13 |",
                " | 1907-11-14 |"
        );

        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                () -> converter.convert(table, LIST_OF_LIST_OF_DATE)
        );

        assertThat(exception.getMessage(), is("" +
                "Can't convert DataTable to List<List<java.util.Date>>.\n" +
                "Please review these problems:\n" +
                "\n" +
                " - There was no table cell transformer registered for java.util.Date.\n" +
                "   Please consider registering a table cell transformer.\n" +
                "\n" +
                " - There was no default table cell transformer registered to transform java.util.Date.\n" +
                "   Please consider registering a default table cell transformer.\n" +
                "\n" +
                "Note: Usually solving one is enough"
        ));
    }

    @Test
    void convert_to_map() {
        DataTable table = parse("",
                "| 3 | 4 |",
                "| 5 | 6 |"
        );

        Map<String, String> expected = new HashMap<String, String>() {{
            put("3", "4");
            put("5", "6");
        }};

        assertEquals(expected, converter.toMap(table, String.class, String.class));
        assertEquals(expected, converter.convert(table, Map.class));
    }


    @Test
    void convert_to_map__default_transformers_present() {
        registry.setDefaultDataTableEntryTransformer(TABLE_ENTRY_BY_TYPE_CONVERTER_SHOULD_NOT_BE_USED);
        registry.setDefaultDataTableCellTransformer(TABLE_CELL_BY_TYPE_CONVERTER_SHOULD_NOT_BE_USED);

        DataTable table = parse("",
                "| 3 | 4 |",
                "| 5 | 6 |"
        );

        Map<String, String> expected = new HashMap<String, String>() {{
            put("3", "4");
            put("5", "6");
        }};

        assertEquals(expected, converter.toMap(table, String.class, String.class));
        assertEquals(expected, converter.convert(table, Map.class));
    }

    @Test
    void convert_to_map__single_column() {
        DataTable table = parse("| 1 |");

        Map<Integer, String> expected = new HashMap<Integer, String>() {{
            put(1, null);
        }};

        assertEquals(expected, converter.toMap(table, Integer.class, Integer.class));
        assertEquals(expected, converter.convert(table, MAP_OF_INT_TO_INT));
    }

    @Test
    void convert_to_map_of_object_to_object() {
        DataTable table = parse("",
                "|      | lat       | lon         |",
                "| KMSY | 29.993333 | -90.258056  |",
                "| KSFO | 37.618889 | -122.375    |",
                "| KSEA | 47.448889 | -122.309444 |",
                "| KJFK | 40.639722 | -73.778889  |"
        );

        Map<AirPortCode, Coordinate> expected = new HashMap<AirPortCode, Coordinate>() {{
            put(new AirPortCode("KMSY"), new Coordinate(29.993333, -90.258056));
            put(new AirPortCode("KSFO"), new Coordinate(37.618889, -122.375));
            put(new AirPortCode("KSEA"), new Coordinate(47.448889, -122.309444));
            put(new AirPortCode("KJFK"), new Coordinate(40.639722, -73.778889));
        }};

        registry.defineDataTableType(new DataTableType(Coordinate.class, COORDINATE_TABLE_ENTRY_TRANSFORMER));
        registry.defineDataTableType(new DataTableType(AirPortCode.class, AIR_PORT_CODE_TABLE_CELL_TRANSFORMER));

        assertEquals(expected, converter.toMap(table, AirPortCode.class, Coordinate.class));
        assertEquals(expected, converter.convert(table, MAP_OF_AIR_PORT_CODE_TO_COORDINATE));
    }

    @Test
    void convert_to_map_of_object_to_object__with_implied_entries_by_count() {
        DataTable table = parse("",
                "| code | lat       | lon         |",
                "| KMSY | 29.993333 | -90.258056  |",
                "| KSFO | 37.618889 | -122.375    |",
                "| KSEA | 47.448889 | -122.309444 |",
                "| KJFK | 40.639722 | -73.778889  |"
        );

        Map<AirPortCode, Coordinate> expected = new HashMap<AirPortCode, Coordinate>() {{
            put(new AirPortCode("KMSY"), new Coordinate(29.993333, -90.258056));
            put(new AirPortCode("KSFO"), new Coordinate(37.618889, -122.375));
            put(new AirPortCode("KSEA"), new Coordinate(47.448889, -122.309444));
            put(new AirPortCode("KJFK"), new Coordinate(40.639722, -73.778889));
        }};

        registry.defineDataTableType(new DataTableType(Coordinate.class, COORDINATE_TABLE_ENTRY_TRANSFORMER));
        registry.defineDataTableType(new DataTableType(AirPortCode.class, AIR_PORT_CODE_TABLE_ENTRY_TRANSFORMER));

        assertEquals(expected, converter.toMap(table, AirPortCode.class, Coordinate.class));
        assertEquals(expected, converter.convert(table, MAP_OF_AIR_PORT_CODE_TO_COORDINATE));
    }

    @Test
    void convert_to_map_of_object_to_object__default_transformers_present() {
        registry.setDefaultDataTableEntryTransformer(TABLE_ENTRY_BY_TYPE_CONVERTER_SHOULD_NOT_BE_USED);
        registry.setDefaultDataTableCellTransformer(TABLE_CELL_BY_TYPE_CONVERTER_SHOULD_NOT_BE_USED);

        DataTable table = parse("",
                "|      | lat       | lon         |",
                "| KMSY | 29.993333 | -90.258056  |",
                "| KSFO | 37.618889 | -122.375    |",
                "| KSEA | 47.448889 | -122.309444 |",
                "| KJFK | 40.639722 | -73.778889  |"
        );

        Map<AirPortCode, Coordinate> expected = new HashMap<AirPortCode, Coordinate>() {{
            put(new AirPortCode("KMSY"), new Coordinate(29.993333, -90.258056));
            put(new AirPortCode("KSFO"), new Coordinate(37.618889, -122.375));
            put(new AirPortCode("KSEA"), new Coordinate(47.448889, -122.309444));
            put(new AirPortCode("KJFK"), new Coordinate(40.639722, -73.778889));
        }};

        registry.defineDataTableType(new DataTableType(Coordinate.class, COORDINATE_TABLE_ENTRY_TRANSFORMER));
        registry.defineDataTableType(new DataTableType(AirPortCode.class, AIR_PORT_CODE_TABLE_CELL_TRANSFORMER));

        assertEquals(expected, converter.toMap(table, AirPortCode.class, Coordinate.class));
        assertEquals(expected, converter.convert(table, MAP_OF_AIR_PORT_CODE_TO_COORDINATE));
    }


    @Test
    void convert_to_map_of_object_to_object__using_default_transformers() {
        DataTable table = parse("",
                "|      | lat       | lon         |",
                "| KMSY | 29.993333 | -90.258056  |",
                "| KSFO | 37.618889 | -122.375    |",
                "| KSEA | 47.448889 | -122.309444 |",
                "| KJFK | 40.639722 | -73.778889  |"
        );

        Map<AirPortCode, Coordinate> expected = new HashMap<AirPortCode, Coordinate>() {{
            put(new AirPortCode("KMSY"), new Coordinate(29.993333, -90.258056));
            put(new AirPortCode("KSFO"), new Coordinate(37.618889, -122.375));
            put(new AirPortCode("KSEA"), new Coordinate(47.448889, -122.309444));
            put(new AirPortCode("KJFK"), new Coordinate(40.639722, -73.778889));
        }};

        registry.setDefaultDataTableEntryTransformer(JACKSON_TABLE_ENTRY_BY_TYPE_CONVERTER);
        registry.setDefaultDataTableCellTransformer(JACKSON_TABLE_CELL_BY_TYPE_CONVERTER);

        assertEquals(expected, converter.toMap(table, AirPortCode.class, Coordinate.class));
        assertEquals(expected, converter.convert(table, MAP_OF_AIR_PORT_CODE_TO_COORDINATE));
    }


    @Test
    void convert_to_map_of_object_to_object__without_implied_entries__using_default_cell_transformer() {
        DataTable table = parse("",
                "| KMSY | KSFO |",
                "| KSFO | KSEA |",
                "| KSEA | KJFK |",
                "| KJFK | AMS  |"
        );

        Map<AirPortCode, AirPortCode> expected = new HashMap<AirPortCode, AirPortCode>() {{
            put(new AirPortCode("KMSY"), new AirPortCode("KSFO"));
            put(new AirPortCode("KSFO"), new AirPortCode("KSEA"));
            put(new AirPortCode("KSEA"), new AirPortCode("KJFK"));
            put(new AirPortCode("KJFK"), new AirPortCode("AMS"));
        }};
        registry.setDefaultDataTableCellTransformer(JACKSON_TABLE_CELL_BY_TYPE_CONVERTER);

        assertEquals(expected, converter.toMap(table, AirPortCode.class, AirPortCode.class));
        assertEquals(expected, converter.convert(table, MAP_OF_AIR_PORT_CODE_TO_AIR_PORT_CODE));
    }

    @Test
    void to_map_of_object_to_object__without_implied_entries__prefers__default_table_entry_converter() {
        DataTable table = parse("",
                "| KMSY | KSFO |",
                "| KSFO | KSEA |",
                "| KSEA | KJFK |",
                "| KJFK | AMS  |"
        );

        Map<AirPortCode, AirPortCode> expected = new HashMap<AirPortCode, AirPortCode>() {{
            put(new AirPortCode("KMSY"), new AirPortCode("KSFO"));
            put(new AirPortCode("KSFO"), new AirPortCode("KSEA"));
            put(new AirPortCode("KSEA"), new AirPortCode("KJFK"));
            put(new AirPortCode("KJFK"), new AirPortCode("AMS"));
        }};

        registry.setDefaultDataTableCellTransformer(JACKSON_TABLE_CELL_BY_TYPE_CONVERTER);

        assertEquals(expected, converter.convert(table, MAP_OF_AIR_PORT_CODE_TO_AIR_PORT_CODE));
    }

    @Test
    void convert_to_map_of_primitive_to_list_of_primitive() {
        DataTable table = parse("",
                "| KMSY | 29.993333 | -90.258056  |",
                "| KSFO | 37.618889 | -122.375    |",
                "| KSEA | 47.448889 | -122.309444 |",
                "| KJFK | 40.639722 | -73.778889  |"
        );

        Map<String, List<Double>> expected = new HashMap<String, List<Double>>() {{
            put("KMSY", asList(29.993333, -90.258056));
            put("KSFO", asList(37.618889, -122.375));
            put("KSEA", asList(47.448889, -122.309444));
            put("KJFK", asList(40.639722, -73.778889));
        }};

        assertEquals(expected, converter.convert(table, MAP_OF_STRING_TO_LIST_OF_DOUBLE));
    }


    @Test
    void convert_to_map_of_primitive_to_list_of_object() throws ParseException {
        DataTable table = parse("",
                " | Annie M. G. | 1995-03-21 | 1911-03-20 |",
                " | Roald       | 1990-09-13 | 1916-09-13 |",
                " | Astrid      | 1907-10-14 | 1907-11-14 |"
        );

        Map<String, List<Date>> expected = new HashMap<String, List<Date>>() {{
            put("Annie M. G.", asList(SIMPLE_DATE_FORMAT.parse("1995-03-21"), SIMPLE_DATE_FORMAT.parse("1911-03-20")));
            put("Roald", asList(SIMPLE_DATE_FORMAT.parse("1990-09-13"), SIMPLE_DATE_FORMAT.parse("1916-09-13")));
            put("Astrid", asList(SIMPLE_DATE_FORMAT.parse("1907-10-14"), SIMPLE_DATE_FORMAT.parse("1907-11-14")));
        }};

        registry.defineDataTableType(DATE_TABLE_CELL_TRANSFORMER);

        assertEquals(expected, converter.convert(table, MAP_OF_STRING_TO_LIST_OF_DATE));
    }

    @Test
    void convert_to_map_of_primitive_to_list_of_object__with_default_converter() throws ParseException {
        DataTable table = parse("",
                " | Annie M. G. | 1995-03-21 | 1911-03-20 |",
                " | Roald       | 1990-09-13 | 1916-09-13 |",
                " | Astrid      | 1907-10-14 | 1907-11-14 |"
        );

        Map<String, List<Date>> expected = new HashMap<String, List<Date>>() {{
            put("Annie M. G.", asList(SIMPLE_DATE_FORMAT.parse("1995-03-21"), SIMPLE_DATE_FORMAT.parse("1911-03-20")));
            put("Roald", asList(SIMPLE_DATE_FORMAT.parse("1990-09-13"), SIMPLE_DATE_FORMAT.parse("1916-09-13")));
            put("Astrid", asList(SIMPLE_DATE_FORMAT.parse("1907-10-14"), SIMPLE_DATE_FORMAT.parse("1907-11-14")));
        }};

        registry.setDefaultDataTableCellTransformer(JACKSON_TABLE_CELL_BY_TYPE_CONVERTER);

        assertEquals(expected, converter.convert(table, MAP_OF_STRING_TO_LIST_OF_DATE));
    }

    @Test
    void convert_to_map_of_primitive_to_list_of_primitive__default_converter_present() {
        registry.setDefaultDataTableEntryTransformer(TABLE_ENTRY_BY_TYPE_CONVERTER_SHOULD_NOT_BE_USED);
        registry.setDefaultDataTableCellTransformer(TABLE_CELL_BY_TYPE_CONVERTER_SHOULD_NOT_BE_USED);

        DataTable table = parse("",
                "| KMSY | 29.993333 | -90.258056  |",
                "| KSFO | 37.618889 | -122.375    |",
                "| KSEA | 47.448889 | -122.309444 |",
                "| KJFK | 40.639722 | -73.778889  |"
        );

        Map<String, List<Double>> expected = new HashMap<String, List<Double>>() {{
            put("KMSY", asList(29.993333, -90.258056));
            put("KSFO", asList(37.618889, -122.375));
            put("KSEA", asList(47.448889, -122.309444));
            put("KJFK", asList(40.639722, -73.778889));
        }};

        assertEquals(expected, converter.convert(table, MAP_OF_STRING_TO_LIST_OF_DOUBLE));
    }

    @Test
    void convert_to_map_of_primitive_to_map_of_primitive_to_object() {
        DataTable table = parse("",
                "  |   | 1 | 2 | 3 |",
                "  | A | ♘ |   | ♝ |",
                "  | B |   |   |   |",
                "  | C |   | ♝ |   |"
        );

        registry.defineDataTableType(new DataTableType(Piece.class, PIECE_TABLE_CELL_TRANSFORMER));

        Map<String, Map<Integer, Piece>> expected = new HashMap<String, Map<Integer, Piece>>() {{
            put("A", new HashMap<Integer, Piece>() {{
                put(1, Piece.WHITE_KNIGHT);
                put(2, null);
                put(3, Piece.BLACK_BISHOP);
            }});
            put("B", new HashMap<Integer, Piece>() {{
                put(1, null);
                put(2, null);
                put(3, null);
            }});
            put("C", new HashMap<Integer, Piece>() {{
                put(1, null);
                put(2, Piece.BLACK_BISHOP);
                put(3, null);
            }});
        }};

        assertEquals(expected, converter.convert(table, MAP_OF_STRING_TO_MAP_OF_INTEGER_TO_PIECE));
    }

    @Test
    void convert_to_map_of_primitive_to_map_of_primitive_to_primitive() {
        DataTable table = parse("",
                "|      | lat       | lon         |",
                "| KMSY | 29.993333 | -90.258056  |",
                "| KSFO | 37.618889 | -122.375    |",
                "| KSEA | 47.448889 | -122.309444 |",
                "| KJFK | 40.639722 | -73.778889  |"
        );


        Map<String, Map<String, Double>> expected = new HashMap<String, Map<String, Double>>() {{
            put("KMSY", new HashMap<String, Double>() {{
                put("lat", 29.993333);
                put("lon", -90.258056);
            }});
            put("KSFO", new HashMap<String, Double>() {{
                put("lat", 37.618889);
                put("lon", -122.375);
            }});
            put("KSEA", new HashMap<String, Double>() {{
                put("lat", 47.448889);
                put("lon", -122.309444);
            }});
            put("KJFK", new HashMap<String, Double>() {{
                put("lat", 40.639722);
                put("lon", -73.778889);
            }});
        }};

        assertEquals(expected, converter.convert(table, MAP_OF_STRING_TO_MAP_OF_STRING_DOUBLE));
    }

    @Test
    void convert_to_map_of_primitive_to_object__blank_first_cell() {
        DataTable table = parse("",
                "|      | lat       | lon         |",
                "| KMSY | 29.993333 | -90.258056  |",
                "| KSFO | 37.618889 | -122.375    |",
                "| KSEA | 47.448889 | -122.309444 |",
                "| KJFK | 40.639722 | -73.778889  |"
        );

        Map<String, Coordinate> expected = new HashMap<String, Coordinate>() {{
            put("KMSY", new Coordinate(29.993333, -90.258056));
            put("KSFO", new Coordinate(37.618889, -122.375));
            put("KSEA", new Coordinate(47.448889, -122.309444));
            put("KJFK", new Coordinate(40.639722, -73.778889));
        }};

        registry.defineDataTableType(new DataTableType(Coordinate.class, COORDINATE_TABLE_ENTRY_TRANSFORMER));

        assertEquals(expected, converter.toMap(table, String.class, Coordinate.class));
        assertEquals(expected, converter.convert(table, MAP_OF_STRING_TO_COORDINATE));
    }

    @Test
    void convert_to_map_of_primitive_to_primitive() {
        DataTable table = parse("",
                "| 84 | Annie M. G. Schmidt |",
                "| 74 | Roald Dahl          |",
                "| 94 | Astrid Lindgren     |");

        Map<Integer, String> expected = new HashMap<Integer, String>() {{
            put(84, "Annie M. G. Schmidt");
            put(74, "Roald Dahl");
            put(94, "Astrid Lindgren");
        }};

        assertEquals(expected, converter.toMap(table, Integer.class, String.class));
        assertEquals(expected, converter.convert(table, MAP_OF_INT_TO_STRING));
    }

    @Test
    void convert_to_map_of_string_to_map() {
        DataTable table = parse("",
                "|      | lat       | lon         |",
                "| KMSY | 29.993333 | -90.258056  |",
                "| KSFO | 37.618889 | -122.375    |",
                "| KSEA | 47.448889 | -122.309444 |",
                "| KJFK | 40.639722 | -73.778889  |"
        );

        Map<String, Map<String, String>> expected = new HashMap<String, Map<String, String>>() {{
            put("KMSY", new HashMap<String, String>() {{
                put("lat", "29.993333");
                put("lon", "-90.258056");
            }});
            put("KSFO", new HashMap<String, String>() {{
                put("lat", "37.618889");
                put("lon", "-122.375");
            }});
            put("KSEA", new HashMap<String, String>() {{
                put("lat", "47.448889");
                put("lon", "-122.309444");
            }});
            put("KJFK", new HashMap<String, String>() {{
                put("lat", "40.639722");
                put("lon", "-73.778889");
            }});
        }};


        assertEquals(expected, converter.convert(table, MAP_OF_STRING_TO_MAP));
    }

    @Test
    void convert_to_map_of_string_to_string__throws_exception__blank_space() {
        DataTable table = parse("",
                "|           | -90.258056  |",
                "| 37.618889 | -122.375    |",
                "| 47.448889 | -122.309444 |",
                "| 40.639722 | -73.778889  |"
        );

        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                () -> converter.convert(table, MAP_OF_STRING_TO_LIST_OF_DOUBLE)
        );
        assertThat(exception.getMessage(), is(format("" +
                        "Can't convert DataTable to Map<%s, %s>.\n" +
                        "There are more values then keys. " +
                        "The first header cell was left blank. " +
                        "You can add a value there",
                typeName(String.class), LIST_OF_DOUBLE)));
    }

    @Test
    void convert_to_map_of_string_to_string__throws_exception__more_then_one_value_per_key() {
        DataTable table = parse("",
                "| KMSY | 29.993333 | -90.258056  |",
                "| KSFO | 37.618889 | -122.375    |",
                "| KSEA | 47.448889 | -122.309444 |",
                "| KJFK | 40.639722 | -73.778889  |"
        );

        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                () -> converter.convert(table, MAP_OF_STRING_TO_STRING)
        );
        assertThat(exception.getMessage(), is(format("" +
                        "Can't convert DataTable to Map<%s, %s>.\n" +
                        "There is more then one value per key. " +
                        "Did you mean to transform to Map<%s, List<%s>> instead?",
                typeName(String.class), typeName(String.class), typeName(String.class), typeName(String.class))));
    }

    @Test
    void convert_to_maps_of_primitive() {
        DataTable table = parse("",
                "| 1 | 2 | 3 |",
                "| 4 | 5 | 6 |",
                "| 7 | 8 | 9 |"
        );

        List<HashMap<Integer, Integer>> expected = asList(
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
        assertEquals(expected, converter.convert(table, LIST_OF_MAP_OF_INT_TO_INT));
    }

    @Test
    void convert_to_maps_of_integer_to_null() {
        DataTable table = DataTable.create(asList(
                asList("1", "2"),
                asList(null, null)
        ));

        List<HashMap<Integer, Integer>> expected = singletonList(
                new HashMap<Integer, Integer>() {{
                    put(1, null);
                    put(2, null);
                }}
        );

        assertEquals(expected, converter.toMaps(table, Integer.class, Integer.class));
        assertEquals(expected, converter.convert(table, LIST_OF_MAP_OF_INT_TO_INT));
    }

    @Test
    void convert_to_object() {
        registry.setDefaultDataTableEntryTransformer(TABLE_ENTRY_BY_TYPE_CONVERTER_SHOULD_NOT_BE_USED);
        registry.setDefaultDataTableCellTransformer(TABLE_CELL_BY_TYPE_CONVERTER_SHOULD_NOT_BE_USED);

        DataTable table = parse("",
                "  |   | 1 | 2 | 3 |",
                "  | A | ♘ |   | ♝ |",
                "  | B |   |   |   |",
                "  | C |   | ♝ |   |"
        );

        registry.defineDataTableType(new DataTableType(ChessBoard.class, CHESS_BOARD_TABLE_TRANSFORMER));
        ChessBoard expected = new ChessBoard(asList("♘", "♝", "♝"));

        assertEquals(expected, converter.convert(table, ChessBoard.class));
    }

    @Test
    void convert_to_object__more_then_one_item__throws_exception() {
        DataTable table = parse("",
                "| ♘ |",
                "| ♝ |"
        );

        registry.defineDataTableType(new DataTableType(Piece.class, PIECE_TABLE_CELL_TRANSFORMER));

        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                () -> converter.convert(table, Piece.class)
        );
        assertThat(exception.getMessage(), is(format("" +
                        "Can't convert DataTable to %s. " +
                        "The table contained more then one item: [♘, ♝]",
                typeName(Piece.class))));
    }


    @Test
    void convert_to_object__too_wide__throws_exception() {
        DataTable table = parse("",
                "| ♘ | ♝ |"
        );

        registry.defineDataTableType(new DataTableType(Piece.class, PIECE_TABLE_CELL_TRANSFORMER));

        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                () -> converter.convert(table, Piece.class)
        );
        assertThat(exception.getMessage(), is("" +
                "Can't convert DataTable to io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Piece.\n" +
                "Please review these problems:\n" +
                "\n" +
                " - There was a table cell transformer for io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Piece but the table was too wide to use it.\n" +
                "   Please reduce the table width to use this converter.\n" +
                "\n" +
                " - There was no table entry or table row transformer registered for io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Piece.\n" +
                "   Please consider registering a table entry or row transformer.\n" +
                "\n" +
                "Note: Usually solving one is enough"));
    }

    @Test
    void convert_to_primitive__empty_table_to_null() {
        DataTable table = emptyDataTable();
        assertNull(converter.convert(table, Integer.class));
    }

    @Test
    void convert_to_primitive__single_cell() {
        DataTable table = parse("| 3 |");
        assertEquals(Integer.valueOf(3), converter.convert(table, Integer.class));
    }

    @Test
    void convert_to_single_object__single_cell() {
        DataTable table = parse("| ♝ |");
        registry.defineDataTableType(new DataTableType(Piece.class, PIECE_TABLE_CELL_TRANSFORMER));

        assertEquals(Piece.BLACK_BISHOP, converter.convert(table, Piece.class));
    }

    @Test
    void convert_to_single_object__single_cell__with_default_transformer_present() {
        registry.setDefaultDataTableEntryTransformer(TABLE_ENTRY_BY_TYPE_CONVERTER_SHOULD_NOT_BE_USED);
        registry.setDefaultDataTableCellTransformer(TABLE_CELL_BY_TYPE_CONVERTER_SHOULD_NOT_BE_USED);

        DataTable table = parse("| ♝ |");
        registry.defineDataTableType(new DataTableType(Piece.class, PIECE_TABLE_CELL_TRANSFORMER));

        assertEquals(Piece.BLACK_BISHOP, converter.convert(table, Piece.class));
    }

    @Test
    void convert_to_single_object__single_cell__using_default_transformer() {
        DataTable table = parse("| BLACK_BISHOP |");
        registry.setDefaultDataTableEntryTransformer(TABLE_ENTRY_BY_TYPE_CONVERTER_SHOULD_NOT_BE_USED);
        registry.setDefaultDataTableCellTransformer(JACKSON_TABLE_CELL_BY_TYPE_CONVERTER);

        assertEquals(Piece.BLACK_BISHOP, converter.convert(table, Piece.class));
    }

    @Test
    void convert_to_table__table_transformer_takes_precedence_over_identity_transform() {
        DataTable table = parse("",
                "  |   | 1 | 2 | 3 |",
                "  | A | ♘ |   | ♝ |",
                "  | B |   |   |   |",
                "  | C |   | ♝ |   |"
        );

        DataTable expected = emptyDataTable();
        registry.defineDataTableType(new DataTableType(DataTable.class, (DataTable raw) -> expected));

        assertSame(expected, converter.convert(table, DataTable.class));
    }

    @Test
    void convert_to_table__transposed() {
        DataTable table = parse("",
                "  |   | 1 | 2 | 3 |",
                "  | A | ♘ |   | ♝ |",
                "  | B |   |   |   |",
                "  | C |   | ♝ |   |"
        );

        assertEquals(table.transpose(), converter.convert(table, DataTable.class, true));
    }

    @Test
    void convert_to_unknown_type__throws_exception() {
        DataTable table = parse("",
                "| ♘ |"
        );

        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                () -> converter.convert(table, Piece.class));
        assertThat(exception.getMessage(), is("" +
                "Can't convert DataTable to io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Piece.\n" +
                "Please review these problems:\n" +
                "\n" +
                " - There was no table entry or table row transformer registered for io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Piece.\n" +
                "   Please consider registering a table entry or row transformer.\n" +
                "\n" +
                " - There was no table cell transformer registered for io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Piece.\n" +
                "   Please consider registering a table cell transformer.\n" +
                "\n" +
                " - There was no default table cell transformer registered to transform io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Piece.\n" +
                "   Please consider registering a default table cell transformer.\n" +
                "\n" +
                "Note: Usually solving one is enough"));
    }

    @Test
    void convert_to_unknown_type__throws_exception__with_table_entry_converter_present__throws_exception() {
        DataTable table = parse("",
                "| ♘ |"
        );
        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                () -> converter.convert(table, Piece.class));
        assertThat(exception.getMessage(), is("" +
                "Can't convert DataTable to io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Piece.\n" +
                "Please review these problems:\n" +
                "\n" +
                " - There was no table entry or table row transformer registered for io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Piece.\n" +
                "   Please consider registering a table entry or row transformer.\n" +
                "\n" +
                " - There was no table cell transformer registered for io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Piece.\n" +
                "   Please consider registering a table cell transformer.\n" +
                "\n" +
                " - There was no default table cell transformer registered to transform io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Piece.\n" +
                "   Please consider registering a default table cell transformer.\n" +
                "\n" +
                "Note: Usually solving one is enough"));
    }


    @Test
    void to_list__single_column__throws_exception__register_transformer() {
        DataTable table = parse("",
                "| ♘ |",
                "| ♝ |"
        );

        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                () -> converter.toList(table, Piece.class)
        );
        assertThat(exception.getMessage(), is("" +
                "Can't convert DataTable to List<io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Piece>.\n" +
                "Please review these problems:\n" +
                "\n" +
                " - There was no table entry or table row transformer registered for io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Piece.\n" +
                "   Please consider registering a table entry or row transformer.\n" +
                "\n" +
                " - There was no table cell transformer registered for io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Piece.\n" +
                "   Please consider registering a table cell transformer.\n" +
                "\n" +
                " - There was no default table entry transformer registered to transform io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Piece.\n" +
                "   Please consider registering a default table entry transformer.\n" +
                "\n" +
                " - There was no default table cell transformer registered to transform io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Piece.\n" +
                "   Please consider registering a default table cell transformer.\n" +
                "\n" +
                "Note: Usually solving one is enough"
        ));
    }

    @Test
    void to_list_of_unknown_type__throws_exception() {
        DataTable table = parse("",
                " | firstName   | lastName | birthDate  |",
                " | Annie M. G. | Schmidt  | 1911-03-20 |",
                " | Roald       | Dahl     | 1916-09-13 |",
                " | Astrid      | Lindgren | 1907-11-14 |"
        );

        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                () -> converter.toList(table, Author.class)
        );
        assertThat(exception.getMessage(), is("" +
                "Can't convert DataTable to List<io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Author>.\n" +
                "Please review these problems:\n" +
                "\n" +
                " - There was no table entry or table row transformer registered for io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Author.\n" +
                "   Please consider registering a table entry or row transformer.\n" +
                "\n" +
                " - There was no default table entry transformer registered to transform io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Author.\n" +
                "   Please consider registering a default table entry transformer.\n" +
                "\n" +
                "Note: Usually solving one is enough"
        ));
    }

    @Test
    void to_lists_of_unknown_type__throws_exception() {
        DataTable table = parse("",
                " | firstName   | lastName | birthDate  |",
                " | Annie M. G. | Schmidt  | 1911-03-20 |",
                " | Roald       | Dahl     | 1916-09-13 |",
                " | Astrid      | Lindgren | 1907-11-14 |"
        );

        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class, () -> converter.toLists(table, Author.class)
        );
        assertThat(exception.getMessage(), is("" +
                "Can't convert DataTable to List<List<io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Author>>.\n" +
                "Please review these problems:\n" +
                "\n" +
                " - There was no table cell transformer registered for io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Author.\n" +
                "   Please consider registering a table cell transformer.\n" +
                "\n" +
                " - There was no default table cell transformer registered to transform io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Author.\n" +
                "   Please consider registering a default table cell transformer.\n" +
                "\n" +
                "Note: Usually solving one is enough"
        ));
    }

    @Test
    void to_map__duplicate_keys__throws_exception() {
        DataTable table = parse("",
                "|      | lat       | lon         |",
                "| KMSY | 29.993333 | -90.258056  |",
                "| KSEA | 47.448889 | -122.309444 |",
                "| KSFO | 37.618889 | -122.375    |",
                "| KSEA | 47.448889 | -122.309444 |",
                "| KJFK | 40.639722 | -73.778889  |"
        );

        registry.defineDataTableType(new DataTableType(AirPortCode.class, AIR_PORT_CODE_TABLE_CELL_TRANSFORMER));
        registry.defineDataTableType(new DataTableType(Coordinate.class, COORDINATE_TABLE_ENTRY_TRANSFORMER));

        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                () -> converter.toMap(table, AirPortCode.class, Coordinate.class)
        );
        assertThat(exception.getMessage(), startsWith(format("" +
                "Can't convert DataTable to Map<%s, %s>.\n" +
                "Encountered duplicate key", typeName(AirPortCode.class), typeName(Coordinate.class))));
    }

    @Test
    void to_map_of_entry_to_primitive__blank_first_cell__throws_exception__key_type_was_entry() {
        DataTable table = parse("",
                "| code |                                                   |",
                "| KMSY | Louis Armstrong New Orleans International Airport |",
                "| KSFO | San Francisco International Airport               |",
                "| KSEA | Seattle–Tacoma International Airport              |",
                "| KJFK | John F. Kennedy International Airport             |"
        );

        registry.defineDataTableType(new DataTableType(AirPortCode.class, AIR_PORT_CODE_TABLE_ENTRY_TRANSFORMER));

        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                () -> converter.toMap(table, AirPortCode.class, String.class)
        );
        assertThat(exception.getMessage(), is("" +
                "Can't convert DataTable to Map<io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$AirPortCode, java.lang.String>.\n" +
                "The first cell was either blank or you have registered a TableEntryTransformer for the key type.\n" +
                "\n" +
                "This requires that there is a TableEntryTransformer for the value type but I couldn't find any.\n" +
                "\n" +
                "You can either:\n" +
                "\n" +
                "  1) Use a DataTableType that uses a TableEntryTransformer for class java.lang.String\n" +
                "\n" +
                "  2) Add a key to the first cell and use a DataTableType that uses a TableEntryTransformer for class io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$AirPortCode"
        ));
    }

    @Test
    void to_map_of_entry_to_row__throws_exception__more_values_then_keys() {
        DataTable table = parse("",
                "| code | 29.993333 | -90.258056  |",
                "| KSFO | 37.618889 | -122.375    |",
                "| KSEA | 47.448889 | -122.309444 |",
                "| KJFK | 40.639722 | -73.778889  |"
        );

        registry.defineDataTableType(new DataTableType(AirPortCode.class, AIR_PORT_CODE_TABLE_ENTRY_TRANSFORMER));
        registry.defineDataTableType(new DataTableType(Coordinate.class, COORDINATE_TABLE_ROW_TRANSFORMER));

        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                () -> converter.toMap(table, AirPortCode.class, Coordinate.class)
        );
        assertThat(exception.getMessage(), is(format("" +
                        "Can't convert DataTable to Map<%s, %s>.\n" +
                        "There are more values then keys. " +
                        "Did you use a TableEntryTransformer for the key " +
                        "while using a TableRow or TableCellTransformer for the value?",
                typeName(AirPortCode.class), typeName(Coordinate.class))));
    }

    @Test
    void to_map_of_object_to_unknown_type__throws_exception__register_table_entry_transformer() {
        DataTable table = parse("",
                "| code | lat       | lon         |",
                "| KMSY | 29.993333 | -90.258056  |",
                "| KSFO | 37.618889 | -122.375    |",
                "| KSEA | 47.448889 | -122.309444 |",
                "| KJFK | 40.639722 | -73.778889  |"
        );

        registry.defineDataTableType(new DataTableType(AirPortCode.class, AIR_PORT_CODE_TABLE_ENTRY_TRANSFORMER));

        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                () -> converter.toMap(table, AirPortCode.class, Coordinate.class)
        );
        assertThat(exception.getMessage(), startsWith(format("" +
                        "Can't convert DataTable to Map<%s, %s>.\n" +
                        "The first cell was either blank or you have registered a TableEntryTransformer for the key type.",
                typeName(AirPortCode.class), typeName(Coordinate.class))));
    }

    @Test
    void to_map_of_primitive_to_entry__throws_exception__more_keys_then_values() {
        DataTable table = parse("",
                "| code | lat       | lon         |",
                "| KMSY | 29.993333 | -90.258056  |",
                "| KSFO | 37.618889 | -122.375    |",
                "| KSEA | 47.448889 | -122.309444 |",
                "| KJFK | 40.639722 | -73.778889  |"
        );

        registry.defineDataTableType(new DataTableType(Coordinate.class, COORDINATE_TABLE_ENTRY_TRANSFORMER));


        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                () -> converter.toMap(table, String.class, Coordinate.class)
        );
        assertThat(exception.getMessage(), is(format("" +
                "Can't convert DataTable to Map<%s, %s>.\n" +
                "There are more keys than values. " +
                "Did you use a TableEntryTransformer for the value " +
                "while using a TableRow or TableCellTransformer for the keys?", typeName(String.class), typeName(Coordinate.class))));
    }

    @Test
    void to_map_of_primitive_to_primitive__blank_first_cell__throws_exception__first_cell_was_blank() {
        DataTable table = parse("",
                " |                     | birthDate  |",
                " | Annie M. G. Schmidt | 1911-03-20 |",
                " | Roald Dahl          | 1916-09-13 |",
                " | Astrid Lindgren     | 1907-11-14 |"
        );

        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                () -> converter.toMap(table, String.class, String.class)
        );
        assertThat(exception.getMessage(), startsWith(format("" +
                        "Can't convert DataTable to Map<%s, %s>.\n" +
                        "The first cell was either blank or you have registered a TableEntryTransformer for the key type.",
                typeName(String.class), typeName(String.class))));
    }

    @Test
    void to_map_of_unknown_key_type__throws_exception() {
        DataTable table = parse("",
                " | name                | birthDate  |",
                " | Annie M. G. Schmidt | 1911-03-20 |",
                " | Roald Dahl          | 1916-09-13 |",
                " | Astrid Lindgren     | 1907-11-14 |"
        );

        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                () -> converter.toMap(table, Author.class, String.class)
        );
        assertThat(exception.getMessage(), is("" +
                "Can't convert DataTable to Map<io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Author, java.lang.String>.\n" +
                "Please review these problems:\n" +
                "\n" +
                " - There was no table entry or table row transformer registered for io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Author.\n" +
                "   Please consider registering a table entry or row transformer.\n" +
                "\n" +
                " - There was no table cell transformer registered for io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Author.\n" +
                "   Please consider registering a table cell transformer.\n" +
                "\n" +
                " - There was no default table entry transformer registered to transform io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Author.\n" +
                "   Please consider registering a default table entry transformer.\n" +
                "\n" +
                " - There was no default table cell transformer registered to transform io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Author.\n" +
                "   Please consider registering a default table cell transformer.\n" +
                "\n" +
                "Note: Usually solving one is enough"
        ));
    }

    @Test
    void to_map_of_unknown_type_to_object__throws_exception__register_table_cell_transformer() {
        DataTable table = parse("",
                "|      | lat       | lon         |",
                "| KMSY | 29.993333 | -90.258056  |",
                "| KSFO | 37.618889 | -122.375    |",
                "| KSEA | 47.448889 | -122.309444 |",
                "| KJFK | 40.639722 | -73.778889  |"
        );

        registry.defineDataTableType(new DataTableType(Coordinate.class, COORDINATE_TABLE_ENTRY_TRANSFORMER));

        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                () -> converter.toMap(table, AirPortCode.class, Coordinate.class)
        );
        assertThat(exception.getMessage(), is("" +
                "Can't convert DataTable to Map<io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$AirPortCode, io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Coordinate>.\n" +
                "Please review these problems:\n" +
                "\n" +
                " - There was no table cell transformer registered for io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$AirPortCode.\n" +
                "   Please consider registering a table cell transformer.\n" +
                "\n" +
                " - There was no default table cell transformer registered to transform io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$AirPortCode.\n" +
                "   Please consider registering a default table cell transformer.\n" +
                "\n" +
                "Note: Usually solving one is enough"
        ));
    }

    @Test
    void to_map_of_unknown_value_type__throws_exception() {
        DataTable table = parse("",
                " | Annie M. G. Schmidt | 1911-03-20 |",
                " | Roald Dahl          | 1916-09-13 |",
                " | Astrid Lindgren     | 1907-11-14 |"
        );
        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                () -> converter.toMap(table, String.class, Date.class)
        );
        assertThat(exception.getMessage(), is("" +
                "Can't convert DataTable to Map<java.lang.String, java.util.Date>.\n" +
                "Please review these problems:\n" +
                "\n" +
                " - There was no table entry transformer registered for java.util.Date.\n" +
                "   Please consider registering a table entry transformer.\n" +
                "\n" +
                " - There was no table cell transformer registered for java.util.Date.\n" +
                "   Please consider registering a table cell transformer.\n" +
                "\n" +
                " - There was no default table cell transformer registered to transform java.util.Date.\n" +
                "   Please consider registering a default table cell transformer.\n" +
                "\n" +
                "Note: Usually solving one is enough"
        ));
    }

    @Test
    void to_map_of_primitive_to_list_of_unknown__throws_exception() {
        DataTable table = parse("",
                " | Annie M. G. | 1995-03-21 | 1911-03-20 |",
                " | Roald       | 1990-09-13 | 1916-09-13 |",
                " | Astrid      | 1907-10-14 | 1907-11-14 |"
        );

        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                () -> converter.convert(table, MAP_OF_STRING_TO_LIST_OF_DATE)
        );
        assertThat(exception.getMessage(), is("" +
                "Can't convert DataTable to Map<java.lang.String, java.util.List<java.util.Date>>.\n" +
                "Please review these problems:\n" +
                "\n" +
                " - There was no table cell transformer registered for java.util.Date.\n" +
                "   Please consider registering a table cell transformer.\n" +
                "\n" +
                " - There was no default table cell transformer registered to transform java.util.Date.\n" +
                "   Please consider registering a default table cell transformer.\n" +
                "\n" +
                "Note: Usually solving one is enough"
        ));
    }

    @Test
    void to_maps_cant_convert_table_with_duplicate_keys() {
        DataTable table = parse("",
                "| 1 | 1 | 1 |",
                "| 4 | 5 | 6 |",
                "| 7 | 8 | 9 |"
        );

        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                () -> converter.toMaps(table, Integer.class, Integer.class)
        );
        assertThat(exception.getMessage(), is(format("" +
                        "Can't convert DataTable to Map<%s, %s>.\n" +
                        "Encountered duplicate key 1 with values 4 and 5",
                typeName(Integer.class), typeName(Integer.class))));
    }

    @Test
    void to_maps_cant_convert_table_with_duplicate_null_keys() {
        DataTable table = DataTable.create(asList(
                asList(null, null),
                asList("1", "2")
        ));

        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                () -> converter.toMaps(table, Integer.class, Integer.class)
        );
        assertThat(exception.getMessage(), is(format("" +
                        "Can't convert DataTable to Map<%s, %s>.\n" +
                        "Encountered duplicate key null with values 1 and 2",
                typeName(Integer.class), typeName(Integer.class))));
    }

    @Test
    void to_maps_of_unknown_key_type__throws_exception__register_table_cell_transformer() {
        DataTable table = parse("",
                "| lat       | lon         |",
                "| 29.993333 | -90.258056  |",
                "| 37.618889 | -122.375    |",
                "| 47.448889 | -122.309444 |",
                "| 40.639722 | -73.778889  |"
        );

        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                () -> converter.toMaps(table, String.class, Coordinate.class)
        );
        assertThat(exception.getMessage(), is("" +
                "Can't convert DataTable to List<Map<java.lang.String, io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Coordinate>>.\n" +
                "Please review these problems:\n" +
                "\n" +
                " - There was no table cell transformer registered for io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Coordinate.\n" +
                "   Please consider registering a table cell transformer.\n" +
                "\n" +
                "Note: Usually solving one is enough"
        ));
    }

    @Test
    void to_maps_of_unknown_value_type__throws_exception__register_table_cell_transformer() {
        DataTable table = parse("",
                "| ♙  | ♟  |",
                "| a2 | a7 |",
                "| b2 | b7 |",
                "| c2 | c7 |",
                "| d2 | d7 |",
                "| e2 | e7 |",
                "| f2 | f7 |",
                "| g2 | g7 |",
                "| h2 | h7 |"
        );

        CucumberDataTableException exception = assertThrows(
                CucumberDataTableException.class,
                () -> converter.toMaps(table, Piece.class, String.class)
        );
        assertThat(exception.getMessage(), is("" +
                "Can't convert DataTable to List<Map<io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Piece, java.lang.String>>.\n" +
                "Please review these problems:\n" +
                "\n" +
                " - There was no table cell transformer registered for io.cucumber.datatable.DataTableTypeRegistryTableConverterTest$Piece.\n" +
                "   Please consider registering a table cell transformer.\n" +
                "\n" +
                "Note: Usually solving one is enough"
        ));
    }

    private enum Piece {
        BLACK_PAWN("♟"),
        BLACK_BISHOP("♝"),
        WHITE_PAWN("♙"),
        WHITE_KNIGHT("♘");

        private final String glyp;

        Piece(String glyp) {
            this.glyp = glyp;
        }

        public static Piece fromString(String glyp) {
            for (Piece piece : values()) {
                if (piece.glyp.equals(glyp)) {
                    return piece;
                }
            }
            return null;
        }

        @Override
        public String toString() {
            return glyp;
        }
    }

    @SuppressWarnings("unused")
    public static final class AirPortCode {
        private final String code;

        @ConstructorProperties("code")
        public AirPortCode(String code) {
            this.code = code;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            AirPortCode that = (AirPortCode) o;

            return code.equals(that.code);
        }

        @Override
        public int hashCode() {
            return code.hashCode();
        }

        @Override
        public String toString() {
            return "AirPortCode{" +
                    "code='" + code + '\'' +
                    '}';
        }

        public static AirPortCode fromString(String code) {
            return new AirPortCode(code);
        }
    }

    @SuppressWarnings("unused")
    private static final class Author {

        private String firstName;
        public String lastName;
        public String birthDate;

        private Author(String firstName, String lastName, String birthDate) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.birthDate = birthDate;
        }

        public Author() {
        }

        public void setFirstName(String firstName) {
            this.firstName = firstName;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            Author author = (Author) o;

            if (!firstName.equals(author.firstName)) return false;
            if (!lastName.equals(author.lastName)) return false;
            return birthDate.equals(author.birthDate);
        }

        @Override
        public int hashCode() {
            int result = firstName.hashCode();
            result = 31 * result + lastName.hashCode();
            result = 31 * result + birthDate.hashCode();
            return result;
        }

        @Override
        public String toString() {
            return "Author{" +
                    "firstName='" + firstName + '\'' +
                    ", lastName='" + lastName + '\'' +
                    ", birthDate='" + birthDate + '\'' +
                    '}';
        }
    }

    @SuppressWarnings("unused")
    private static final class Coordinate {

        public double lat;
        public double lon;

        public Coordinate() {
        }

        private Coordinate(double lat, double lon) {
            this.lat = lat;
            this.lon = lon;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            Coordinate that = (Coordinate) o;

            if (Double.compare(that.lat, lat) != 0) return false;
            return Double.compare(that.lon, lon) == 0;
        }

        @Override
        public int hashCode() {
            int result;
            long temp;
            temp = Double.doubleToLongBits(lat);
            result = (int) (temp ^ (temp >>> 32));
            temp = Double.doubleToLongBits(lon);
            result = 31 * result + (int) (temp ^ (temp >>> 32));
            return result;
        }

        @Override
        public String toString() {
            return "Coordinate{" +
                    "lat=" + lat +
                    ", lon=" + lon +
                    '}';
        }
    }

    private static final class ChessBoard {
        private final Multiset<Piece> pieces = HashMultiset.create();

        ChessBoard(List<String> glyphs) {
            for (String glyph : glyphs) {
                Piece piece = Piece.fromString(glyph);
                if (piece != null) {
                    pieces.add(piece);
                }
            }
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            ChessBoard that = (ChessBoard) o;

            return pieces.equals(that.pieces);
        }

        @Override
        public int hashCode() {
            return pieces.hashCode();
        }

        @Override
        public String toString() {
            return pieces.toString();
        }
    }

}
