package io.cucumber.datatable;

import io.cucumber.datatable.DataTable.AbstractTableConverter;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import static io.cucumber.datatable.CucumberDataTableException.cantConvertTo;
import static io.cucumber.datatable.CucumberDataTableException.cantConvertToList;
import static io.cucumber.datatable.CucumberDataTableException.cantConvertToLists;
import static io.cucumber.datatable.CucumberDataTableException.cantConvertToMap;
import static io.cucumber.datatable.CucumberDataTableException.cantConvertToMaps;
import static io.cucumber.datatable.CucumberDataTableException.keyValueMismatchException;
import static io.cucumber.datatable.TypeFactory.aListOf;
import static java.lang.String.format;
import static java.util.Collections.emptyList;
import static java.util.Collections.emptyMap;
import static java.util.Collections.nCopies;
import static java.util.Collections.unmodifiableList;
import static java.util.Collections.unmodifiableMap;

public final class DataTableTypeRegistryTableConverter extends AbstractTableConverter {

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
        if (dataTable == null) throw new NullPointerException("dataTable may not be null");
        if (type == null) throw new NullPointerException("type may not be null");

        if (transposed) {
            dataTable = dataTable.transpose();
        }

        DataTableType tableType = registry.lookupTableTypeByType(type);
        if (tableType != null) {
            return (T) tableType.transform(dataTable.cells());
        }

        if (type.equals(DataTable.class)) {
            return (T) dataTable;
        }

        Type mapKeyType = mapKeyType(type);
        if (mapKeyType != null) {
            Type mapValueType = mapValueType(type);
            return (T) toMap(dataTable, mapKeyType, mapValueType);
        } else if(Map.class.equals(type)){
            // Non-generic map
            return (T) toMap(dataTable, String.class, String.class);
        }

        Type itemType = listItemType(type);
        if (itemType == null) {
            if (List.class.equals(type)){
                // Non-generic list
                return (T) toList(dataTable, String.class);
            } else {
                return toSingleton(dataTable, type);
            }
        }

        Type mapKeyItemType = mapKeyType(itemType);
        if (mapKeyItemType != null) {
            Type mapValueType = mapValueType(itemType);
            return (T) toMaps(dataTable, mapKeyItemType, mapValueType);
        } else if (Map.class.equals(itemType)) {
            // Non-generic map
            return (T) toMaps(dataTable, String.class, String.class);
        }

        Type listItemType = listItemType(itemType);
        if (listItemType != null) {
            return (T) toLists(dataTable, listItemType);
        } else if (List.class.equals(itemType)) {
            // Non-generic list
            return (T) toLists(dataTable, String.class);
        }

