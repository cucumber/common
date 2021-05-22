package io.cucumber.datatable;

import io.cucumber.datatable.TypeFactory.JavaType;
import io.cucumber.datatable.TypeFactory.ListType;
import org.apiguardian.api.API;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.StringJoiner;

import static io.cucumber.datatable.TypeFactory.aListOf;
import static io.cucumber.datatable.TypeFactory.constructType;
import static io.cucumber.datatable.TypeFactory.optionalOf;

/**
 * A data table type describes how a data table should be represented as an
 * object.
 *
 * @see <a href="https://github.com/cucumber/common/tree/main/datatable">DataTable - README.md</a>
 */
@API(status = API.Status.STABLE)
public final class DataTableType {

    private static final ConversionRequired CONVERSION_REQUIRED = new ConversionRequired();
    private final RawTableTransformer<?> transformer;
    private final Type elementType;
    private final boolean replaceable;

    private DataTableType(Type type, RawTableTransformer<?> transformer) {
        this(type, transformer, false);
    }

    private DataTableType(Type type, RawTableTransformer<?> transformer, boolean replaceable) {
        if (type == null)
            throw new NullPointerException("type cannot be null");
        if (transformer == null)
            throw new NullPointerException("transformer cannot be null");
        this.elementType = type;
        this.transformer = transformer;
        this.replaceable = replaceable;
    }

    /**
     * Creates a data table type that transforms the whole table to a single
     * object.
     *
     * @param type        the type of the object
     * @param transformer a function that creates an instance of
     *                    <code>type</code> from the data table
     * @param <T>         see <code>type</code>
     */
    public <T> DataTableType(Type type, TableTransformer<T> transformer) {
        this(type, new TableTransformerAdaptor<>(type, transformer));
    }

    /**
     * Creates a data table type that transforms the rows of the table into a
     * list of objects.
     *
     * @param type        the type of the list items
     * @param transformer a function that creates an instance of
     *                    <code>type</code> from the data table row
     * @param <T>         see <code>type</code>
     */
    public <T> DataTableType(Type type, TableRowTransformer<T> transformer) {
        this(type, new TableRowTransformerAdaptor<>(type, transformer));
    }

    /**
     * Creates a data table type that transforms the entries of the table into
     * a list of objects. An entry consists of the elements of the table header
     * paired with the values of each subsequent row.
     *
     * @param type        the type of the list items
     * @param transformer a function that creates an instance of
     *                    <code>type</code> from the data table entry
     * @param <T>         see <code>type</code>
     */
    public <T> DataTableType(Type type, TableEntryTransformer<T> transformer) {
        this(type, new TableEntryTransformerAdaptor<>(type, transformer));
    }

    /**
     * Creates a data replaceable table type that transforms the entries of the
     * table into a list of objects. An entry consists of the elements of the
     * table header paired with the values of each subsequent row.
     *
     * @param type        the type of the list items
     * @param transformer a function that creates an instance of
     *                    <code>type</code> from the data table entry
     * @param replaceable can this datatable type be replaced with another for the same type
     * @param <T>         see <code>type</code>
     */
    <T> DataTableType(Type type, TableCellTransformer<T> transformer, boolean replaceable) {
        this(type, new TableCellTransformerAdaptor<>(type, transformer), replaceable);
    }

    /**
     * Creates a data table type that transforms the cells of the table into a
     * list of list of objects.
     *
     * @param type        the type of the list of lists items
     * @param transformer a function that creates an instance of
     *                    <code>type</code> from the data table cell
     * @param <T>         see <code>type</code>
     */
    public <T> DataTableType(Type type, TableCellTransformer<T> transformer) {
        this(type, new TableCellTransformerAdaptor<>(type, transformer));
    }

    /**
     * Creates a data table type for default cell transformer
     *
     * @param cellType                    class representing cell declared in
     *                                    {@code List<List<T>>}
     * @param defaultDataTableTransformer default cell transformer registered in
     *                                    {@link DataTableTypeRegistry#setDefaultDataTableCellTransformer(TableCellByTypeTransformer)}
     * @return new DataTableType witch transforms {@code List<List<String>>} to
     * {@code List<List<T>>}
     */
    static DataTableType defaultCell(Type cellType, TableCellByTypeTransformer defaultDataTableTransformer) {
        return new DataTableType(cellType, (String cell) -> defaultDataTableTransformer.transform(cell, cellType));
    }

    /**
     * Creates a data table type for default entry transformer
     *
     * @param entryType                   type representing entry declared in
     *                                    {@code List<T>}
     * @param defaultDataTableTransformer default entry transformer registered
     *                                    in {@link DataTableTypeRegistry#setDefaultDataTableEntryTransformer(TableEntryByTypeTransformer)}
     * @return new DataTableType witch transforms {@code List<List<String>>} to
     * {@code List<T>}
     */
    static DataTableType defaultEntry(Type entryType, TableEntryByTypeTransformer defaultDataTableTransformer,
            TableCellByTypeTransformer tableCellByTypeTransformer) {
        return new DataTableType(entryType, (Map<String, String> entry) -> defaultDataTableTransformer
                .transform(entry, entryType, tableCellByTypeTransformer));
    }

    public Object transform(List<List<String>> raw) {
        try {
            return transformer.transform(raw);
        } catch (Throwable throwable) {
            throw new CucumberDataTableException(
                    String.format("'%s' could not transform%n%s", toCanonical(), DataTable.create(raw)), throwable);
        }
    }

    JavaType getTargetType() {
        return transformer.getTargetType();
    }

    String toCanonical() {
        return getTargetType().getTypeName();
    }

