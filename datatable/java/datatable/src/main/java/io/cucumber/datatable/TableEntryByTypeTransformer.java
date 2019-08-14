package io.cucumber.datatable;

import org.apiguardian.api.API;

import java.lang.reflect.Type;
import java.util.Map;

/**
 * Default transformer for entries which don't have registered {@link DataTableType} in
 * {@code TypeRegistry}. Similar to {@link TableEntryTransformer} but additionally it receives {@code Class<T>}
 * of expected object and {@link TableCellByTypeTransformer} for transforming individual cells from {@code String}
 * to arbitrary type.
 *
 * @see TableEntryTransformer
 */
@API(status = API.Status.STABLE)
@FunctionalInterface
public interface TableEntryByTypeTransformer {

    /**
     * This method should transform row represented by key-value map to object of type {@code type}
     *
     * @param entryValue      table entry, key - column name, value - cell
     * @param toValueType     type of an expected object to return
     * @param cellTransformer cell transformer
     * @return new instance of {@code type}
     */
    Object transform(Map<String, String> entryValue, Type toValueType, TableCellByTypeTransformer cellTransformer) throws Throwable;

}
