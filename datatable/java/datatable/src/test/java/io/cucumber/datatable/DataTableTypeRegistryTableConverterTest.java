package io.cucumber.datatable;

import com.google.common.collect.HashMultiset;
import com.google.common.collect.Multiset;
import io.cucumber.datatable.DataTable.TableConverter;
import org.junit.Rule;
import org.junit.Test;
import org.junit.rules.ExpectedException;

import java.lang.reflect.Type;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static io.cucumber.datatable.DataTable.emptyDataTable;
import static io.cucumber.datatable.TableParser.parse;
import static java.lang.Double.parseDouble;
import static java.lang.String.format;
import static java.util.Arrays.asList;
import static java.util.Collections.emptyList;
import static java.util.Collections.emptyMap;
import static java.util.Locale.ENGLISH;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertSame;

public class DataTableTypeRegistryTableConverterTest {

    private static final Type MAP_OF_STRING_TO_COORDINATE = new TypeReference<Map<String, Coordinate>>() {
    }.getType();
    private static final Type MAP_OF_AIR_PORT_CODE_TO_COORDINATE = new TypeReference<Map<AirPortCode, Coordinate>>() {
    }.getType();
    private static final Type MAP_OF_STRING_TO_LIST_OF_DOUBLE = new TypeReference<Map<String, List<Double>>>() {
    }.getType();
    private static final Type LIST_OF_AUTHOR = new TypeReference<List<Author>>() {
    }.getType();
    private static final Type LIST_OF_MAP_OF_STRING_TO_INT = new TypeReference<List<Map<String, Integer>>>() {
    }.getType();
    private static final Type LIST_OF_INT = new TypeReference<List<Integer>>() {
    }.getType();
    private static final Type MAP_OF_INT_TO_INT = new TypeReference<Map<Integer, Integer>>() {
    }.getType();
    private static final Type LIST_OF_MAP = new TypeReference<List<Map>>() {
    }.getType();
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
    private static final Type MAP_OF_STRING_TO_MAP = new TypeReference<Map<String, Map>>() {
    }.getType();
    private static final Type MAP_OF_STRING_TO_STRING = new TypeReference<Map<String, String>>() {
    }.getType();
    private static final Type LIST_OF_DOUBLE = new TypeReference<List<Double>>() {
    }.getType();
    private static final Type MAP_OF_STRING_TO_MAP_OF_INTEGER_TO_PIECE = new TypeReference<Map<String, Map<Integer, Piece>>>() {
    }.getType();
    private static final TableTransformer<ChessBoard> CHESS_BOARD_TABLE_TRANSFORMER = new TableTransformer<ChessBoard>() {
        @Override
        public ChessBoard transform(DataTable table) throws Throwable {
            return new ChessBoard(table.subTable(1, 1).asList());
        }
    };
    private static final TableCellTransformer<Piece> PIECE_TABLE_CELL_TRANSFORMER = new TableCellTransformer<Piece>() {
        @Override
        public Piece transform(String cell) throws Throwable {
            return Piece.fromString(cell);
        }
    };
    private static final TableCellTransformer<AirPortCode> AIR_PORT_CODE_TABLE_CELL_TRANSFORMER = new TableCellTransformer<AirPortCode>() {
        @Override
        public AirPortCode transform(String cell) throws Throwable {
            return new AirPortCode(cell);
        }
    };
    private static final TableEntryTransformer<Coordinate> COORDINATE_TABLE_ENTRY_TRANSFORMER = new TableEntryTransformer<Coordinate>() {
        @Override
        public Coordinate transform(Map<String, String> tableEntry) {
            return new Coordinate(
                    parseDouble(tableEntry.get("latt")),
                    parseDouble(tableEntry.get("long"))
            );
        }
    };
    private static final TableEntryTransformer<Author> AUTHOR_TABLE_ENTRY_TRANSFORMER = new TableEntryTransformer<Author>() {
        @Override
        public Author transform(Map<String, String> tableEntry) throws Throwable {
            return new Author(tableEntry.get("firstName"), tableEntry.get("lastName"), tableEntry.get("birthDate"));
        }
    };
    private static final TableRowTransformer<Coordinate> COORDINATE_TABLE_ROW_TRANSFORMER = new TableRowTransformer<Coordinate>() {
        @Override
        public Coordinate transform(List<String> tableRow) throws Throwable {
            return new Coordinate(
                    Double.parseDouble(tableRow.get(0)),
                    Double.parseDouble(tableRow.get(1))
            );
        }
    };
    private static final TableEntryTransformer<AirPortCode> AIR_PORT_CODE_TABLE_ENTRY_TRANSFORMER = new TableEntryTransformer<AirPortCode>() {
        @Override
        public AirPortCode transform(Map<String, String> tableEntry) throws Throwable {
            return new AirPortCode(tableEntry.get("code"));
        }
    };

