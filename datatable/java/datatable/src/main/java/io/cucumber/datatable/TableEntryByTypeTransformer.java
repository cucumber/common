package io.cucumber.datatable;

import java.util.Map;

/**
 * Default transformer for entries which don't have registered {@link DataTableType} in
 * {@code TypeRegistry}. Similar to {@link TableEntryTransformer} but additionally it receives {@code Class<T>}
 * of expected object and {@link TableCellByTypeTransformer} for transforming individual cells from {@code String}
 * to arbitrary type.
 *
 * @see TableEntryTransformer
 */
public interface TableEntryByTypeTransformer {

    /**
     * This method should transform row represented by key-value map to object of type {@code type}
     *
     * @param entry           table entry, key - column name, value - cell
     * @param type            type of an expected object to return
     * @param cellTransformer cell transformer
     * @param <T>             see {@code type}
     * @return new instance of {@code type}
     */
    <T> T transform(Map<String, String> entry, Class<T> type, TableCellByTypeTransformer cellTransformer) throws Throwable;

}
