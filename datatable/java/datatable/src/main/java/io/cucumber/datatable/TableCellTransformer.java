package io.cucumber.datatable;

/**
 * Transforms a single table cell to an instance of {@code T}.
 *
 * @param <T> the target type
 */
public interface TableCellTransformer<T> {

    /**
     * Transforms a single table cell to an instance of {@code T}.
     *
     * @param cell the contents of a cell. Never null.
     * @return an instance of {@code T}
     * @throws Throwable when the transform fails for any reason
     */
    T transform(String cell) throws Throwable;
}
