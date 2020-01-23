package io.cucumber.datatable;

import io.cucumber.datatable.DataTable.TableConverter;
import io.cucumber.datatable.TypeFactory.JavaType;
import io.cucumber.datatable.TypeFactory.ListType;
import io.cucumber.datatable.TypeFactory.MapType;
import io.cucumber.datatable.TypeFactory.OtherType;
import org.apiguardian.api.API;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static io.cucumber.datatable.CucumberDataTableException.cantConvertTo;
import static io.cucumber.datatable.CucumberDataTableException.duplicateKeyException;
import static io.cucumber.datatable.CucumberDataTableException.keyValueMismatchException;
import static io.cucumber.datatable.CucumberDataTableException.keysImplyTableEntryTransformer;
import static io.cucumber.datatable.TypeFactory.aListOf;
import static io.cucumber.datatable.TypeFactory.constructType;
import static io.cucumber.datatable.UndefinedDataTableTypeException.singletonNoConverterDefined;
import static io.cucumber.datatable.UndefinedDataTableTypeException.mapNoConverterDefined;
import static io.cucumber.datatable.UndefinedDataTableTypeException.mapsNoConverterDefined;
import static io.cucumber.datatable.UndefinedDataTableTypeException.listNoConverterDefined;
import static io.cucumber.datatable.UndefinedDataTableTypeException.listsNoConverterDefined;
import static io.cucumber.datatable.UndefinedDataTableTypeException.listTableTooWide;
import static io.cucumber.datatable.UndefinedDataTableTypeException.singletonTableTooWide;
import static java.util.Collections.emptyList;
import static java.util.Collections.emptyMap;
import static java.util.Collections.nCopies;
import static java.util.Collections.unmodifiableList;
import static java.util.Collections.unmodifiableMap;
import static java.util.Objects.requireNonNull;

@API(status = API.Status.STABLE)
public final class DataTableTypeRegistryTableConverter implements TableConverter {

    private final DataTableTypeRegistry registry;

    public DataTableTypeRegistryTableConverter(DataTableTypeRegistry registry) {
        this.registry = registry;
    }

    @Override
    public <T> T convert(DataTable dataTable, Type type) {
        return convert(dataTable, type, false);
    }

    @Override
    @SuppressWarnings("unchecked")
    public <T> T convert(DataTable dataTable, Type type, boolean transposed) {
        requireNonNull(dataTable, "dataTable may not be null");
        requireNonNull(type, "type may not be null");

        if (transposed) {
            dataTable = dataTable.transpose();
        }
        JavaType javaType = TypeFactory.constructType(type);

        DataTableType tableType = registry.lookupTableTypeByType(javaType);
        if (tableType != null) {
            return (T) tableType.transform(dataTable.cells());
        }

        if (type.equals(DataTable.class)) {
            return (T) dataTable;
        }

        if (javaType instanceof MapType) {
            MapType mapType = (MapType) javaType;
            return (T) toMap(dataTable, mapType.getKeyType(), mapType.getValueType());
        }

        if (javaType instanceof OtherType) {
            return toSingleton(dataTable, javaType);
        }

        assert javaType instanceof ListType;

        ListType listType = (ListType) javaType;
        JavaType listElementType = listType.getElementType();

        if (listElementType instanceof MapType) {
            MapType mapElement = (MapType) listElementType;
            return (T) toMaps(dataTable, mapElement.getKeyType(), mapElement.getValueType());
        }

        if (listElementType instanceof ListType) {
            ListType listElement = (ListType) listElementType;
            return (T) toLists(dataTable, listElement.getElementType());
        }

        assert listElementType instanceof OtherType;
        return (T) toList(dataTable, listElementType);
    }

    private <T> T toSingleton(DataTable dataTable, Type type) {
        if (dataTable.isEmpty()) {
            return null;
        }

        List<T> singletonList = toListOrNull(dataTable, type);
        if (singletonList == null) {
            DataTableType cellValueType = registry.lookupTableTypeByType(aListOf(aListOf(type)));
            if (cellValueType != null) {
                throw singletonTableTooWide(type, "TableEntryConverter or TableCellConverter", type);
            }
            throw singletonNoConverterDefined(type);
        }

        if (singletonList.size() == 1) {
            return singletonList.get(0);
        }

        throw cantConvertTo(type, "The table contained more then one item: " + singletonList);
    }

    @Override
    public <T> List<T> toList(DataTable dataTable, Type itemType) {
        requireNonNull(dataTable, "dataTable may not be null");
        requireNonNull(itemType, "itemType may not be null");

        if (dataTable.isEmpty()) {
            return emptyList();
        }

        List<T> list = toListOrNull(dataTable, itemType);
        if (list != null) {
            return unmodifiableList(list);
        }

        if (dataTable.width() == 1) {
            throw listNoConverterDefined(itemType, "TableEntryTransformer, TableRowTransformer or TableCellTransformer", itemType);
        }

        DataTableType cellValueType = registry.lookupTableTypeByType(aListOf(aListOf(itemType)));
        if (cellValueType != null) {
            throw listTableTooWide(itemType, "TableEntryTransformer or TableRowTransformer", itemType);
        }

        throw listNoConverterDefined(itemType, "TableEntryTransformer or TableRowTransformer", itemType);
    }

