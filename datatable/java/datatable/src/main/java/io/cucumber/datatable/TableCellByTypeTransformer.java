package io.cucumber.datatable;

import org.apiguardian.api.API;

import java.lang.reflect.Type;

/**
 * Transformer for single cell. Similar to {@link TableCellTransformer} but
 * additionally it receives expected {@code Type} of cell.
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
     * @throws Throwable when unable to transform
     */
    Object transform(String cellValue, Type toValueType) throws Throwable;
}