    private final DataTableTypeRegistry registry = new DataTableTypeRegistry(ENGLISH);
    private final TableConverter converter = new DataTableTypeRegistryTableConverter(registry);

    @Rule
    public ExpectedException expectedException = ExpectedException.none();

    @Test
    public void convert_to_empty_list__empty_table() {
        DataTable table = emptyDataTable();
        assertEquals(emptyList(), converter.toList(table, Integer.class));
        assertEquals(emptyList(), converter.convert(table, LIST_OF_INT));
    }

    @Test
    public void convert_to_empty_lists__empty_table() {
        DataTable table = emptyDataTable();
        assertEquals(emptyList(), converter.toLists(table, Integer.class));
        assertEquals(emptyList(), converter.convert(table, LIST_OF_LIST_OF_INT));
    }

    @Test
    public void convert_to_empty_map__blank_first_cell() {
        DataTable table = parse("|   |");
        assertEquals(emptyMap(), converter.toMap(table, Integer.class, Integer.class));
        assertEquals(emptyMap(), converter.convert(table, MAP_OF_INT_TO_INT));
    }

    @Test
    public void convert_to_empty_map__empty_table() {
        DataTable table = emptyDataTable();
        assertEquals(emptyMap(), converter.toMap(table, Integer.class, Integer.class));
        assertEquals(emptyMap(), converter.convert(table, MAP_OF_INT_TO_INT));
    }

    @Test
    public void convert_to_empty_maps__empty_table() {
        DataTable table = emptyDataTable();
        assertEquals(emptyList(), converter.toMaps(table, Integer.class, Integer.class));
        assertEquals(emptyList(), converter.convert(table, LIST_OF_MAP_OF_INT_TO_INT));
    }

    @Test
    public void convert_to_empty_maps__only_header() {
        final DataTable table = parse("",
                " | firstName | lastName | birthDate |"
        );
        assertEquals(emptyList(), converter.toMaps(table, String.class, Integer.class));
        assertEquals(emptyList(), converter.convert(table, LIST_OF_MAP_OF_STRING_TO_INT));
    }

    @Test
    public void convert_to_empty_table__empty_table() {
        DataTable table = emptyDataTable();
        assertSame(table, converter.convert(table, DataTable.class));
    }


    @Test
    public void convert_to_list() {
        DataTable table = parse("",
                "| 3 |",
                "| 5 |",
                "| 6 |",
                "| 7 | "
        );

        List<String> expected = asList("3", "5", "6", "7");

        assertEquals(expected, converter.toList(table, String.class));
        assertEquals(expected, converter.convert(table, List.class));
    }

    @Test
    public void convert_to_list__single_column() {
        DataTable table = parse("",
                "| 3 |",
                "| 5 |",
                "| 6 |",
                "| 7 | "
        );

        List<Integer> expected = asList(3, 5, 6, 7);

        assertEquals(expected, converter.toList(table, Integer.class));
        assertEquals(expected, converter.convert(table, LIST_OF_INT));
    }