        return (T) toList(dataTable, itemType);
    }

    private <T> T toSingleton(DataTable dataTable, Type type) {
        if (dataTable.isEmpty()) {
            return null;
        }

        List<T> singletonList = toListOrNull(dataTable, type);
        if (singletonList == null) {
            throw cantConvertTo(type, format(
                "Please register a DataTableType with a " +
                    "TableTransformer, TableEntryTransformer or TableRowTransformer for %s", type));
        }

        if (singletonList.size() == 1) {
            return singletonList.get(0);
        }

        throw cantConvertTo(type, "The table contained more then one item: " + singletonList);
    }

    @Override
    public <T> List<T> toList(DataTable dataTable, Type itemType) {
        if (dataTable == null) throw new NullPointerException("dataTable may not be null");
        if (itemType == null) throw new NullPointerException("itemType may not be null");

        if (dataTable.isEmpty()) {
            return emptyList();
        }

        List<T> list = toListOrNull(dataTable, itemType);
        if (list != null) {
            return unmodifiableList(list);
        }

        if (dataTable.width() > 1) {
            throw cantConvertToList(itemType,
                format("Please register a DataTableType with a TableEntryTransformer or TableRowTransformer for %s", itemType));
        }

        throw cantConvertToList(itemType,
            format("Please register a DataTableType with a TableEntryTransformer, TableRowTransformer or TableCellTransformer for %s", itemType));
    }

    private <T> List<T> toListOrNull(DataTable dataTable, Type itemType) {
        return toListOrNull(dataTable.cells(), itemType);
    }

    @SuppressWarnings("unchecked")
    private <T> List<T> toListOrNull(List<List<String>> cells, Type itemType) {
        DataTableType tableType = registry.lookupTableTypeByType(aListOf(itemType));
        if (tableType != null) {
            return (List<T>) tableType.transform(cells);
        }

        DataTableType cellValueType = registry.lookupTableTypeByType(aListOf(aListOf(itemType)));
        if (cellValueType != null) {
            return unpack((List<List<T>>) cellValueType.transform(cells));
        }
        return null;
    }

    @Override
    @SuppressWarnings("unchecked")
    public <T> List<List<T>> toLists(DataTable dataTable, Type itemType) {
        if (dataTable == null) throw new NullPointerException("dataTable may not be null");
        if (itemType == null) throw new NullPointerException("itemType may not be null");

        if (dataTable.isEmpty()) {
            return emptyList();
        }

        DataTableType tableType = registry.lookupTableTypeByType(aListOf(aListOf(itemType)));
        if (tableType != null) {
            return unmodifiableList((List<List<T>>) tableType.transform(dataTable.cells()));
        }
        throw cantConvertToLists(itemType,
            format("Please register a DataTableType with a TableCellTransformer for %s", itemType));
    }

    @Override
    public <K, V> Map<K, V> toMap(DataTable dataTable, Type keyType, Type valueType) {
        if (dataTable == null) throw new NullPointerException("dataTable may not be null");
        if (keyType == null) throw new NullPointerException("keyType may not be null");
        if (valueType == null) throw new NullPointerException("valueType may not be null");

        if (dataTable.isEmpty()) {
            return emptyMap();
        }
        DataTable keyColumn = dataTable.columns(0, 1);
        DataTable valueColumns = dataTable.columns(1);

        String firstHeaderCell = keyColumn.cell(0,0);
        boolean firstHeaderCellIsBlank = firstHeaderCell == null || firstHeaderCell.isEmpty();
        List<K> keys = convertEntryKeys(keyType, keyColumn.cells(), valueType, firstHeaderCellIsBlank);

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
            V replaced = result.put(key, value);
            if (replaced != null) {
                throw CucumberDataTableException.duplicateKeyException(keyType, valueType, key, value, replaced);
            }
        }

        return unmodifiableMap(result);
    }

    @SuppressWarnings("unchecked")
    private <K> List<K> convertEntryKeys(Type keyType, List<List<String>> keyColumn, Type valueType, boolean firstHeaderCellIsBlank) {
        if (firstHeaderCellIsBlank) {
            DataTableType keyConverter;
            keyConverter = registry.lookupTableTypeByType(aListOf(aListOf(keyType)));
            if (keyConverter == null) {
                throw cantConvertToMap(keyType, valueType,
                    format("Please register a DataTableType with a TableCellTransformer for %s", keyType));
            }
            return unpack((List<List<K>>) keyConverter.transform(keyColumn.subList(1, keyColumn.size())));
        }

        List<K> list = toListOrNull(keyColumn, keyType);
        if (list != null) {
            return list;
        }

        throw cantConvertToMap(keyType, valueType,
            format("Please register a DataTableType with a TableEntryTransformer or TableCellTransformer for %s", keyType));
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

        // Handle case #2
        Type valueMapKeyType = mapKeyType(valueType);
        if (valueMapKeyType != null) {
            Type valueMapValueType = mapValueType(valueType);
            return (List<V>) toMaps(dataTable, valueMapKeyType, valueMapValueType);
        } else if (Map.class.equals(valueType)) {
            return (List<V>) toMaps(dataTable, String.class, String.class);
        }

        // Try to handle case #3. We are required to check the most specific solution first.
        DataTableType entryValueConverter = registry.lookupTableTypeByType(aListOf(valueType));
        if (entryValueConverter != null) {
            return (List<V>) entryValueConverter.transform(dataTable.cells());
        }

        if (keysImplyTableEntryTransformer) {
            throw cantConvertToMap(keyType, valueType,
                format("The first cell was either blank or you have registered a TableEntryTransformer for the key type.\n" +
                        "\n" +
                        "This requires that there is a TableEntryTransformer for the value type but I couldn't find any.\n" +
                        "\n" +
                        "You can either:\n" +
                        "\n" +
                        "  1) Use a DataTableType that uses a TableEntryTransformer for %s\n" +
                        "\n" +
                        "  2) Add a key to the first cell and use a DataTableType that uses a TableEntryTransformer for %s", valueType, keyType));
        }

        // Try to handle case #1. This may result in multiple values per key if the table is too wide.
        DataTableType cellValueConverter = registry.lookupTableTypeByType(aListOf(aListOf(valueType)));
        if (cellValueConverter != null) {
            return unpack((List<List<V>>) cellValueConverter.transform(dataTable.cells()));
        }

        throw cantConvertToMap(keyType, valueType,
            format("Please register a DataTableType with a TableEntryTransformer or TableCellTransformer for %s", valueType));
    }

    @Override
    @SuppressWarnings("unchecked")
    public <K, V> List<Map<K, V>> toMaps(DataTable dataTable, Type keyType, Type valueType) {
        if (dataTable == null) throw new NullPointerException("dataTable may not be null");
        if (keyType == null) throw new NullPointerException("keyType may not be null");
        if (valueType == null) throw new NullPointerException("valueType may not be null");

        if (dataTable.isEmpty()) {
            return emptyList();
        }

        DataTableType keyConverter = registry.lookupTableTypeByType(aListOf(aListOf(keyType)));
        DataTableType valueConverter = registry.lookupTableTypeByType(aListOf(aListOf(valueType)));

        if (keyConverter == null) {
            throw cantConvertToMaps(keyType, valueType,
                format("Please register a DataTableType with a TableCellTransformer for %s", keyType));
        }

        if (valueConverter == null) {
            throw cantConvertToMaps(keyType, valueType,
                format("Please register a DataTableType with a TableCellTransformer for %s", valueType));
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