    private <T> List<T> toListOrNull(DataTable dataTable, Type itemType) {
        DataTableType tableType = registry.lookupTableTypeByType(aListOf(itemType));
        List<List<String>> cells = dataTable.cells();
        if (tableType != null) {
            return (List<T>) tableType.transform(cells);
        }

        if (dataTable.width() == 1) {
            DataTableType cellValueType = registry.lookupTableTypeByType(aListOf(aListOf(itemType)));
            if (cellValueType != null) {
                return unpack((List<List<T>>) cellValueType.transform(cells));
            }
        }

        if (dataTable.height() > 1) {
            DataTableType defaultTableType = registry.getDefaultTableEntryTransformer(itemType);
            if (defaultTableType != null) {
                return (List<T>) defaultTableType.transform(cells);
            }
        }

        if (dataTable.width() == 1) {
            DataTableType defaultCellValueType = registry.getDefaultTableCellTransformer(itemType);
            if (defaultCellValueType != null) {
                return unpack((List<List<T>>) defaultCellValueType.transform(cells));
            }
        }

        DataTableType defaultTableType = registry.getDefaultTableEntryTransformer(itemType);
        if (defaultTableType != null) {
            return (List<T>) defaultTableType.transform(cells);
        }

        return null;
    }

    @Override
    @SuppressWarnings("unchecked")
    public <T> List<List<T>> toLists(DataTable dataTable, Type itemType) {
        requireNonNull(dataTable, "dataTable may not be null");
        requireNonNull(itemType, "itemType may not be null");

        if (dataTable.isEmpty()) {
            return emptyList();
        }

        DataTableType tableType = registry.lookupTableTypeByType(aListOf(aListOf(itemType)));
        if (tableType == null) {
            tableType = registry.getDefaultTableCellTransformer(itemType);
        }
        if (tableType != null) {
            return unmodifiableList((List<List<T>>) tableType.transform(dataTable.cells()));
        }
        throw listsNoConverterDefined(itemType);
    }

    @Override
    public <K, V> Map<K, V> toMap(DataTable dataTable, Type keyType, Type valueType) {
        requireNonNull(dataTable, "dataTable may not be null");
        requireNonNull(keyType, "keyType may not be null");
        requireNonNull(valueType, "valueType may not be null");

        if (dataTable.isEmpty()) {
            return emptyMap();
        }
        DataTable keyColumn = dataTable.columns(0, 1);
        DataTable valueColumns = dataTable.columns(1);

        String firstHeaderCell = keyColumn.cell(0, 0);
        boolean firstHeaderCellIsBlank = firstHeaderCell == null || firstHeaderCell.isEmpty();
        List<K> keys = convertEntryKeys(keyType, keyColumn, valueType, firstHeaderCellIsBlank);

        if (valueColumns.isEmpty()) {
            return createMap(keyType, keys, valueType, nCopies(keys.size(), (V) null));
        }

        boolean keysImplyTableRowTransformer = keys.size() == dataTable.height() - 1;
        List<V> values = convertEntryValues(valueColumns, keyType, valueType, keysImplyTableRowTransformer);

        if (keys.size() != values.size()) {
            throw keyValueMismatchException(firstHeaderCellIsBlank, keys.size(), keyType, values.size(), valueType);
        }

        return createMap(keyType, keys, valueType, values);
    }

    private static <K, V> Map<K, V> createMap(Type keyType, List<K> keys, Type valueType, List<V> values) {
        Iterator<K> keyIterator = keys.iterator();
        Iterator<V> valueIterator = values.iterator();
        Map<K, V> result = new LinkedHashMap<>();
        while (keyIterator.hasNext() && valueIterator.hasNext()) {
            K key = keyIterator.next();
            V value = valueIterator.next();
            if (result.containsKey(key)) {
                V wouldBeReplaced = result.get(key);
                throw duplicateKeyException(keyType, valueType, key, value, wouldBeReplaced);
            }
            result.put(key, value);
        }

        return unmodifiableMap(result);
    }

    @SuppressWarnings("unchecked")
    private <K> List<K> convertEntryKeys(Type keyType, DataTable keyColumn, Type valueType, boolean firstHeaderCellIsBlank) {
        if (firstHeaderCellIsBlank) {
            DataTableType keyConverter;
            keyConverter = registry.lookupTableTypeByType(aListOf(aListOf(keyType)));
            if (keyConverter == null) {
                keyConverter = registry.getDefaultTableCellTransformer(keyType);
            }
            if (keyConverter == null) {
                throw mapNoConverterDefined(keyType, valueType, "TableCellTransformer", keyType);
            }
            return unpack((List<List<K>>) keyConverter.transform(keyColumn.rows(1, keyColumn.height()).cells()));
        }

        List<K> list = toListOrNull(keyColumn, keyType);
        if (list != null) {
            return list;
        }

        throw mapNoConverterDefined(keyType, valueType, "TableEntryTransformer or TableCellTransformer", keyType);
    }