    @Test
    public void convert_to_list_of_map() {
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
    public void convert_to_list_of_object() {
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

        registry.defineDataTableType(new DataTableType("author", Author.class, AUTHOR_TABLE_ENTRY_TRANSFORMER));

        assertEquals(expected, converter.toList(table, Author.class));
        assertEquals(expected, converter.convert(table, LIST_OF_AUTHOR));
    }

    @Test
    public void convert_to_list_of_primitive() {
        DataTable table = parse("",
                "| 3 | 5 |",
                "| 6 | 7 | "
        );

        List<Integer> expected = asList(3, 5, 6, 7);

        assertEquals(expected, converter.toList(table, Integer.class));
        assertEquals(expected, converter.convert(table, LIST_OF_INT));
    }

    @Test
    public void convert_to_list_of_unknown_type__throws_exception__register_transformer() {
        expectedException.expectMessage(format("" +
                        "Can't convert DataTable to List<%s>. " +
                        "Please register a DataTableType with a TableEntryTransformer or TableRowTransformer for %s",
                Author.class, Author.class));

        DataTable table = parse("",
                " | firstName   | lastName | birthDate  |",
                " | Annie M. G. | Schmidt  | 1911-03-20 |",
                " | Roald       | Dahl     | 1916-09-13 |",
                " | Astrid      | Lindgren | 1907-11-14 |"
        );
        converter.convert(table, LIST_OF_AUTHOR);
    }

    @Test
    public void convert_to_lists() {
        DataTable table = parse("",
                "| 3 | 5 |",
                "| 6 | 7 | "
        );

        List<List<String>> expected = asList(
                asList("3", "5"),
                asList("6", "7"));

        assertEquals(expected, converter.convert(table, LIST_OF_LIST));
        assertEquals(expected, converter.toLists(table, String.class));
    }

    @Test
    public void convert_to_lists_of_primitive() {
        DataTable table = parse("",
                "| 3 | 5 |",
                "| 6 | 7 | "
        );

        List<List<Integer>> expected = asList(
                asList(3, 5),
                asList(6, 7)
        );

        assertEquals(expected, converter.toLists(table, Integer.class));
        assertEquals(expected, converter.convert(table, LIST_OF_LIST_OF_INT));
    }

    @Test
    public void convert_to_lists_of_unknown_type__throws_exception__register_transformer() {
        expectedException.expectMessage(format("" +
                        "Can't convert DataTable to List<List<%s>>. " +
                        "Please register a DataTableType with a TableCellTransformer for %s",
                Date.class, Date.class));

        DataTable table = parse("",
                " | birthDate  |",
                " | 1911-03-20 |",
                " | 1916-09-13 |",
                " | 1907-11-14 |"
        );

        converter.convert(table, LIST_OF_LIST_OF_DATE);
    }

    @Test
    public void convert_to_map() {
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
    public void convert_to_map__single_column() {
        DataTable table = parse("| 1 |");

        Map<Integer, String> expected = new HashMap<Integer, String>() {{
            put(1, null);
        }};

        assertEquals(expected, converter.toMap(table, Integer.class, Integer.class));
        assertEquals(expected, converter.convert(table, MAP_OF_INT_TO_INT));
    }

    @Test
    public void convert_to_map_of_object_to_object() {
        DataTable table = parse("",
                "|      | latt      | long        |",
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

        registry.defineDataTableType(new DataTableType("coordinate", Coordinate.class, COORDINATE_TABLE_ENTRY_TRANSFORMER));
        registry.defineDataTableType(new DataTableType("airport", AirPortCode.class, AIR_PORT_CODE_TABLE_CELL_TRANSFORMER));

        assertEquals(expected, converter.toMap(table, AirPortCode.class, Coordinate.class));
        assertEquals(expected, converter.convert(table, MAP_OF_AIR_PORT_CODE_TO_COORDINATE));
    }

    @Test
    public void convert_to_map_of_primitive_to_list_of_primitive() {
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
    public void convert_to_map_of_primitive_to_map_of_primitive_to_object() {
        DataTable table = parse("",
                "  |   | 1 | 2 | 3 |",
                "  | A | ♘ |   | ♝ |",
                "  | B |   |   |   |",
                "  | C |   | ♝ |   |"
        );

        registry.defineDataTableType(new DataTableType("piece", Piece.class, PIECE_TABLE_CELL_TRANSFORMER));

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
    public void convert_to_map_of_primitive_to_map_of_primitive_to_primitive() {
        DataTable table = parse("",
                "|      | latt      | long        |",
                "| KMSY | 29.993333 | -90.258056  |",
                "| KSFO | 37.618889 | -122.375    |",
                "| KSEA | 47.448889 | -122.309444 |",
                "| KJFK | 40.639722 | -73.778889  |"
        );


        Map<String, Map<String, Double>> expected = new HashMap<String, Map<String, Double>>() {{
            put("KMSY", new HashMap<String, Double>() {{
                put("latt", 29.993333);
                put("long", -90.258056);
            }});
            put("KSFO", new HashMap<String, Double>() {{
                put("latt", 37.618889);
                put("long", -122.375);
            }});
            put("KSEA", new HashMap<String, Double>() {{
                put("latt", 47.448889);
                put("long", -122.309444);
            }});
            put("KJFK", new HashMap<String, Double>() {{
                put("latt", 40.639722);
                put("long", -73.778889);
            }});
        }};

        assertEquals(expected, converter.convert(table, MAP_OF_STRING_TO_MAP_OF_STRING_DOUBLE));
    }

    @Test
    public void convert_to_map_of_primitive_to_object__blank_first_cell() {
        DataTable table = parse("",
                "|      | latt      | long        |",
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

        registry.defineDataTableType(new DataTableType("coordinate", Coordinate.class, COORDINATE_TABLE_ENTRY_TRANSFORMER));

        assertEquals(expected, converter.toMap(table, String.class, Coordinate.class));
        assertEquals(expected, converter.convert(table, MAP_OF_STRING_TO_COORDINATE));
    }

    @Test
    public void convert_to_map_of_primitive_to_primitive() {
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
    public void convert_to_map_of_string_to_map() {
        DataTable table = parse("",
                "|      | latt      | long        |",
                "| KMSY | 29.993333 | -90.258056  |",
                "| KSFO | 37.618889 | -122.375    |",
                "| KSEA | 47.448889 | -122.309444 |",
                "| KJFK | 40.639722 | -73.778889  |"
        );

        Map<String, Map<String, String>> expected = new HashMap<String, Map<String, String>>() {{
            put("KMSY", new HashMap<String, String>() {{
                put("latt", "29.993333");
                put("long", "-90.258056");
            }});
            put("KSFO", new HashMap<String, String>() {{
                put("latt", "37.618889");
                put("long", "-122.375");
            }});
            put("KSEA", new HashMap<String, String>() {{
                put("latt", "47.448889");
                put("long", "-122.309444");
            }});
            put("KJFK", new HashMap<String, String>() {{
                put("latt", "40.639722");
                put("long", "-73.778889");
            }});
        }};


        assertEquals(expected, converter.convert(table, MAP_OF_STRING_TO_MAP));
    }

    @Test
    public void convert_to_map_of_string_to_string__throws_exception__blank_space() {
        expectedException.expectMessage(format("" +
                        "Can't convert DataTable to Map<%s,%s>. " +
                        "There are more values then keys. " +
                        "The first header cell was left blank. " +
                        "You can add a value there",
                String.class, LIST_OF_DOUBLE));

        DataTable table = parse("",
                "|           | -90.258056  |",
                "| 37.618889 | -122.375    |",
                "| 47.448889 | -122.309444 |",
                "| 40.639722 | -73.778889  |"
        );

        converter.convert(table, MAP_OF_STRING_TO_LIST_OF_DOUBLE);
    }

    @Test
    public void convert_to_map_of_string_to_string__throws_exception__more_then_one_value_per_key() {
        expectedException.expectMessage(format("" +
                        "Can't convert DataTable to Map<%s,%s>. " +
                        "There is more then one value per key. " +
                        "Did you mean to transform to Map<%s,List<%s>> instead?",
                String.class, String.class, String.class, String.class));

        DataTable table = parse("",
                "| KMSY | 29.993333 | -90.258056  |",
                "| KSFO | 37.618889 | -122.375    |",
                "| KSEA | 47.448889 | -122.309444 |",
                "| KJFK | 40.639722 | -73.778889  |"
        );

        converter.convert(table, MAP_OF_STRING_TO_STRING);
    }

    @Test
    public void convert_to_maps_of_primitive() {
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
    public void convert_to_object() {
        DataTable table = parse("",
                "  |   | 1 | 2 | 3 |",
                "  | A | ♘ |   | ♝ |",
                "  | B |   |   |   |",
                "  | C |   | ♝ |   |"
        );

        registry.defineDataTableType(new DataTableType("chessboard", ChessBoard.class, CHESS_BOARD_TABLE_TRANSFORMER));
        ChessBoard expected = new ChessBoard(asList("♘", "♝", "♝"));

        assertEquals(expected, converter.convert(table, ChessBoard.class));
    }

    @Test
    public void convert_to_object__more_then_one_item__throws_exception() {
        expectedException.expectMessage(format("" +
                        "Can't convert DataTable to %s. " +
                        "The table contained more then one item: [♘, ♝]",
                Piece.class));

        DataTable table = parse("",
                "| ♘ | ♝ |"
        );

        registry.defineDataTableType(new DataTableType("piece", Piece.class, PIECE_TABLE_CELL_TRANSFORMER));
        converter.convert(table, Piece.class);
    }

    @Test
    public void convert_to_primitive__empty_table_to_null() {
        DataTable table = emptyDataTable();
        assertNull(converter.convert(table, Integer.class));
    }

    @Test
    public void convert_to_primitive__single_cell() {
        DataTable table = parse("| 3 |");
        assertEquals(Integer.valueOf(3), converter.convert(table, Integer.class));
    }

    @Test
    public void convert_to_single_object__single_cell() {
        DataTable table = parse("| ♝ |");
        registry.defineDataTableType(new DataTableType("piece", Piece.class, PIECE_TABLE_CELL_TRANSFORMER));

        assertEquals(Piece.BLACK_BISHOP, converter.convert(table, Piece.class));
    }

    @Test
    public void convert_to_table__table_transformer_takes_precedence_over_identity_transform() {
        DataTable table = parse("",
                "  |   | 1 | 2 | 3 |",
                "  | A | ♘ |   | ♝ |",
                "  | B |   |   |   |",
                "  | C |   | ♝ |   |"
        );

        final DataTable expected = emptyDataTable();
        registry.defineDataTableType(new DataTableType("table", DataTable.class, new TableTransformer<DataTable>() {
            @Override
            public DataTable transform(DataTable raw) {
                return expected;
            }
        }));

        assertSame(expected, converter.convert(table, DataTable.class));
    }

    @Test
    public void convert_to_table__transposed() {
        DataTable table = parse("",
                "  |   | 1 | 2 | 3 |",
                "  | A | ♘ |   | ♝ |",
                "  | B |   |   |   |",
                "  | C |   | ♝ |   |"
        );

        assertEquals(table.transpose(), converter.convert(table, DataTable.class, true));
    }

    @Test
    public void convert_to_unknown_type__throws_exception() {
        expectedException.expectMessage(format("Can't convert DataTable to %s", Piece.class));

        DataTable table = parse("",
                "| ♘ |"
        );
        converter.convert(table, Piece.class);
    }

    @Test
    public void to_list__single_column__throws_exception__register_transformer() {
        expectedException.expectMessage(format("" +
                        "Can't convert DataTable to List<%s>. " +
                        "Please register a DataTableType with a " +
                        "TableEntryTransformer, TableRowTransformer or TableCellTransformer for %s",
                Piece.class, Piece.class));

        DataTable table = parse("",
                "| ♘ |",
                "| ♝ |"
        );

        converter.toList(table, Piece.class);
    }

    @Test
    public void to_list_of_unknown_type__throws_exception() {
        expectedException.expectMessage(format("" +
                        "Can't convert DataTable to List<%s>. " +
                        "Please register a DataTableType with a TableEntryTransformer or TableRowTransformer for %s",
                Author.class, Author.class));

        final DataTable table = parse("",
                " | firstName   | lastName | birthDate  |",
                " | Annie M. G. | Schmidt  | 1911-03-20 |",
                " | Roald       | Dahl     | 1916-09-13 |",
                " | Astrid      | Lindgren | 1907-11-14 |"
        );

        converter.toList(table, Author.class);
    }

    @Test
    public void to_lists_of_unknown_type__throws_exception() {
        expectedException.expectMessage(format("" +
                        "Can't convert DataTable to List<List<%s>>. " +
                        "Please register a DataTableType with a TableCellTransformer for %s",
                Author.class, Author.class));

        final DataTable table = parse("",
                " | firstName   | lastName | birthDate  |",
                " | Annie M. G. | Schmidt  | 1911-03-20 |",
                " | Roald       | Dahl     | 1916-09-13 |",
                " | Astrid      | Lindgren | 1907-11-14 |"
        );

        converter.toLists(table, Author.class);
    }

    @Test
    public void to_map__duplicate_keys__throws_exception() {
        expectedException.expectMessage(format("" +
                "Can't convert DataTable to Map<%s,%s>. " +
                "Encountered duplicate key", AirPortCode.class, Coordinate.class));

        DataTable table = parse("",
                "|      | latt      | long        |",
                "| KMSY | 29.993333 | -90.258056  |",
                "| KSEA | 47.448889 | -122.309444 |",
                "| KSFO | 37.618889 | -122.375    |",
                "| KSEA | 47.448889 | -122.309444 |",
                "| KJFK | 40.639722 | -73.778889  |"
        );

        registry.defineDataTableType(new DataTableType("airport", AirPortCode.class, AIR_PORT_CODE_TABLE_CELL_TRANSFORMER));
        registry.defineDataTableType(new DataTableType("coordinate", Coordinate.class, COORDINATE_TABLE_ENTRY_TRANSFORMER));

        converter.toMap(table, AirPortCode.class, Coordinate.class);
    }

    @Test
    public void to_map_of_entry_to_primitive__blank_first_cell__throws_exception__key_type_was_entry() {
        expectedException.expectMessage(format("" +
                        "Can't convert DataTable to Map<%s,%s>. " +
                        "The first cell was either blank or you have registered a TableEntryTransformer for the key type.",
                AirPortCode.class, String.class));


        DataTable table = parse("",
                "| code |                                                   |",
                "| KMSY | Louis Armstrong New Orleans International Airport |",
                "| KSFO | San Francisco International Airport               |",
                "| KSEA | Seattle–Tacoma International Airport              |",
                "| KJFK | John F. Kennedy International Airport             |"
        );

        registry.defineDataTableType(new DataTableType("airport", AirPortCode.class, AIR_PORT_CODE_TABLE_ENTRY_TRANSFORMER));

        converter.toMap(table, AirPortCode.class, String.class);
    }

    @Test
    public void to_map_of_entry_to_row__throws_exception__more_values_then_keys() {
        expectedException.expectMessage(format("" +
                        "Can't convert DataTable to Map<%s,%s>. " +
                        "There are more values then keys. " +
                        "Did you use a TableEntryTransformer for the key " +
                        "while using a TableRow or TableCellTransformer for the value?",
                AirPortCode.class, Coordinate.class));

        final DataTable table = parse("",
                "| code | 29.993333 | -90.258056  |",
                "| KSFO | 37.618889 | -122.375    |",
                "| KSEA | 47.448889 | -122.309444 |",
                "| KJFK | 40.639722 | -73.778889  |"
        );

        registry.defineDataTableType(new DataTableType("airport", AirPortCode.class, AIR_PORT_CODE_TABLE_ENTRY_TRANSFORMER));
        registry.defineDataTableType(new DataTableType("coordinate", Coordinate.class, COORDINATE_TABLE_ROW_TRANSFORMER));

        converter.toMap(table, AirPortCode.class, Coordinate.class);
    }

    @Test
    public void to_map_of_object_to_unknown_type__throws_exception__register_table_entry_transformer() {
        expectedException.expectMessage(format("" +
                        "Can't convert DataTable to Map<%s,%s>. " +
                        "The first cell was either blank or you have registered a TableEntryTransformer for the key type.",
                AirPortCode.class, Coordinate.class));

        DataTable table = parse("",
                "| code | latt      | long        |",
                "| KMSY | 29.993333 | -90.258056  |",
                "| KSFO | 37.618889 | -122.375    |",
                "| KSEA | 47.448889 | -122.309444 |",
                "| KJFK | 40.639722 | -73.778889  |"
        );

        registry.defineDataTableType(new DataTableType("airport", AirPortCode.class, AIR_PORT_CODE_TABLE_ENTRY_TRANSFORMER));
        converter.toMap(table, AirPortCode.class, Coordinate.class);
    }

    @Test
    public void to_map_of_primitive_to_entry__throws_exception__more_keys_then_values() {
        expectedException.expectMessage(format("" +
                "Can't convert DataTable to Map<%s,%s>. " +
                "There are more keys then values. " +
                "Did you use a TableEntryTransformer for the value " +
                "while using a TableRow or TableCellTransformer for the keys?", String.class, Coordinate.class));

        DataTable table = parse("",
                "| code | latt      | long        |",
                "| KMSY | 29.993333 | -90.258056  |",
                "| KSFO | 37.618889 | -122.375    |",
                "| KSEA | 47.448889 | -122.309444 |",
                "| KJFK | 40.639722 | -73.778889  |"
        );

        registry.defineDataTableType(new DataTableType("coordinate", Coordinate.class, COORDINATE_TABLE_ENTRY_TRANSFORMER));

        converter.toMap(table, String.class, Coordinate.class);
    }

    @Test
    public void to_map_of_primitive_to_primitive__blank_first_cell__throws_exception__first_cell_was_blank() {
        expectedException.expectMessage(format("" +
                        "Can't convert DataTable to Map<%s,%s>. " +
                        "The first cell was either blank or you have registered a TableEntryTransformer for the key type.",
                String.class, String.class));

        final DataTable table = parse("",
                " |                     | birthDate  |",
                " | Annie M. G. Schmidt | 1911-03-20 |",
                " | Roald Dahl          | 1916-09-13 |",
                " | Astrid Lindgren     | 1907-11-14 |"
        );

        converter.toMap(table, String.class, String.class);
    }

    @Test
    public void to_map_of_unknown_key_type__throws_exception() {
        expectedException.expectMessage(format("" +
                        "Can't convert DataTable to Map<%s,%s>. " +
                        "Please register a DataTableType with a TableEntryTransformer or TableCellTransformer for %s",
                Author.class, String.class, Author.class));

        final DataTable table = parse("",
                " | name                | birthDate  |",
                " | Annie M. G. Schmidt | 1911-03-20 |",
                " | Roald Dahl          | 1916-09-13 |",
                " | Astrid Lindgren     | 1907-11-14 |"
        );

        converter.toMap(table, Author.class, String.class);
    }

    @Test
    public void to_map_of_unknown_type_to_object__throws_exception__register_table_cell_transformer() {
        expectedException.expectMessage(format("" +
                        "Can't convert DataTable to Map<%s,%s>. " +
                        "Please register a DataTableType with a TableCellTransformer for %s",
                AirPortCode.class, Coordinate.class, AirPortCode.class));


        DataTable table = parse("",
                "|      | latt      | long        |",
                "| KMSY | 29.993333 | -90.258056  |",
                "| KSFO | 37.618889 | -122.375    |",
                "| KSEA | 47.448889 | -122.309444 |",
                "| KJFK | 40.639722 | -73.778889  |"
        );

        registry.defineDataTableType(new DataTableType("coordinate", Coordinate.class, COORDINATE_TABLE_ENTRY_TRANSFORMER));
        converter.toMap(table, AirPortCode.class, Coordinate.class);
    }

    @Test
    public void to_map_of_unknown_value_type__throws_exception() {
        expectedException.expectMessage(format("" +
                        "Can't convert DataTable to Map<%s,%s>. " +
                        "Please register a DataTableType with a TableEntryTransformer or TableCellTransformer for %s",
                String.class, Date.class, Date.class));

        final DataTable table = parse("",
                " | Annie M. G. Schmidt | 1911-03-20 |",
                " | Roald Dahl          | 1916-09-13 |",
                " | Astrid Lindgren     | 1907-11-14 |"
        );


        converter.toMap(table, String.class, Date.class);
    }

    @Test
    public void to_maps_cant_convert_table_with_duplicate_keys() {
        expectedException.expectMessage(format("" +
                        "Can't convert DataTable to Map<%s,%s>. " +
                        "Encountered duplicate key 1 with values 4 and 5",
                Integer.class, Integer.class));

        final DataTable table = parse("",
                "| 1 | 1 | 1 |",
                "| 4 | 5 | 6 |",
                "| 7 | 8 | 9 |"
        );

        converter.toMaps(table, Integer.class, Integer.class);
    }

    @Test
    public void to_maps_of_unknown_key_type__throws_exception__register_table_cell_transformer() {
        expectedException.expectMessage(format(
                "Can't convert DataTable to List<Map<%s,%s>>. " +
                        "Please register a DataTableType with a TableCellTransformer for %s",
                String.class, Coordinate.class, Coordinate.class));

        DataTable table = parse("",
                "| latt      | long        |",
                "| 29.993333 | -90.258056  |",
                "| 37.618889 | -122.375    |",
                "| 47.448889 | -122.309444 |",
                "| 40.639722 | -73.778889  |"
        );

        converter.toMaps(table, String.class, Coordinate.class);
    }

    @Test
    public void to_maps_of_unknown_value_type__throws_exception__register_table_cell_transformer() {
        expectedException.expectMessage(format(
                "Can't convert DataTable to List<Map<%s,%s>>. " +
                        "Please register a DataTableType with a TableCellTransformer for %s",
                Piece.class, String.class, Piece.class));

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

        converter.toMaps(table, Piece.class, String.class);
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

        static Piece fromString(String glyp) {
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

    private static final class AirPortCode {
        private final String code;

        private AirPortCode(String code) {
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
    }

    private static final class Author {

        private final String firstName;
        private final String lastName;
        private final String birthDate;

        private Author(String firstName, String lastName, String birthDate) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.birthDate = birthDate;
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

    private static final class Coordinate {

        private final double longitude;
        private final double latitude;

        private Coordinate(double longitude, double latitude) {
            this.longitude = longitude;
            this.latitude = latitude;
        }

        @Override
        public boolean equals(Object o) {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;

            Coordinate that = (Coordinate) o;

            if (Double.compare(that.longitude, longitude) != 0) return false;
            return Double.compare(that.latitude, latitude) == 0;
        }

        @Override
        public int hashCode() {
            int result;
            long temp;
            temp = Double.doubleToLongBits(longitude);
            result = (int) (temp ^ (temp >>> 32));
            temp = Double.doubleToLongBits(latitude);
            result = 31 * result + (int) (temp ^ (temp >>> 32));
            return result;
        }

        @Override
        public String toString() {
            return "Coordinate{" +
                    "longitude=" + longitude +
                    ", latitude=" + latitude +
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
