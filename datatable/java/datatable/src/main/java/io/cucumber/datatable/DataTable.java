package io.cucumber.datatable;

import org.apiguardian.api.API;

import java.io.IOException;
import java.lang.reflect.Type;
import java.util.AbstractList;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.RandomAccess;

import static io.cucumber.datatable.CucumberDataTableException.duplicateKeyException;
import static java.util.Collections.emptyList;
import static java.util.Collections.unmodifiableList;
import static java.util.Collections.unmodifiableMap;

/**
 * A m-by-n table of string values. For example:
 *
 * <pre>
 * |     | firstName   | lastName | birthDate  |
 * | 4a1 | Annie M. G. | Schmidt  | 1911-03-20 |
 * | c92 | Roald       | Dahl     | 1916-09-13 |
 * </pre>
 * <p>
 * A table is either empty or  contains one or more cells. As
 * such if a table has zero height it must have zero width and
 * vice versa.
 * <p>
 * The first row of the the table may be referred to as the
 * table header. The remaining cells as the table body.
 * <p>
 * A table can be converted into an object of an arbitrary
 * type by a {@link TableConverter}. A table created without
 * a table converter will throw a {@link NoConverterDefined}
 * exception when doing so.
 * <p>
 * A DataTable is immutable and thread safe.
 */
@API(status = API.Status.STABLE)
public final class DataTable {

    private final List<List<String>> raw;
    private final TableConverter tableConverter;

    /**
     * Creates a new DataTable.
     * <p>
     * To improve performance this constructor assumes the provided raw table
     * is rectangular, free of null values, immutable and a safe copy.
     *
     * @param raw            the underlying table
     * @param tableConverter to transform the table
     * @throws NullPointerException if either raw or tableConverter is null
     */
    private DataTable(List<List<String>> raw, TableConverter tableConverter) {
        if (raw == null) throw new NullPointerException("cells can not be null");
        if (tableConverter == null) throw new NullPointerException("tableConverter can not be null");
        this.raw = raw;
        this.tableConverter = tableConverter;
    }

    /**
     * Creates a new DataTable.
     * <p>
     *
     * @param raw the underlying table
     * @return a new data table containing the raw values
     * @throws NullPointerException     if raw is null
     * @throws IllegalArgumentException when the table is not rectangular or contains null values.
     */
    public static DataTable create(List<List<String>> raw) {
        return create(raw, new NoConverterDefined());
    }

    /**
     * Creates a new DataTable with a table converter.
     *
     * @param raw            the underlying table
     * @param tableConverter to transform the table
     * @return a new data table containing the raw values
     * @throws NullPointerException     if either raw or tableConverter is null
     * @throws IllegalArgumentException when the table is not rectangular or contains null values
     */
    public static DataTable create(List<List<String>> raw, TableConverter tableConverter) {
        return new DataTable(copy(requireRectangularTable(raw)), tableConverter);
    }

    private static List<List<String>> copy(List<List<String>> balanced) {
        List<List<String>> rawCopy = new ArrayList<>(balanced.size());
        for (List<String> row : balanced) {
            // A table without columns is an empty table and has no rows.
            if (row.isEmpty()) {
                return emptyList();
            }

            List<String> rowCopy = new ArrayList<>(row.size());
            rowCopy.addAll(row);
            rawCopy.add(unmodifiableList(rowCopy));
        }
        return unmodifiableList(rawCopy);
    }

    private static List<List<String>> requireRectangularTable(List<List<String>> table) {
        int columns = table.isEmpty() ? 0 : table.get(0).size();
        for (List<String> row : table) {
            if (columns != row.size()) {
                throw new IllegalArgumentException(String.format("Table is not rectangular: expected %s column(s) but found %s.", columns, row.size()));
            }
        }
        return table;
    }

    /**
     * Creates an empty DataTable.
     *
     * @return an empty DataTable
     */
    public static DataTable emptyDataTable() {
        return new DataTable(Collections.emptyList(), new NoConverterDefined());
    }

    /**
     * Returns the table converter of this data table.
     *
     * @return the tables table converter
     */
    public TableConverter getTableConverter() {
        return tableConverter;
    }

