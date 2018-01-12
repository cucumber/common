package io.cucumber.datatable;

import java.io.IOException;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.lang.reflect.TypeVariable;
import java.util.AbstractList;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.RandomAccess;

import static java.util.Collections.emptyList;
import static java.util.Collections.unmodifiableList;
import static java.util.Collections.unmodifiableMap;

/**
 * A DataTable is an m-by-n table that contains string values. For example:
 * <p>
 * <pre>
 * |     | firstName   | lastName | birthDate  |
 * | 4a1 | Annie M. G. | Schmidt  | 1911-03-20 |
 * | c92 | Roald       | Dahl     | 1916-09-13 |
 * </pre>
 * <p>
 * A table can be converted into an objects of an arbitrary type by a {@link TableConverter}.
 * <p>
 * A DataTable is immutable.
 */
public final class DataTable {

    private final List<List<String>> raw;
    private final TableConverter tableConverter;

    /**
     * Creates an empty DataTable.
     *
     * @return an empty DataTable
     */
    public static DataTable emptyDataTable() {
        return new DataTable(Collections.<List<String>>emptyList(), new NoConverterDefined());
    }

    /**
     * Creates a new DataTable.
     *
     * @param raw the underlying table
     * @return an new data table containing the raw values
     * @throws IllegalArgumentException when the table is not balanced
     */
    public static DataTable create(List<List<String>> raw) {
        return create(raw, new NoConverterDefined());
    }

    /**
     * Creates a new DataTable.
     *
     * @param raw            the underlying table
     * @param tableConverter to transform the table
     * @return an new data table containing the raw values
     * @throws IllegalArgumentException when the table is not balanced
     */
    public static DataTable create(List<List<String>> raw, TableConverter tableConverter) {
        return new DataTable(copy(requireBalancedTable(raw)), tableConverter);
    }

    /**
     * Creates a new DataTable.
     * <p>
     * To improve performance this constructor assumes the provided raw table
     * is balanced, immutable and a safe copy.
     *
     * @param raw            the underlying table
     * @param tableConverter to transform the table
     */
    private DataTable(List<List<String>> raw, TableConverter tableConverter) {
        if (raw == null) throw new CucumberDataTableException("cells can not be null");
        if (tableConverter == null) throw new CucumberDataTableException("tableConverter can not be null");
        this.raw = raw;
        this.tableConverter = tableConverter;
    }

    private static List<List<String>> copy(List<List<String>> balanced) {
        List<List<String>> rawCopy = new ArrayList<List<String>>(balanced.size());
        for (List<String> row : balanced) {
            // A table without columns is an empty table and has no rows.
            if (row.isEmpty()) {
                return emptyList();
            }
            List<String> rowCopy = new ArrayList<String>(row.size());
            rowCopy.addAll(row);
            rawCopy.add(unmodifiableList(rowCopy));
        }
        return unmodifiableList(rawCopy);
    }

    private static List<List<String>> requireBalancedTable(List<List<String>> table) {
        int columns = table.isEmpty() ? 0 : table.get(0).size();
        for (List<String> row : table) {
            if (columns != row.size()) {
                throw new IllegalArgumentException(String.format("Table is unbalanced: expected %s column(s) but found %s.", columns, row.size()));
            }
        }
        return table;
    }

    /**
     * Converts the table to a list of maps of strings. The top row is used as keys in the maps,
     * and the rows below are used as values.
     *
     * @return a list of maps.
     */
    public List<Map<String, String>> asMaps() {
        if (raw.isEmpty()) return emptyList();

        List<String> headers = raw.get(0);
        List<Map<String, String>> headersAndRows = new ArrayList<Map<String, String>>();

        for (int i = 1; i < raw.size(); i++) {
            List<String> row = raw.get(i);
            LinkedHashMap<String, String> headersAndRow = new LinkedHashMap<String, String>();
            for (int j = 0; j < headers.size(); j++) {
                headersAndRow.put(headers.get(j), row.get(j));
            }
            headersAndRows.add(unmodifiableMap(headersAndRow));
        }

        return unmodifiableList(headersAndRows);
    }


