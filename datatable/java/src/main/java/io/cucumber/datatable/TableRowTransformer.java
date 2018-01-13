package io.cucumber.datatable;

import java.util.List;

/**
 * Transforms a single table row to an instance of {@code T}.
 *
 * @param <T> the target type
 */
public interface TableRowTransformer<T> {
    /**
     * Transforms a single table row to an instance of {@code T}.
     *
     * @param row the contents of a row. Never null.
     * @return an instance of {@code T}
     * @throws Throwable when the transform fails for any reason
     */
    T transform(List<String> row) throws Throwable;
}
