package io.cucumber.datatable;

import org.apiguardian.api.API;

/**
 * Transformer for single cell. Similar to {@link TableCellTransformer} but additionally it receives expected {@code Class<T>} of cell.
 * @see TableCellTransformer
 */
@API(status = API.Status.STABLE)
@FunctionalInterface
public interface TableCellByTypeTransformer {

	/**
	 * Transforms single cell to type {@code T}
	 * @param value cell
	 * @param cellType expected cell type
	 * @param <T> see {@code cellType}
	 * @return an instance of {@code T}
	 */
	<T> T transform(String value, Class<T> cellType) throws Throwable;
}