    @SuppressWarnings("unchecked")
    private <V> List<V> convertEntryValues(DataTable dataTable, Type keyType, Type valueType, boolean keysImplyTableEntryTransformer) {
        // When converting a table to a Map we split the table into two sub tables. The left column
        // contains the keys and remaining columns values.
        //
        // Example:
        //
        // |     | name  | age |
        // | a1d | Jack  | 31  |
        // | 6b3 | Jones | 25  |
        //
        // to:
        //
        // {
        //   a1b  : { name: Jack  age: 31 },
        //   6b3  : { name: Jones age: 25 }
        // }
        //
        // Because the remaining columns are a table and we want to convert them to a specific type
        // we could call convert again. However the recursion here is limited:
        //
        // 1. valueType instanceOf List => toLists => no further recursion
        // 2. valueType instanceOf Map  => toMaps  => no further recursion
        // 3. otherwise                 => toList  => no further recursion
        //
        // So instead we unroll these steps here. This keeps the error handling and messages sane.

        JavaType javaType = constructType(valueType);

        // Handle case #1.
        if (javaType instanceof ListType) {
            ListType listType = (ListType) javaType;
            // Table cell types take priority over default converters
            DataTableType cellValueConverter = registry.lookupTableTypeByType(aListOf(aListOf(listType.getElementType())));
            if (cellValueConverter == null) {
                cellValueConverter = registry.getDefaultTableCellTransformer(listType.getElementType());
            }
            if (cellValueConverter == null) {
                throw mapNoConverterDefined(keyType, valueType, "TableCellTransformer", valueType);
            }
            return (List<V>) cellValueConverter.transform(dataTable.cells());
        }

        // Handle case #2
        if (javaType instanceof MapType) {
            MapType mapType = (MapType) javaType;
            return (List<V>) toMaps(dataTable, mapType.getKeyType(), mapType.getValueType());
        }

        // Try to handle case #3.
        // We check this regardless of the keys. They may not imply that this is a table entry.
        // But this type was registered as such.
        DataTableType entryValueConverter = registry.lookupTableTypeByType(aListOf(valueType));
        if (entryValueConverter != null) {
            return (List<V>) entryValueConverter.transform(dataTable.cells());
        }

        if (keysImplyTableEntryTransformer) {
            // There is no way around it though. This is probably a table entry.
            DataTableType defaultEntryValueConverter = registry.getDefaultTableEntryTransformer(valueType);
            if (defaultEntryValueConverter != null) {
                return (List<V>) defaultEntryValueConverter.transform(dataTable.cells());
            }
            throw keysImplyTableEntryTransformer(keyType, valueType);
        }

        // This may result in multiple values per key if the table is too wide.
        DataTableType cellValueConverter = registry.lookupTableTypeByType(aListOf(aListOf(valueType)));
        if (cellValueConverter != null) {
            return unpack((List<List<V>>) cellValueConverter.transform(dataTable.cells()));
        }
        DataTableType defaultCellValueConverter = registry.getDefaultTableCellTransformer(valueType);
        if (defaultCellValueConverter != null) {
            return unpack((List<List<V>>) defaultCellValueConverter.transform(dataTable.cells()));
        }

        throw mapNoConverterDefined(keyType, valueType, "TableEntryTransformer or TableCellTransformer", valueType);
    }

    @Override
    @SuppressWarnings("unchecked")
    public <K, V> List<Map<K, V>> toMaps(DataTable dataTable, Type keyType, Type valueType) {
        requireNonNull(dataTable, "dataTable may not be null");
        requireNonNull(keyType, "keyType may not be null");
        requireNonNull(valueType, "valueType may not be null");

        if (dataTable.isEmpty()) {
            return emptyList();
        }

        DataTableType keyConverter = registry.lookupTableTypeByType(aListOf(aListOf(keyType)));
        DataTableType valueConverter = registry.lookupTableTypeByType(aListOf(aListOf(valueType)));

        if (keyConverter == null) {
            throw mapsNoConverterDefined(keyType, valueType, keyType);
        }

        if (valueConverter == null) {
            throw mapsNoConverterDefined(keyType, valueType, valueType);
        }

        DataTable header = dataTable.rows(0, 1);

        List<Map<K, V>> result = new ArrayList<>();
        List<K> keys = unpack((List<List<K>>) keyConverter.transform(header.cells()));

        DataTable rows = dataTable.rows(1);

        if (rows.isEmpty()) {
            return emptyList();
        }

        List<List<V>> transform = (List<List<V>>) valueConverter.transform(rows.cells());

        for (List<V> values : transform) {
            result.add(createMap(keyType, keys, valueType, values));
        }
        return unmodifiableList(result);
    }

    private static <T> List<T> unpack(List<List<T>> cells) {
        List<T> unpacked = new ArrayList<>(cells.size());
        for (List<T> row : cells) {
            unpacked.addAll(row);
        }
        return unpacked;
    }

}