    Type getElementType() {
        return elementType;
    }

    Class<?> getTransformerType() {
        return transformer.getOriginalTransformerType();
    }

    boolean isReplaceable() {
        return replaceable;
    }

    DataTableType asOptional() {
        return new DataTableType(
                elementType,
                transformer.asOptional(),
                replaceable
        );
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", DataTableType.class.getSimpleName() + "[", "]")
                .add("targetType=" + this.toCanonical())
                .add("replaceable=" + replaceable)
                .toString();
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (o == null || getClass() != o.getClass())
            return false;

        DataTableType that = (DataTableType) o;

        return getTargetType().equals(that.getTargetType());
    }

    @Override
    public int hashCode() {
        return getTargetType().hashCode();
    }

    interface RawTableTransformer<T> {
        Class<?> getOriginalTransformerType();

        T transform(List<List<String>> raw) throws Throwable;

        RawTableTransformer<?> asOptional();

        JavaType getTargetType();

    }

    private static class TableCellTransformerAdaptor<T> implements RawTableTransformer<List<List<T>>> {
        private final JavaType targetType;
        private final TableCellTransformer<T> transformer;
        private final Type elementType;

        TableCellTransformerAdaptor(Type targetType,
                TableCellTransformer<T> transformer) {
            if (targetType == null)
                throw new NullPointerException("targetType cannot be null");
            this.elementType = targetType;
            this.targetType = aListOf(aListOf(targetType));
            if (transformer == null)
                throw new NullPointerException("transformer cannot be null");
            this.transformer = transformer;
        }

        @Override
        public Class<?> getOriginalTransformerType() {
            return TableCellTransformer.class;
        }

        @Override
        public List<List<T>> transform(List<List<String>> raw) throws Throwable {
            List<List<T>> list = new ArrayList<>(raw.size());
            for (List<String> tableRow : raw) {
                List<T> row = new ArrayList<>(tableRow.size());
                for (String entry : tableRow) {
                    row.add(transformer.transform(entry));
                }
                list.add(row);
            }
            return list;
        }

        @Override
        public RawTableTransformer<?> asOptional() {
            return new TableCellTransformerAdaptor<>(optionalOf(elementType), new OptionalTableCellTransformer());
        }

        @Override
        public JavaType getTargetType() {
            return targetType;
        }

        private class OptionalTableCellTransformer implements TableCellTransformer<Object> {
            @Override
            public Object transform(String cell) throws Throwable {
                return cell == null ? Optional.empty() : Optional.ofNullable(transformer.transform(cell));
            }
        }
    }

    private static class TableRowTransformerAdaptor<T> implements RawTableTransformer<List<T>> {
        private final ListType targetType;
        private final TableRowTransformer<T> transformer;

        TableRowTransformerAdaptor(Type targetType, TableRowTransformer<T> transformer) {
            if (targetType == null)
                throw new NullPointerException("targetType cannot be null");
            this.targetType = aListOf(targetType);
            if (transformer == null)
                throw new NullPointerException("transformer cannot be null");
            this.transformer = transformer;
        }

        @Override
        public Class<?> getOriginalTransformerType() {
            return TableRowTransformer.class;
        }

        @Override
        public List<T> transform(List<List<String>> raw) throws Throwable {
            List<T> list = new ArrayList<>();
            for (List<String> tableRow : raw) {
                list.add(transformer.transform(tableRow));
            }

            return list;
        }

        @Override
        public RawTableTransformer<?> asOptional() {
            throw new UnsupportedOperationException();
        }

        @Override
        public JavaType getTargetType() {
            return targetType;
        }

    }

    private static class TableEntryTransformerAdaptor<T> implements RawTableTransformer<List<T>> {
        private final ListType targetType;
        private final TableEntryTransformer<T> transformer;

        TableEntryTransformerAdaptor(Type targetType, TableEntryTransformer<T> transformer) {
            if (targetType == null)
                throw new NullPointerException("targetType cannot be null");
            this.targetType = aListOf(targetType);
            if (transformer == null)
                throw new NullPointerException("transformer cannot be null");
            this.transformer = transformer;
        }

        @Override
        public Class<?> getOriginalTransformerType() {
            return TableEntryTransformer.class;
        }

        @Override
        public List<T> transform(List<List<String>> raw) throws Throwable {
            DataTable table = DataTable.create(raw, CONVERSION_REQUIRED);
            List<T> list = new ArrayList<>();
            for (Map<String, String> entry : table.entries()) {
                list.add(transformer.transform(entry));
            }

            return list;
        }

        @Override
        public RawTableTransformer<?> asOptional() {
            throw new UnsupportedOperationException();
        }

        @Override
        public JavaType getTargetType() {
            return targetType;
        }

    }

    private static class TableTransformerAdaptor<T> implements RawTableTransformer<T> {
        private final JavaType targetType;
        private final TableTransformer<T> transformer;

        TableTransformerAdaptor(Type targetType, TableTransformer<T> transformer) {
            if (targetType == null)
                throw new NullPointerException("targetType cannot be null");
            this.targetType = constructType(targetType);
            if (transformer == null)
                throw new NullPointerException("transformer cannot be null");
            this.transformer = transformer;
        }

        @Override
        public Class<?> getOriginalTransformerType() {
            return TableTransformer.class;
        }

        @Override
        public T transform(List<List<String>> raw) throws Throwable {
            return transformer.transform(DataTable.create(raw, CONVERSION_REQUIRED));
        }

        @Override
        public RawTableTransformer<?> asOptional() {
            throw new UnsupportedOperationException();
        }

        @Override
        public JavaType getTargetType() {
            return targetType;
        }

    }

}
