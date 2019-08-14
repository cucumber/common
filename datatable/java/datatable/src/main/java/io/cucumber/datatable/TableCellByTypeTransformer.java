package io.cucumber.datatable;

import org.apiguardian.api.API;

import java.lang.reflect.Type;

/**
 * Transformer for single cell. Similar to {@link TableCellTransformer} but
 * additionally it receives expected {@code Class<T>} of cell.
 *
 * @see TableCellTransformer
 */
@API(status = API.Status.STABLE)
@FunctionalInterface
public interface TableCellByTypeTransformer {

    /**
     * Transforms single cell to value of type
     *
     * @param cellValue   cell
     * @param toValueType expected cell type
     * @return an instance of type
     */
    Object transform(String cellValue, Type toValueType) throws Throwable;
}