    /**
     * Converts the table to a list of maps. The top row is used as keys in the maps,
     * and the rows below are used as values.
     *
     * @param <K>       key type
     * @param <V>       value type
     * @param keyType   key type
     * @param valueType value type
     * @return a list of maps.
     */
    public <K, V> List<Map<K, V>> asMaps(Type keyType, Type valueType) {
        return tableConverter.toMaps(this, keyType, valueType);
    }

    /**
     * Converts the table to a single map. The left column is used as keys, the right column as values.
     *
     * @param <K>       key type
     * @param <V>       value type
     * @param keyType   key type
     * @param valueType value type
     * @return a Map.
     */
    public <K, V> Map<K, V> asMap(Type keyType, Type valueType) {
        return tableConverter.toMap(this, keyType, valueType);
    }


    public List<String> asList() {
        return new ListView();
    }

    /**
     * Converts the table to a list of list of string.
     *
     * @return a List of List of objects
     */
    public List<List<String>> asLists() {
        return cells();
    }

    /**
     * Converts the table to a List of List of scalar.
     *
     * @param itemType the type of the list items
     * @param <T>      the type of the list items
     * @return a List of List of objects
     */
    public <T> List<List<T>> asLists(Type itemType) {
        return tableConverter.toLists(this, itemType);
    }


    /**
     * Converts the table to a List.
     * <p>
     * If {@code itemType} is a scalar type the table is flattened.
     * <p>
     * Otherwise, the top row is used to name the fields/properties and the remaining
     * rows are turned into list items.
     *
     * @param itemType the type of the list items
     * @param <T>      the type of the list items
     * @return a List of objects
     */
    public <T> List<T> asList(Type itemType) {
        return tableConverter.toList(this, itemType);
    }


    public List<List<String>> cells() {
        return raw;
    }

    public DataTable subTable(int fromRow, int fromColumn) {
        return subTable(fromRow, fromColumn, height(), width());
    }
    public DataTable subTable(int fromRow, int fromColumn, int toRow, int toColumn) {
        return new DataTable(new RawDataTableView(fromRow, fromColumn, toColumn, toRow), tableConverter);
    }

    public String cell(int row, int column) {
        rangeCheckRow(row, height());
        rangeCheckColumn(column, width());
        return raw.get(row).get(column);
    }

    public List<String> row(int row) {
        rangeCheckRow(row, height());
        return raw.get(row);
    }

    public DataTable rows(int fromRow) {
        return rows(fromRow, height());
    }

    public DataTable rows(int fromRow, int toRow) {
        return subTable(fromRow, 0, toRow, width());
    }

    public List<String> column(final int column) {
        return new ColumnView(column);
    }

    public DataTable columns(final int fromColumn) {
        return columns(fromColumn, width());
    }

    public DataTable columns(final int fromColumn, final int toColumn) {
        return subTable(0, fromColumn, height(), toColumn);
    }

    @Override
    public String toString() {
        StringBuilder result = new StringBuilder();
        print(result);
        return result.toString();
    }

    public void print(StringBuilder appendable) {
        TablePrinter printer = new TablePrinter();
        printer.printTable(raw, appendable);
    }

    public void print(Appendable appendable) throws IOException {
        TablePrinter printer = new TablePrinter();
        printer.printTable(raw, appendable);
    }

    public DataTable transpose() {
        if (raw instanceof TransposedRawDataTableView) {
            TransposedRawDataTableView tranposed = (TransposedRawDataTableView) this.raw;
            return tranposed.dataTable();
        }
        return new DataTable(new TransposedRawDataTableView(), tableConverter);
    }

    public <T> T convert(Type type, boolean transposed) {
        return tableConverter.convert(this, type, transposed);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DataTable dataTable = (DataTable) o;

        return raw.equals(dataTable.raw);
    }

    public boolean isEmpty() {
        return raw.isEmpty();
    }

    public int width() {
        return raw.isEmpty() ? 0 : raw.get(0).size();
    }

    public int height() {
        return raw.size();
    }


    @Override
    public int hashCode() {
        return raw.hashCode();
    }

    static abstract class AbstractTableConverter implements TableConverter {

        AbstractTableConverter() {

        }

        static Type listItemType(Type type) {
            return typeArg(type, List.class, 0);
        }

        static Type mapKeyType(Type type) {
            return typeArg(type, Map.class, 0);
        }

        static Type mapValueType(Type type) {
            return typeArg(type, Map.class, 1);
        }