    /**
     * Performs a diff against an other instance.
     *
     * @param actual the other table to diff with
     * @throws TableDiffException if the tables are different
     */
    public void diff(DataTable actual) throws TableDiffException {
        TableDiffer tableDiffer = new TableDiffer(this, actual);
        DataTableDiff dataTableDiff = tableDiffer.calculateDiffs();
        if (!dataTableDiff.isEmpty()) {
            throw TableDiffException.diff(dataTableDiff);
        }
    }

    /**
     * Performs an unordered diff against an other instance.
     *
     * @param actual the other table to diff with
     * @throws TableDiffException if the tables are different
     */
    public void unorderedDiff(DataTable actual) throws TableDiffException {
        TableDiffer tableDiffer = new TableDiffer(this, actual);
        DataTableDiff dataTableDiff = tableDiffer.calculateUnorderedDiffs();
        if (!dataTableDiff.isEmpty()) {
            throw TableDiffException.diff(dataTableDiff);
        }
    }

    /**
     * Returns a list view on the table. Contains the cells ordered from
     * left to right, top to bottom starting at the top left.
     *
     * @return the cells of the table
     */
    public List<String> asList() {
        return new ListView();
    }

    /**
     * Converts the table to a list of {@code itemType}.
     *
     * @param itemType the type of the list items
     * @param <T>      the type of the list items
     * @return a List of objects
     */
    public <T> List<T> asList(Type itemType) {
        return tableConverter.toList(this, itemType);
    }

    /**
     * Returns the cells of the table.
     *
     * @return the cells of the table
     */
    public List<List<String>> asLists() {
        return cells();
    }

    /**
     * Returns the cells of the table.
     *
     * @return the cells of the table
     */
    public List<List<String>> cells() {
        return raw;
    }

    /**
     * Converts the table to a list of lists of {@code itemType}.
     *
     * @param itemType the type of the list items
     * @param <T>      the type of the list items
     * @return a list of list of objects
     */
    public <T> List<List<T>> asLists(Type itemType) {
        return tableConverter.toLists(this, itemType);
    }

    /**
     * Converts the table to a single map of {@code keyType} to {@code valueType}.
     * <p>
     * For each row the first cell is used to create the key value. The
     * remaining cells are used to create the value. If the table only has a single
     * column that value is null.
     *
     * @param <K>       key type
     * @param <V>       value type
     * @param keyType   key type
     * @param valueType value type
     * @return a map
     */
    public <K, V> Map<K, V> asMap(Type keyType, Type valueType) {
        return tableConverter.toMap(this, keyType, valueType);
    }

    /**
     * Converts the table to a list of maps of strings. For each row in the body
     * of the table a map is created containing a mapping of column headers to
     * the column cell of that row.
     *
     * @return a list of maps
     */
    public List<Map<String, String>> asMaps() {
        if (raw.isEmpty()) return emptyList();

        List<String> headers = raw.get(0);
        List<Map<String, String>> headersAndRows = new ArrayList<>();

        for (int i = 1; i < raw.size(); i++) {
            List<String> row = raw.get(i);
            LinkedHashMap<String, String> headersAndRow = new LinkedHashMap<>();
            for (int j = 0; j < headers.size(); j++) {
                String replaced = headersAndRow.put(headers.get(j), row.get(j));
                if (replaced != null) {
                    throw duplicateKeyException(String.class, String.class, headers.get(j), row.get(j), replaced);
                }
            }
            headersAndRows.add(unmodifiableMap(headersAndRow));
        }

        return unmodifiableList(headersAndRows);
    }

    /**
     * Converts the table to a list of maps of {@code keyType} to {@code valueType}.
     * For each row in the body of the table a map is created containing a mapping
     * of column headers to the column cell of that row.
     *
     * @param <K>       key type
     * @param <V>       value type
     * @param keyType   key type
     * @param valueType value type
     * @return a list of maps
     */
    public <K, V> List<Map<K, V>> asMaps(Type keyType, Type valueType) {
        return tableConverter.toMaps(this, keyType, valueType);
    }

