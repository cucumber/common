package io.cucumber.datatable;

/**
 * Transforms a table row to an instance of {@code T}.
 *
 * @param <T> the target type
 */
public interface TableTransformer<T> {
    /**
     * Transforms a table row to an instance of {@code T}.
     *
     * @param table the table
     * @return an instance of {@code T}
     * @throws Throwable when the transform fails for any reason
     */
    T transform(DataTable table) throws Throwable;
}