        static Type typeArg(Type type, Class<?> wantedRawType, int index) {
            if (type instanceof ParameterizedType) {
                ParameterizedType parameterizedType = (ParameterizedType) type;
                Type rawType = parameterizedType.getRawType();
                if (rawType instanceof Class && wantedRawType.isAssignableFrom((Class) rawType)) {
                    Type result = parameterizedType.getActualTypeArguments()[index];
                    if (result instanceof TypeVariable) {
                        throw new CucumberDataTableException("Generic types must be explicit");
                    }
                    return result;
                } else {
                    return null;
                }
            }

            return null;
        }
    }

    static final class NoConverterDefined implements TableConverter {

        NoConverterDefined() {

        }

        @Override
        public <T> T convert(DataTable dataTable, Type type) {
            return convert(dataTable, type, false);
        }

        @Override
        public <T> T convert(DataTable dataTable, Type type, boolean transposed) {
            throw new CucumberDataTableException(String.format("Can't convert DataTable to %s. DataTable was created without a converter", type));
        }

        @Override
        public <T> List<T> toList(DataTable dataTable, Type itemType) {
            throw new CucumberDataTableException(String.format("Can't convert DataTable to List<%s>. DataTable was created without a converter", itemType));
        }

        @Override
        public <T> List<List<T>> toLists(DataTable dataTable, Type itemType) {
            throw new CucumberDataTableException(String.format("Can't convert DataTable to List<List<%s>>. DataTable was created without a converter", itemType));
        }

        @Override
        public <K, V> Map<K, V> toMap(DataTable dataTable, Type keyType, Type valueType) {
            throw new CucumberDataTableException(String.format("Can't convert DataTable to Map<%s,%s>. DataTable was created without a converter", keyType, valueType));
        }

        @Override
        public <K, V> List<Map<K, V>> toMaps(DataTable dataTable, Type keyType, Type valueType) {
            throw new CucumberDataTableException(String.format("Can't convert DataTable to List<Map<%s,%s>>. DataTable was created without a converter", keyType, valueType));
        }

    }

    /**
     * Converts a {@link DataTable} to another type.
     * <p>
     * There are three ways in which a table might be mapped to a certain type. The table converter considers the
     * possible conversions in this order:
     * <ol>
     * <li>
     * Using the whole table to create a single instance.
     * </li>
     * <li>
     * Using individual rows to create a collection of instances. The first row may be used as header.
     * </li>
     * <li>
     * Using individual cells to a create a collection of instances.
     * </li>
     * </ol>
     */
    public interface TableConverter {

        /**
         * Converts a {@link DataTable} to another type.
         * <p>
         * Delegates to <code>toList</code>, <code>toLists</code>, <code>toMap</code> and <code>toMaps</code>
         * for <code>List&lt;T&gt;</code>, <code>List&lt;List&lt;T&gt;&gt;</code>, <code>Map&lt;K,V&gt;</code> and
         * <code>List&lt;Map&lt;K,V&gt;&gt;</code> respectively.
         *
         * @param dataTable  the table to convert
         * @param type       the type to convert to
         * @return an object of type
         */
        <T> T convert(DataTable dataTable, Type type);


        /**
         * Converts a {@link DataTable} to another type.
         * <p>
         * Delegates to <code>toList</code>, <code>toLists</code>, <code>toMap</code> and <code>toMaps</code>
         * for <code>List&lt;T&gt;</code>, <code>List&lt;List&lt;T&gt;&gt;</code>, <code>Map&lt;K,V&gt;</code> and
         * <code>List&lt;Map&lt;K,V&gt;&gt;</code> respectively.
         *
         * @param dataTable  the table to convert
         * @param type       the type to convert to
         * @param transposed whether the table should be transposed first.
         * @return an object of type
         */
        <T> T convert(DataTable dataTable, Type type, boolean transposed);