    /**
     * Returns a single table cell.
     *
     * @param row    row index of the cell
     * @param column column index of the cell
     * @return a single table cell
     * @throws IndexOutOfBoundsException when either {@code row} or {@code column}
     *                                   is outside the table.
     */
    public String cell(int row, int column) {
        rangeCheckRow(row, height());
        rangeCheckColumn(column, width());
        return raw.get(row).get(column);
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

    /**
     * Returns a single column.
     *
     * @param column column index the column
     * @return a single column
     * @throws IndexOutOfBoundsException when {@code column}
     *                                   is outside the table.
     */
    public List<String> column(final int column) {
        return new ColumnView(column);
    }

    /**
     * Returns a table that is a view on a portion of this
     * table. The sub table begins at {@code fromColumn} inclusive
     * and extends to the end of that table.
     *
     * @param fromColumn the beginning column index, inclusive
     * @return the specified sub table
     * @throws IndexOutOfBoundsException when any endpoint is
     *                                   outside the table.
     * @throws IllegalArgumentException  when a from endpoint
     *                                   comes after an to endpoint
     */
    public DataTable columns(final int fromColumn) {
        return columns(fromColumn, width());
    }

    /**
     * Returns a table that is a view on a portion of this
     * table. The sub table begins at {@code fromColumn} inclusive
     * and extends to {@code toColumn} exclusive.
     *
     * @param fromColumn the beginning column index, inclusive
     * @param toColumn   the end column index, exclusive
     * @return the specified sub table
     * @throws IndexOutOfBoundsException when any endpoint is outside
     *                                   the table.
     * @throws IllegalArgumentException  when a from endpoint comes
     *                                   after an to endpoint
     */
    public DataTable columns(final int fromColumn, final int toColumn) {
        return subTable(0, fromColumn, height(), toColumn);
    }

    /**
     * Converts a table to {@code type}.
     *
     * @param type       the desired type
     * @param transposed transpose the table before transformation
     * @param <T>        the desired type
     * @return an instance of {@code type}
     */
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

    @Override
    public int hashCode() {
        return raw.hashCode();
    }

    /**
     * Returns true iff this table has no cells.
     *
     * @return true iff this table has no cells
     */
    public boolean isEmpty() {
        return raw.isEmpty();
    }

    /**
     * Returns a single row.
     *
     * @param row row index the column
     * @return a single row
     * @throws IndexOutOfBoundsException when {@code row}
     *                                   is outside the table.
     */
    public List<String> row(int row) {
        rangeCheckRow(row, height());
        return raw.get(row);
    }

    /**
     * Returns a table that is a view on a portion of this
     * table. The sub table begins at {@code fromRow} inclusive
     * and extends to the end of that table.
     *
     * @param fromRow the beginning row index, inclusive
     * @return the specified sub table
     * @throws IndexOutOfBoundsException when any endpoint is
     *                                   outside the table.
     * @throws IllegalArgumentException  when a from endpoint
     *                                   comes after an to endpoint
     */
    public DataTable rows(int fromRow) {
        return rows(fromRow, height());
    }

    /**
     * Returns a table that is a view on a portion of this
     * table. The sub table begins at {@code fromRow} inclusive
     * and extends to {@code toRow} exclusive.
     *
     * @param fromRow the beginning row index, inclusive
     * @param toRow   the end row index, exclusive
     * @return the specified sub table
     * @throws IndexOutOfBoundsException when any endpoint is outside
     *                                   the table.
     * @throws IllegalArgumentException  when a from endpoint comes
     *                                   after an to endpoint
     */
    public DataTable rows(int fromRow, int toRow) {
        return subTable(fromRow, 0, toRow, width());
    }

    /**
     * Returns a table that is a view on a portion of this
     * table. The sub table begins at {@code fromRow} inclusive and
     * {@code fromColumn} inclusive and extends to the last column
     * and row.
     *
     * @param fromRow    the beginning row index, inclusive
     * @param fromColumn the beginning column index, inclusive
     * @return the specified sub table
     * @throws IndexOutOfBoundsException when any endpoint is outside
     *                                   the table.
     */
    public DataTable subTable(int fromRow, int fromColumn) {
        return subTable(fromRow, fromColumn, height(), width());
    }

    /**
     * Returns a table that is a view on a portion of this
     * table. The sub table begins at {@code fromRow} inclusive and
     * {@code fromColumn} inclusive and extends to {@code toRow}
     * exclusive and {@code toColumn} exclusive.
     *
     * @param fromRow    the beginning row index, inclusive
     * @param fromColumn the beginning column index, inclusive
     * @param toRow      the end row index, exclusive
     * @param toColumn   the end column index, exclusive
     * @return the specified sub table
     * @throws IndexOutOfBoundsException when any endpoint is outside
     *                                   the table.
     * @throws IllegalArgumentException  when a from endpoint comes
     *                                   after an to endpoint
     */
    public DataTable subTable(int fromRow, int fromColumn, int toRow, int toColumn) {
        return new DataTable(new RawDataTableView(fromRow, fromColumn, toColumn, toRow), tableConverter);
    }

    /**
     * Returns the number of rows in the table.
     *
     * @return the number of rows in the table
     */
    public int height() {
        return raw.size();
    }

    /**
     * Returns the number of columns in the table.
     *
     * @return the number of columns in the table
     */
    public int width() {
        return raw.isEmpty() ? 0 : raw.get(0).size();
    }

    /**
     * Returns a string representation of the this
     * table.
     */
    @Override
    public String toString() {
        StringBuilder result = new StringBuilder();
        print(result);
        return result.toString();
    }

    /**
     * Prints a string representation of this
     * table to the {@code appendable}.
     *
     * @param appendable to append the string representation
     *                   of this table to.
     * @throws IOException If an I/O error occurs
     */
    public void print(Appendable appendable) throws IOException {
        TablePrinter printer = new TablePrinter();
        printer.printTable(raw, appendable);
    }

    /**
     * Prints a string representation of this
     * table to the {@code appendable}.
     *
     * @param appendable to append the string representation
     *                   of this table to.
     */
    public void print(StringBuilder appendable) {
        TablePrinter printer = new TablePrinter();
        printer.printTable(raw, appendable);
    }

    /**
     * Returns a transposed view on this table. Example:
     *
     * <pre>
     *    | a | 7 | 4 |
     *    | b | 9 | 2 |
     * </pre>
     * <p>
     * becomes:
     * <pre>
     * | a | b |
     * | 7 | 9 |
     * | 4 | 2 |
     * </pre>
     *
     * @return a transposed view of the table
     */
    public DataTable transpose() {
        if (raw instanceof TransposedRawDataTableView) {
            TransposedRawDataTableView transposed = (TransposedRawDataTableView) this.raw;
            return transposed.dataTable();
        }
        return new DataTable(new TransposedRawDataTableView(), tableConverter);
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
         * @param dataTable the table to convert
         * @param type      the type to convert to
         * @param <T>       the type to convert to
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
         * @param <T>        the type to convert to
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
         *
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
         *
         * <pre>
         * [
         *   Author[ name: Annie M. G. Schmidt, birthDate: 1911-03-20 ],
         *   Author[ name: Roald Dahl,          birthDate: 1916-09-13 ]
         * ]
         * </pre>
         * <p>
         * Likewise:
         *
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
         * @param <T>       the type to convert to
         * @return a list of objects of <code>itemType</code>
         */
        <T> List<T> toList(DataTable dataTable, Type itemType);

        /**
         * Converts a {@link DataTable} to a list of lists.
         * <p>
         * Each row maps to a list, each table cell a list entry.
         * <p>
         * For example:
         *
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
         * @param <T>       the type to convert to
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
         *
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
         *
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
         * @param <K>       the key type to convert to
         * @param <V>       the value type to convert to
         * @return a map of <code>keyType</code> <code>valueType</code>
         */

        <K, V> Map<K, V> toMap(DataTable dataTable, Type keyType, Type valueType);

        /**
         * Converts a {@link DataTable} to a list of maps.
         * <p>
         * Each map represents a row in the table. The map keys are the column headers.
         * <p>
         * For example:
         *
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
         * @param <K>       the key type to convert to
         * @param <V>       the value type to convert to
         * @return a list of maps of <code>keyType</code> <code>valueType</code>
         */
        <K, V> List<Map<K, V>> toMaps(DataTable dataTable, Type keyType, Type valueType);

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
            return raw.get(index / width).get(index % width);
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

        DataTable dataTable() {
            return DataTable.this;
        }

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
    }
}
