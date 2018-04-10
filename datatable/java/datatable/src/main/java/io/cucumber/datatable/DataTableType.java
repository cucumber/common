package io.cucumber.datatable;

import io.cucumber.datatable.dependency.com.fasterxml.jackson.databind.JavaType;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static io.cucumber.datatable.TypeFactory.aListOf;
import static io.cucumber.datatable.TypeFactory.constructType;


public final class DataTableType implements Comparable<DataTableType> {

    private static final ConversionRequired CONVERSION_REQUIRED = new ConversionRequired();
    private final String name;
    private final JavaType type;
    private final RawTableTransformer<?> transformer;
    private final boolean preferForTypeMatch;

    private DataTableType(String name, Type type, RawTableTransformer<?> transformer, boolean preferForTypeMatch) {
        if (name == null) throw new CucumberDataTableException("name cannot be null");
        if (type == null) throw new CucumberDataTableException("type cannot be null");
        if (transformer == null) throw new CucumberDataTableException("transformer cannot be null");
        this.name = name;
        this.type = constructType(type);
        this.transformer = transformer;
        this.preferForTypeMatch = preferForTypeMatch;
    }

    public <T> DataTableType(String name, Type type, final TableTransformer<T> transformer) {
        this(name, type, transformer, false);
    }

    public <T> DataTableType(String name, Type type, final TableTransformer<T> transformer, boolean preferForTypeMatch) {
        this(name, type, new TableTransformerAdaptor<>(transformer), preferForTypeMatch);
    }

    public <T> DataTableType(String name, Class<T> type, final TableTransformer<T> transformer) {
        this(name, type, transformer, false);
    }

    public <T> DataTableType(String name, Class<T> type, final TableTransformer<T> transformer, boolean preferForTypeMatch) {
        this(name, type, new TableTransformerAdaptor<>(transformer), preferForTypeMatch);
    }

    public <T> DataTableType(String name, final Class<T> type, final TableEntryTransformer<T> transformer) {
        this(name, type, transformer, false);
    }

    public <T> DataTableType(String name, final Class<T> type, final TableEntryTransformer<T> transformer, boolean preferForTypeMatch) {
        this(name, aListOf(type), new TableEntryTransformerAdaptor<>(transformer), preferForTypeMatch);
    }

    public <T> DataTableType(String name, final Class<T> type, final TableRowTransformer<T> transformer) {
        this(name, type, transformer, false);
    }

    public <T> DataTableType(String name, final Class<T> type, final TableRowTransformer<T> transformer, boolean preferForTypeMatch) {
        this(name, aListOf(type), new TableRowTransformerAdaptor<>(transformer), preferForTypeMatch);
    }

    public <T> DataTableType(String name, final Class<T> type, final TableCellTransformer<T> transformer) {
        this(name, type, transformer, false);
    }

    public <T> DataTableType(String name, final Class<T> type, final TableCellTransformer<T> transformer, boolean preferForTypeMatch) {
        this(name, aListOf(aListOf(type)), new TableCellTransformerAdaptor<>(transformer), preferForTypeMatch);
    }

    public Object transform(List<List<String>> raw) {
        try {
            return transformer.transform(raw);
        } catch (Throwable throwable) {
            throw new CucumberDataTableException(
                String.format("'%s' could not transform%n%s", name, DataTable.create(raw)), throwable);
        }
    }

    @Override
    public int compareTo(DataTableType o) {
        if (preferForTypeMatch() && !o.preferForTypeMatch()) return -1;
        if (o.preferForTypeMatch() && !preferForTypeMatch()) return 1;
        return getName().compareTo(o.getName());
    }


    String getName() {
        return name;
    }

    JavaType getType() {
        return type;
    }

    boolean preferForTypeMatch() {
        return preferForTypeMatch;
    }

    @Override
    public String toString() {
        return "{" + name + "}";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        DataTableType that = (DataTableType) o;

        return name.equals(that.name);
    }

    @Override
    public int hashCode() {
        return name.hashCode();
    }

    private static class TableCellTransformerAdaptor<T> implements RawTableTransformer<List<List<T>>> {
        private final TableCellTransformer<T> transformer;

        TableCellTransformerAdaptor(TableCellTransformer<T> transformer) {
            if (transformer == null) throw new CucumberDataTableException("transformer cannot be null");
            this.transformer = transformer;
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
    }

    private static class TableRowTransformerAdaptor<T> implements RawTableTransformer<List<T>> {
        private final TableRowTransformer<T> transformer;

        TableRowTransformerAdaptor(TableRowTransformer<T> transformer) {
            if (transformer == null) throw new CucumberDataTableException("transformer cannot be null");
            this.transformer = transformer;
        }

        @Override
        public List<T> transform(List<List<String>> raw) throws Throwable {
            List<T> list = new ArrayList<>();
            for (List<String> tableRow : raw) {
                list.add(transformer.transform(tableRow));
            }

            return list;
        }
    }

    private static class TableEntryTransformerAdaptor<T> implements RawTableTransformer<List<T>> {
        private final TableEntryTransformer<T> transformer;

        TableEntryTransformerAdaptor(TableEntryTransformer<T> transformer) {
            if (transformer == null) throw new CucumberDataTableException("transformer cannot be null");
            this.transformer = transformer;
        }

        @Override
        public List<T> transform(List<List<String>> raw) throws Throwable {
            DataTable table = DataTable.create(raw, CONVERSION_REQUIRED);
            List<T> list = new ArrayList<>();
            for (Map<String, String> entry : table.asMaps()) {
                list.add(transformer.transform(entry));
            }

            return list;
        }
    }

    private static class TableTransformerAdaptor<T> implements RawTableTransformer<T> {
        private final TableTransformer<T> transformer;

        TableTransformerAdaptor(TableTransformer<T> transformer) {
            if (transformer == null) throw new CucumberDataTableException("transformer cannot be null");
            this.transformer = transformer;
        }

        @Override
        public T transform(List<List<String>> raw) throws Throwable {
            return transformer.transform(DataTable.create(raw, CONVERSION_REQUIRED));
        }
    }
}