        /**
         * Converts a {@link DataTable} to a list.
         * <p>
         * A table converter may either map each row or each individual cell to a list element.
         * <p>
         * For example:
         * <p>
         * <pre>
         * | Annie M. G. Schmidt | 1911-03-20 |
         * | Roald Dahl          | 1916-09-13 |
         *
         * convert.toList(table, String.class);
         * </pre>
         * can become
         * <pre>
         *  [ "Annie M. G. Schmidt", "1911-03-20", "Roald Dahl", "1916-09-13" ]
         * </pre>
         * <p>
         * While:
         * <pre>
         *   convert.toList(table, Author.class);
         * </pre>
         * <p>
         * can become:
         * <p>
         * <pre>
         * [
         *   Author[ name: Annie M. G. Schmidt, birthDate: 1911-03-20 ],
         *   Author[ name: Roald Dahl,          birthDate: 1916-09-13 ]
         * ]
         * </pre>
         * <p>
         * Likewise:
         * <p>
         * <pre>
         *  | firstName   | lastName | birthDate  |
         *  | Annie M. G. | Schmidt  | 1911-03-20 |
         *  | Roald       | Dahl     | 1916-09-13 |
         *
         * convert.toList(table, Authors.class);
         * </pre>
         * can become:
         * <pre>
         *  [
         *   Author[ firstName: Annie M. G., lastName: Schmidt,  birthDate: 1911-03-20 ],
         *   Author[ firstName: Roald,       lastName: Dahl,     birthDate: 1916-09-13 ]
         *  ]
         * </pre>
         *
         * @param dataTable the table to convert
         * @param itemType  the  list item type to convert to
         * @return a list of objects of <code>itemType</code>
         */
        <T> List<T> toList(DataTable dataTable, Type itemType);

        /**
         * Converts a {@link DataTable} to a list of lists.
         * <p>
         * Each row maps to a list, each table cell a list entry.
         * <p>
         * For example:
         * <p>
         * <pre>
         * | Annie M. G. Schmidt | 1911-03-20 |
         * | Roald Dahl          | 1916-09-13 |
         *
         * convert.toLists(table, String.class);
         * </pre>
         * can become
         * <pre>
         *  [
         *    [ "Annie M. G. Schmidt", "1911-03-20" ],
         *    [ "Roald Dahl",          "1916-09-13" ]
         *  ]
         * </pre>
         * <p>
         *
         * @param dataTable the table to convert
         * @param itemType  the  list item type to convert to
         * @return a list of lists of objects of <code>itemType</code>
         */
        <T> List<List<T>> toLists(DataTable dataTable, Type itemType);

        /**
         * Converts a {@link DataTable} to a map.
         * <p>
         * The left column of the table is used to instantiate the key values. The other columns are used to instantiate
         * the values.
         * <p>
         * For example:
         * <p>
         * <pre>
         * | 4a1 | Annie M. G. Schmidt | 1911-03-20 |
         * | c92 | Roald Dahl          | 1916-09-13 |
         *
         * convert.toMap(table, Id.class, Authors.class);
         * </pre>
         * can become:
         * <pre>
         *  {
         *   Id[ 4a1 ]: Author[ name: Annie M. G. Schmidt, birthDate: 1911-03-20 ],
         *   Id[ c92 ]: Author[ name: Roald Dahl,          birthDate: 1916-09-13 ]
         *  }
         * </pre>
         * <p>
         * The header cells may be used to map values into the types. When doing so the first header cell may be
         * left blank.
         * <p>
         * For example:
         * <p>
         * <pre>
         * |     | firstName   | lastName | birthDate  |
         * | 4a1 | Annie M. G. | Schmidt  | 1911-03-20 |
         * | c92 | Roald       | Dahl     | 1916-09-13 |
         *
         * convert.toMap(table, Id.class, Authors.class);
         * </pre>
         * can becomes:
         * <pre>
         *  {
         *   Id[ 4a1 ]: Author[ firstName: Annie M. G., lastName: Schmidt, birthDate: 1911-03-20 ],
         *   Id[ c92 ]: Author[ firstName: Roald,       lastName: Dahl,    birthDate: 1916-09-13 ]
         *  }
         * </pre>
         *
         * @param dataTable the table to convert
         * @param keyType   the  key type to convert to
         * @param valueType the  value to convert to
         * @return a map of <code>keyType</code> <code>valueType</code>
         */

        <K, V> Map<K, V> toMap(DataTable dataTable, Type keyType, Type valueType);

        /**
         * Converts a {@link DataTable} to a list of maps.
         * <p>
         * Each map represents a row in the table. The map keys are the column headers.
         * <p>
         * For example:
         * <p>
         * <pre>
         * | firstName   | lastName | birthDate  |
         * | Annie M. G. | Schmidt  | 1911-03-20 |
         * | Roald       | Dahl     | 1916-09-13 |
         * </pre>
         * can become:
         * <pre>
         *  [
         *   {firstName: Annie M. G., lastName: Schmidt, birthDate: 1911-03-20 }
         *   {firstName: Roald,       lastName: Dahl,    birthDate: 1916-09-13 }
         *  ]
         * </pre>
         *
         * @param dataTable the table to convert
         * @param keyType   the  key type to convert to
         * @param valueType the  value to convert to
         * @return a list of maps of <code>keyType</code> <code>valueType</code>
         */
        <K, V> List<Map<K, V>> toMaps(DataTable dataTable, Type keyType, Type valueType);

    }

    private final class RawDataTableView extends AbstractList<List<String>> implements RandomAccess {
        private final int fromRow;
        private final int fromColumn;
        private final int toColumn;
        private final int toRow;

        RawDataTableView(int fromRow, int fromColumn, int toColumn, int toRow) {
            if (fromRow < 0)
                throw new IndexOutOfBoundsException("fromRow: " + fromRow);
            if (fromColumn < 0)
                throw new IndexOutOfBoundsException("fromColumn: " + fromColumn);
            if (toRow > height())
                throw new IndexOutOfBoundsException("toRow: " + toRow + ", Height: " + height());
            if (toColumn > width())
                throw new IndexOutOfBoundsException("toColumn: " + toColumn + ", Width: " + width());
            if (fromRow > toRow)
                throw new IllegalArgumentException("fromRow(" + fromRow + ") > toRow(" + toRow + ")");
            if (fromColumn > toColumn)
                throw new IllegalArgumentException("fromColumn(" + fromColumn + ") > toColumn(" + toColumn + ")");

            this.fromRow = fromRow;
            this.fromColumn = fromColumn;
            this.toColumn = toColumn;
            this.toRow = toRow;
        }

        @Override
        public List<String> get(final int row) {
            rangeCheckRow(row, size());
            return new AbstractList<String>() {
                @Override
                public String get(final int column) {
                    rangeCheckColumn(column, size());
                    return raw.get(fromRow + row).get(fromColumn + column);
                }

                @Override
                public int size() {
                    return toColumn - fromColumn;
                }
            };
        }

        @Override
        public int size() {
            // If there are no columns this is an empty table. An empty table has no rows.
            return fromColumn == toColumn ? 0 : toRow - fromRow;
        }
    }

    private final class ListView extends AbstractList<String> {
        int width = width();
        int height = height();

        @Override
        public String get(int index) {
            rangeCheck(index, size());
            return raw.get(index % width).get(index / width);
        }

        @Override
        public int size() {
            return height * width;
        }
    }

    private final class ColumnView extends AbstractList<String> implements RandomAccess {
        private final int column;

        ColumnView(int column) {
            rangeCheckColumn(column, width());
            this.column = column;
        }

        @Override
        public String get(final int row) {
            rangeCheckRow(row, size());
            return raw.get(row).get(column);
        }

        @Override
        public int size() {
            return height();
        }
    }

    private final class TransposedRawDataTableView extends AbstractList<List<String>> implements RandomAccess {

        @Override
        public List<String> get(final int row) {
            rangeCheckRow(row, size());
            return new AbstractList<String>() {
                @Override
                public String get(final int column) {
                    rangeCheckColumn(column, size());
                    return raw.get(column).get(row);
                }

                @Override
                public int size() {
                    return height();
                }
            };
        }

        @Override
        public int size() {
            return width();
        }

        DataTable dataTable() {
            return DataTable.this;
        }
    }


    private static void rangeCheck(int index, int size) {
        if (index < 0 || index >= size)
            throw new IndexOutOfBoundsException("index: " + index + ", Size: " + size);
    }


    private static void rangeCheckRow(int row, int height) {
        if (row < 0 || row >= height)
            throw new IndexOutOfBoundsException("row: " + row + ", Height: " + height);
    }

    private static void rangeCheckColumn(int column, int width) {
        if (column < 0 || column >= width)
            throw new IndexOutOfBoundsException("column: " + column + ", Width: " + width);
    }
}